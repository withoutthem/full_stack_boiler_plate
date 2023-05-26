import { json } from 'sequelize';
import { Model, DataTypes } from 'sequelize';

//Interface 생성 
export interface InterfaceQuiz {
  id: string;
  category:string;
  quiz:string;
  options:any;
  answer:string;
}

class Quiz extends Model implements InterfaceQuiz {
  public id!: string;
  public category!: string;
  public quiz!: string;
  public options!: any;
  public answer!: string;

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
  category : {
    type : DataTypes.STRING(100),
    allowNull : false
  },
  quiz : {
    type : DataTypes.STRING(1000),
    allowNull : false,
  },
  options : {
    type : DataTypes.JSON,
    allowNull : false
  },
  answer : {
    type : DataTypes.STRING(100),
    allowNull : false
  },

};

// table Options
export const modelOptions = {
  timestamps :false,
  underscored : true, 
  modelName : 'Quiz',
  tableName : 'quizs',
  fileName : 'quiz.ts',
  paranoid : true, // soft delete
  charset : 'utf8',
  collate : 'utf8_general_ci'
};

export default Quiz;