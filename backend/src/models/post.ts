import {Model, DataTypes} from 'sequelize'
import Hashtag from './hashtag';

export interface InterfacePost {
  userId : number;
  content : string;
  img? : string;
}

class Post extends Model implements InterfacePost {
  public userId!: number;
  public content!: string;
  public img?: string;

  static associate(db:any){
    db.Post.belongsTo(db.User, {foreignKey : 'userId', sourceKey : 'id'})
    db.Post.belongsTo(db.Hashtag, {through : 'PostHashtag'})
  }
}

export const modelAttributes = {
  userId : {
    type : DataTypes.INTEGER,
    allowNull : false
  },
  content : {
    type : DataTypes.STRING(140),
    allowNull : false
  },
  img : {
    type : DataTypes.STRING(200),
    allowNull : true
  }
}

export const modelOptions = {
  timestamps :true,
  underscored : false, 
  modelName : 'Post',
  tableName : 'posts',
  paranoid : false,
  charset : 'utf8mb4',
  collate : 'utf8mb4_general_ci'
}

export default Post