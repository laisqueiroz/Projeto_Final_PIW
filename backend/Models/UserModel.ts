import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database';


export class User extends Model {
  [x: string]: any;
  public id!: number;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public role!: string;
  public password!: string;

  public checkPassword(password: string): boolean {
    return password === this.password;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);
