const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAlises: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },

}
);

sequelize.authenticate()
    .then(() => {
        console.log('connected...');
    }).catch((err) => {
        console.log('error' + err);
    })

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Models
db.products = require('./productModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("re-sync again")
    })


//relationship
db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'reviews'
});

db.reviews.hasMany(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

// db.sequelize.sync({}).then(() => {
// 	console.log('Database sync done!');
// });

module.exports = db