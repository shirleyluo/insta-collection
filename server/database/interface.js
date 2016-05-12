var Sequelize = require('sequelize');
var url = process.env.DATABASE_URL || 'postgres://localhost:5432/instagram';
var models = require('./models.js');

var db = new Sequelize(url);

User = db.define('user', models.User.attributes);

Collection = db.define('collection', models.Collection.attributes);

Instagram = db.define('instagram', models.Instagram.attributes);

Collection.belongsTo(User);
User.hasMany(Collection);

Instagram.belongsTo(Collection);
Collection.hasMany(Instagram);

var init = function() {
  return db.sync({force: true})
    .then(function() {
      //
    });
};

module.exports = {
  sequelize: db,
  User: User,
  Collection: Collection,
  Instagram: Instagram,
  init: init
};



