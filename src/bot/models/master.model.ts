import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IMasterCreationAttr {
  id: number;
  service_name: string;
  name: string;
  phone_number: string;
  workshop: string;
  address: string;
  landmark: string;
  location: string;
  start_time: string;
  end_time: string;
  work_time: string;
  last_state: string;
}

@Table({ tableName: 'master' })
export class Master extends Model<Master, IMasterCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  id: bigint;

  @Column({
    type: DataType.STRING,
  })
  service_name: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  workshop: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  landmark: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.TIME,
  })
  start_time: string;

  @Column({
    type: DataType.TIME,
  })
  end_time: string;

  @Column({
    type: DataType.STRING,
  })
  work_time: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  last_state: string;
}
