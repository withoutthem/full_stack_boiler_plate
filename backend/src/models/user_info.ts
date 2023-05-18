import { Model, DataTypes } from 'sequelize';

// Interface 생성
export interface InterfaceUserInfo {
  user_id: string;
  name: string;
  age: number;
  company?: string;
  phone_number: string;
  personal_page?: string;
  billing_info?: string;
}

// Interface를 implements해서 User Model 생성
class UserInfo extends Model implements InterfaceUserInfo {
  public user_id!: string;
  public name!: string;
  public age!: number;
  public company?: string;
  public phone_number!: string;
  public personal_page?: string;
  public billing_info?: string;

  // 모델의 외부 관계 정리
  static associate(db: any) {
    db.UserInfo.belongsTo(db.User, { foreignKey: 'user_id', targetKey:'id'});
  }
}

// Schema의 속성 상세 표현
export const modelAttributes = {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  company: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  personal_page: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  billing_info: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
};

// table Options
export const modelOptions = {
  timestamps: true,
  underscored: true,
  modelName: 'UserInfo',
  tableName: 'user_infos',
  fileName: 'user_info.ts',
  paranoid: true, // soft delete
  charset: 'utf8',
  collate: 'utf8_general_ci',
};

export default UserInfo;