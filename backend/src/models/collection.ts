import { Model, DataTypes } from 'sequelize';


//Interface 생성 
export interface InterfaceCollection {
  id: string;
  userId: string;
  productId : string;
  count : number;
}

class Collection extends Model implements InterfaceCollection {
  public id!: string;
  public userId! : string
  public productId!: string;
  public count!: number;

  // 모델의 외부 관계 정리
  static associate(db:any){
    db.Collection.belongsTo(db.User, {foreignKey : 'userId', targetKey: 'id'}) 
    db.Collection.belongsTo(db.Product, {foreignKey : 'productId', targetKey: 'id'})
  } 
}

//Schema의 속성 상세 표현
export const modelAttributes = {
  id : {
    type :DataTypes.UUID,
    primaryKey : true,
    defaultValue : DataTypes.UUIDV4
  },
  userId : { //user.id
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  },
  productId : { //product.id
    type :DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  },
  count : {
    type : DataTypes.INTEGER,
    defaultValue : 1
  }
};

// table Options
export const modelOptions = {
  underscored : true, 
  modelName : 'Collection',
  tableName : 'collections',
  fileName : 'collection.ts',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default Collection;