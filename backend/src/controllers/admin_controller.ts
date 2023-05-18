import {Request, Response, NextFunction} from 'express'
import path from 'path';
import fs from 'fs';
import { ErrorClass } from '../types/ErrorClass';
import { sequelize } from '../models';
import { Model } from 'sequelize';

//FUNCTIONS

//TODO:TEST
const getModelFiles = async(onFile?:string)=>{
  if(onFile){
    const modelFile = await import(path.join(__dirname, '../models', onFile)) 
    return modelFile
  }
  else{
    const modelsDir = path.join(__dirname, '../models');
    const modelFiles = (await fs.promises.readdir(modelsDir)).filter(e => e !== 'index.ts');
    if(!modelFiles) throw new ErrorClass(false, '모델 파일 없습니다', 501);
    return modelFiles
  }
}

//TODO:TEST
const fileImport = async (modelFiles:string[])=>{
  const ImportedFiles = [];
  for(let i =0 ; i<modelFiles.length; i++){
    const nowModel = await import(path.join(__dirname, '../models', modelFiles[i]))
    ImportedFiles.push(nowModel);
  }
  return ImportedFiles
}

//TODO:TEST
const getModelAttributesWithModelName = (models:any[])=>{
  return models.reduce((acc, model) => {
    const attributes = Object.keys(model.modelAttributes);
    // const filteredAttributes = attributes.filter(attr => !model.modelAttributes[attr].defaultValue);
    acc[model.modelOptions.fileName] = attributes;
    return acc;
  }, {})
}


//CONTROLLERS

//getTableData
export const getTableData = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const Model:any = await getModelFiles(req.params.id)
    const result = await Model.default.findAll({})
    res.send(result)
  }
  catch(err){
    next(err)
  }
}

//getModelList 
export const getModelList = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const modelFiles = await getModelFiles();
    const result = await fileImport(modelFiles)
    res.send(getModelAttributesWithModelName(result))
  }
  catch(err){
    if(!(err instanceof ErrorClass)){
      const nowErr = new ErrorClass(false, '알 수 없는 에러지롱', 500);
      next(nowErr);
    }
    else next(err)
  }
}

//postModelData TODO:REFACTORING 
export const postModelData = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const data: [string, Record<string, string>] = req.body[1];
    const fileName = req.body[0];
    const Model = await import(`../models/${fileName}`)
    const result = await Model.default.create(data)
    res.send(result);
  }
  catch(err){
    next(err);
  }
}

//deleteModelData
// export cont deleteModelData = async (req, res, next)=>{

// }