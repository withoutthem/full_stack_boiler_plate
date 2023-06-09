import { Model, DataTypes } from 'sequelize';


//Interface 생성 
export interface InterfaceUser {
  id: string;
  email?: string;
  nickname: string;
  password: string;
  roles: string;
  rank: string;
  point: number;
}

//Interface를 implements해서 User Model 생성 
class User extends Model implements InterfaceUser {
  public id!: string;
  public email?: string;
  public nickname!: string;
  public password!: string;
  public roles!: string;
  public rank!: string;
  public point!: number;

  // 모델의 외부 관계 정리
  static associate(db:any){
    
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
  }
};

// table Options
export const modelOptions = {
  timestamps :true,
  underscored : true, 
  modelName : 'User',
  tableName : 'users',
  fileName : 'user.ts',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default User;