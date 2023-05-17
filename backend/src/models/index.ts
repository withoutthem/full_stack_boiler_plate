// libs
import { Sequelize } from "sequelize";
import fs from 'fs';
import path from 'path';
import { ErrorClass } from "../types/ErrorClass";

const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/config.json')[env];
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {...dbConfig, logging: false});

//importmodule : pure
export const importModule = async (modulePath:string) =>{
  return await import(modulePath)
}

//getModel : pure
export const getModel = async(modelsDir:string, file:string)=>{
  const modulePath = path.join(modelsDir, file);
  if(fs.existsSync(modulePath)){
    return await importModule(modulePath);
  }
  else{
    throw new ErrorClass(false, `File does not exist ${file}`,500)
  }
}

// Model.init : pure 
export const initializeModel = async (modelsDir:string, file:string) =>{
  const {default : Model, modelAttributes, modelOptions } = await getModel(modelsDir, file);
  if(!Model || !modelAttributes || !modelOptions) throw new ErrorClass(false, `Model Schema is not defined error at ${__filename}`, 500);
  Model.init(modelAttributes, {...modelOptions , sequelize})
}

// Model.associate : pure
export const associateModel = async(modelsDir:string, file:string) =>{
  const { default : Model } = await getModel(modelsDir, file);
  if(!Model) throw new ErrorClass(false, `Model is not defined at ${__filename}`)
  if(Model.associate){
    Model.associate(sequelize.models);
  }
}

// models List
const basename = path.basename(__filename)
export const modelsOrder:string[] = fs.readdirSync(__dirname).filter(fileName => fileName !== basename)
// main function 
export const initializeAllModels = async (modelsOrder:string[])=>{ 
  try{
    const modelsDir = path.join(__dirname);
    for(const file of modelsOrder){
      await initializeModel(modelsDir, file);
    }
    for(const file of modelsOrder){
      await associateModel(modelsDir, file);
    }
  }
  catch(err){
    console.error(`Error while importing models module : ${err}`)
  }
};


export { sequelize }