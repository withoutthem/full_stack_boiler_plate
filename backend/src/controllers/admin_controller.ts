import {Request, Response, NextFunction} from 'express'
import path from 'path';
import fs from 'fs';
import { ErrorClass } from '../types/ErrorClass';
import { sequelize } from '../models';
import { Model } from 'sequelize';
import Product from '../models/product';
import Quiz from '../models/quiz';

//FUNCTIONS

const getModelFiles = async(onFile?:string)=>{
  if(onFile){
    const modelFile = await import(path.join(__dirname, '../models', onFile)) 
    return modelFile
  }
  else{
    const modelsDir = path.join(__dirname, '../models');
    const modelFiles = (await fs.promises.readdir(modelsDir)).filter(e => e !== 'index.ts');
    if(!modelFiles) throw new ErrorClass(false, '모델 파일이 없습니다', 501);
    return modelFiles
  }
}

const fileImport = async (modelFiles:string[])=>{
  const ImportedFiles = [];
  for(let i =0 ; i<modelFiles.length; i++){
    const nowModel = await import(path.join(__dirname, '../models', modelFiles[i]))
    ImportedFiles.push(nowModel);
  }
  return ImportedFiles
}

const getModelAttributesWithModelName = (models:any[])=>{
  return models.reduce((acc, model) => {
    const attributes = Object.keys(model.modelAttributes);
    acc[model.modelOptions.fileName] = attributes;
    return acc;
  }, {})
}

//CONTROLLERS

//getTableData api/admin/data/:id
export const getTableData = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const Model:any = await getModelFiles(req.params.id)
    const result = await Model.default.findAll({})
    // console.log(result)
    res.status(200).send(result);
  }
  catch(err){
    next(err)
  }
}

//getModelList : api/admin/get_model_list
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

// deleteTableData api/admin/delete_data
export const deleteTableData = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const Model = await import(`../models/${req.body[0]}`)
    const primaryKey:string = req.body[1].primaryKey;
    const primaryValue:string = req.body[1].primaryValue;
    const result = await Model.default.destroy({where : {[primaryKey] : primaryValue}})
    res.status(200).send(`delete Success : result : ${result}`);
  }
  catch(err){
    next(err)
  }
}

export const postExampleData = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const dataBuffer = fs.readFileSync(path.join(__dirname , '../DATA.json'))
    const dataJSON = dataBuffer.toString();
    const products:any[] = JSON.parse(dataJSON);
    const final = new Map();
    products.forEach((item, idx) => {
      item.imageuri = `/images/product${idx}.png`
      item.likes = Math.floor(Math.random()*100);
      final.set(item.name , item)
    })
    let uniqueProducts = Array.from(final.values());
    const result = await Product.bulkCreate(uniqueProducts)
    console.log('success')
    if(result) res.status(201).send(result);
    else throw new ErrorClass(false, '데이터생성 실패', 500);
  }
  catch(err){
    next(err)
    console.log(err);
  }
}

export const postExampleData2 = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const dataBuffer = fs.readFileSync(path.join(__dirname , '../DATA2.json'))
    const dataJSON = dataBuffer.toString();
    const quizs:any[] = JSON.parse(dataJSON);
    const result = await Quiz.bulkCreate(quizs)
    console.log('success')
    if(result) res.status(201).send(result);
    else throw new ErrorClass(false, '데이터생성 실패', 500);
  }
  catch(err){
    next(err)
    console.log(err);
  }
}