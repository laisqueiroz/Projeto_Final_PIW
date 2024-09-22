"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecord = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../data/database"));
class MedicalRecord extends sequelize_1.Model {
}
exports.MedicalRecord = MedicalRecord;
MedicalRecord.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'MedicalRecord',
    timestamps: false,
});
