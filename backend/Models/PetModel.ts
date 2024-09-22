import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database';
import { Services } from './ServicesModel';
import { MedicalRecord } from './MedicalRecordModel';


export class Pet extends Model {
  [x: string]: any;
  public petId!: number;
  public userId!: number;
  public name!: string;
  public dateBirth!: string;
  public species!: string;
  public breed!: string;
  public services!: Services[];
  public history!: MedicalRecord[];

  public addService(service: Services) {
    if (!this.services){
      this.services = []
    }
    this.services = [...this.services, service];
  }

  public addRecord(record: MedicalRecord) {
    if (!this.history){
      this.history = []
    }
    this.history = [...this.history, record];
  }
}

Pet.init(
  {
    petId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    services: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    history: {
        type: DataTypes.JSON,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'pets',
    timestamps: false,
  }
);
