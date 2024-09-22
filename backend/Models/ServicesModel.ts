import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database';

export class Services extends Model {
  [x: string]: any;
  public serviceId!: number;
  public name!: string;
  public description!: string;
  public price!: string;
  public category!: string;
}

Services.init(
  {
    serviceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'services',
    timestamps: false,
  }
);
