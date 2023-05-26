import { Model, DataTypes } from 'sequelize';


//Interface 생성 
export interface InterfaceCart {
  id: string;
  userId: string;
  productId : string;
}

class Cart extends Model implements InterfaceCart {
  public id!: string;
  public userId! : string
  public productId!: string;

  // 모델의 외부 관계 정리
  static associate(db:any){
    db.Cart.belongsTo(db.User, {foreignKey : 'userId', targetKey: 'id'}) 
    db.Cart.belongsTo(db.Product, {foreignKey : 'productId', targetKey: 'id'})
  } 
}

//Schema의 속성 상세 표현
export const modelAttributes = {
  id : {
    type :DataTypes.UUID,
    primaryKey : true,
    defaultValue : DataTypes.UUIDV4
  },
  cartId : { //user.id
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  },
  productId : { //product.id
    type :DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  },
};

// table Options
export const modelOptions = {
  underscored : true, 
  modelName : 'Cart',
  tableName : 'carts',
  fileName : 'cart.ts',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default Cart;