"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../data/database"));
class Pet extends sequelize_1.Model {
    addService(service) {
        if (!this.services) {
            this.services = [];
        }
        this.services = [...this.services, service];
    }
    addRecord(record) {
        if (!this.history) {
            this.history = [];
        }
        this.history = [...this.history, record];
    }
}
exports.Pet = Pet;
Pet.init({
    petId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dateBirth: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    species: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    breed: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    services: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    history: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'pets',
    timestamps: false,
});
