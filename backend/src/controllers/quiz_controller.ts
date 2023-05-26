import User from "../models/user";
import Quiz from "../models/quiz";
import {Request, Response, NextFunction} from 'express';
import {sequelize} from '../models';
import { ErrorClass } from "../types/ErrorClass";

export const getQuizByRandom = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const randomQuiz = await Quiz.findOne({
      order: sequelize.literal('rand()'),
    });
    res.status(200).json(randomQuiz);
  } catch (err) {
    next(err);
  }
}


export const answerCheck = async (req:any, res:Response, next:NextFunction)=>{
  try{
    const {id, answer} = req.body;
    const result = await Quiz.findOne({where :{id}});
    if(!result) res.status(400).send({stat:false, message:'잘못된 요청이에요.', status:400})
    else if(result && req.user){
      const nowUser = await User.findOne({where : {id : req.user.id}})
      if(!nowUser) res.status(400).send({stat:false, message:'사용자를 찾을 수 없어요.', status:400})
      else if(result.answer === answer){
        await nowUser.increment('point', { by: 50 })
        res.send({stat:true, message:'정답! 맞았습니다.', result:true})
      }
      else{
        await nowUser.decrement('point', { by: 30 })
        res.send({stat:true, message:'땡! 틀렸습니다', result:false})
      }
    }
    else throw new ErrorClass(false, '알수 없는 에러에요. 아마 로그인이 풀린 듯 합니다.', 500)
  }
  catch(err){
    next(err)
  }
}