import {Model, DataTypes} from 'sequelize';

//Interface
export interface InterfacePrivilege {
  roles_type: string;
  admin_panel: number;
  vip_zone: number;
  special_coupon : number,
  primary_service : number,
  basic_service : number;
}

class Privilege extends Model implements InterfacePrivilege {
  public roles_type! : string;
  public admin_panel!: number; 
  public vip_zone!: number;
  public special_coupon!: number;
  public primary_service!: number;
  public basic_service!: number;

  static associate(db:any){
    db.Privilege.hasMany(db.User, {foreignKey: 'roles', sourceKey : 'roles_type'})
  }
}

export const modelAttributes = {
  roles_type : {
    primaryKey : true,
    type : DataTypes.STRING(30)
  },
  admin_panel : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : 0
  },
  vip_zone : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : 0
  },
  special_coupon : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : 0
  },
  primary_service : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : 0
  },
  basic_service : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : 0
  },
}

export const modelOptions = {
  underscored: true,
  modelName: 'Privilege',
  tableName: 'privileges',
  paranoid: false, // soft delete
  charset: 'utf8',
  collate: 'utf8_general_ci',
}

export default Privilege;