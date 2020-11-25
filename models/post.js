const db = require('../db');


module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return post;
};
