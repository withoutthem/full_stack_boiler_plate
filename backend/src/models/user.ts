import { Model, DataTypes } from 'sequelize';


//Interface 생성 
export interface InterfaceUser {
  id: string;
  email?: string;
  nickname: string;
  password: string;
  roles: string;
  rank: string;
}

//Interface를 implements해서 User Model 생성 
class User extends Model implements InterfaceUser {
  public id!: string;
  public email?: string;
  public nickname!: string;
  public password!: string;
  public roles!: string;
  public rank!: string;

  // 모델의 외부 관계 정리
  static associate(db:any){
    db.User.hasOne(db.UserInfo, {foreignKey : 'user_id', sourceKey: 'id'})
    db.User.belongsTo(db.Privilege, {foreignKey : 'roles', sourceKey: 'roles_type'})
  } 
}

//Schema의 속성 상세 표현
export const modelAttributes = {
  id : {
    type :DataTypes.UUID,
    primaryKey : true,
    defaultValue : DataTypes.UUIDV4
  },
  email : {
    type : DataTypes.STRING(40),
    allowNull : true,
    unique : true
  },
  nickname : {
    type : DataTypes.STRING(20),
    allowNull : false,
    unique : true
  },
  password : {
    type : DataTypes.STRING(150),
    allowNull : false,
  },
  roles : {
    type : DataTypes.STRING(30),
    allowNull : false,
    defaultValue : 'family'
  },
  rank : {
    type : DataTypes.STRING(30),
    allowNull : true
  }
};

// table Options
export const modelOptions = {
  timestamps :true,
  underscored : true, 
  modelName : 'User',
  tableName : 'users',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default User;