import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IServicesCreationAttr {
  service_name: string;
}

@Table({ tableName: 'services', timestamps: false })
export class Service extends Model<Service, IServicesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  service_name: string;
}
