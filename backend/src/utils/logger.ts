import fs from 'fs';
import path from 'path';
import {Request, Response} from 'express';

//NOTE:TEST:OK

const logDir = path.join(__dirname + 'logs')

if(!fs.existsSync('logs')) fs.mkdirSync('logs')
const logFilePathGenerator = (req:Request, option?:string) => path.join(path.dirname(path.dirname(__dirname)) + `/logs/` + `/${option ? option : req.method}.log` )
let logMessage:string;
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');



export const logger = (req:Request, res:Response, option:string, where:string)=>{
  logMessage = `[${formattedDate}] WHERE : ${where} STATUS : ${res.statusCode} OPTION : ${option} IP: ${req.ip}, Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}}\n`;
  fs.appendFileSync(logFilePathGenerator(req), logMessage);
}

export const idLogger = (req:Request, res:Response, id:string, controller?:string, email?:string) =>{
  logMessage = `[${formattedDate}] IP : ${req.ip}, URL : ${req.url}, METHOD : ${controller} ID : ${id}, EMAIL : ${email}\n`
  fs.appendFileSync(logFilePathGenerator(req, 'AUTH'), logMessage);
}