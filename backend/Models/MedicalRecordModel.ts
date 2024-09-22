import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database';


export class MedicalRecord extends Model {
  [x: string]: any;
  public id!: number;
  public date!: Date;
  public description!: string;
}

MedicalRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'MedicalRecord',
    timestamps: false,
  }
);
