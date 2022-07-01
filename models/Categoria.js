const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db2');

class Categoria extends Model {}
Categoria.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            min: 4
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { sequelize, modelName: 'categoria' });

module.exports = Categoria;