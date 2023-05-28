import { Model, DataTypes } from 'sequelize';


//Interface 생성 
export interface InterfaceProduct {
  id: string;
  imageuri:string;
  name:string;
  brand:string;
  shortDescription:string;
  description:string;
  furnitureType:string;
  theme:string;
  price:number;
  likes:number
}

class Product extends Model implements InterfaceProduct {
  public id!: string;
  public imageuri!:string;
  public name!: string;
  public brand!: string;
  public shortDescription!: string;
  public description!: string;
  public furnitureType!: string;
  public theme!: string;
  public price!: number;
  public likes!: number;
  // 모델의 외부 관계 정리
  static associate(db:any){
    db.Product.hasMany(db.Cart, {foreignKey: 'productId', sourceKey : 'id'})
    db.Product.hasMany(db.Collection, {foreignKey: 'productId', sourceKey : 'id'})
  } 
}

//Schema의 속성 상세 표현
export const modelAttributes = {
  id : {
    type :DataTypes.UUID,
    primaryKey : true,
    defaultValue : DataTypes.UUIDV4
  },
  imageuri : {
    type : DataTypes.STRING(200),
    allowNull : true,
    unique : true
  },
  name : {
    type : DataTypes.STRING(40),
    allowNull : false,
    unique : true
  },
  brand : {
    type : DataTypes.STRING(30),
    allowNull : false,
  },
  shortDescription : {
    type : DataTypes.STRING(1000),
    allowNull : false
  },
  description : {
    type : DataTypes.STRING(1000),
    allowNull : false,
  },
  furnitureType : {
    type : DataTypes.STRING(40),
    allowNull : false,
    defaultValue : 'unKnown type'
  },
  theme : {
    type : DataTypes.STRING(30),
    allowNull : false,
    defaultValue : 'Normal'
  },
  price : {
    type : DataTypes.INTEGER
  },
  likes : {
    type : DataTypes.INTEGER,
    defaultValue : 0
  }
};

// table Options
export const modelOptions = {
  timestamps :false,
  underscored : true, 
  modelName : 'Product',
  tableName : 'products',
  fileName : 'product.ts',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default Product;