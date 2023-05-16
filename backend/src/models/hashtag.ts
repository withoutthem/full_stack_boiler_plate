import {Model, DataTypes} from 'sequelize'

export interface InterfaceHashtag {
  title:string;
}

class Hashtag extends Model implements InterfaceHashtag {
  public title!: string;
  
  static associate(db:any){
    db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'})
  }
}

export const modelAttributes = {
  title : {
    type : DataTypes.STRING(15),
    allowNull : false,
    unique: true
  }
}

export const modelOptions = {
  timestamps :true,
  underscored : false, 
  modelName : 'Hashtag',
  tableName : 'hashtags',
  paranoid : false,
  charset : 'utf8mb4',
  collate : 'utf8mb4_general_ci'
}

export default Hashtag;