import {Model, DataTypes} from 'sequelize';

//Interface 생성 
export interface InterfaceUser {
  id: number;
  email? : string;
  nickname : string;
  password : string;
  provider? : string;
  snsId? : string;
}

//Interface를 implements해서 User Model 생성 
class User extends Model implements InterfaceUser {
  public id!: number;
  public email?: string;
  public nickname!: string;
  public password!: string;
  public provider?: string;
  public snsId?: string;

  // 모델의 외부 관계 정리
  static associate(db:any){
    db.User.hasMany(db.Post,{foreignKey : 'userId', sourceKey : 'id'})
    db.User.belongsToMany(db.User, { // 팔로워
      foreignKey : 'follwingId',
      as : 'Follwers',
      through : 'Follow'
    })
    db.User.belongsToMany(db.User, { //팔로잉
      foreignKey : 'follwerId',
      as : 'Followings',
      through : 'Follow'
    })
  } 
}

//Schema의 속성 상세 표현
export const modelAttributes = {
  id : {
    type :DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
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
  provider : {
    type : DataTypes.ENUM('local', 'kakao'),
    allowNull : true,
    default : 'local'
  },
  snsId : {
    type : DataTypes.STRING(30),
    allowNull : true
  }
};

// table Options
export const modelOptions = {
  timestamps :true,
  underscored : false, 
  modelName : 'User',
  tableName : 'users',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default User;