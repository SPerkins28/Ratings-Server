const db = require('../db');
const {DataTypes} = require('sequelize');


const Post = db.define ('post',  {
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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 4
            }
        }
    });
    module.exports = Post;
