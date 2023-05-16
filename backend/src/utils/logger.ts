import fs from 'fs';
import path from 'path';
import {Request, Response} from 'express';

const logDir = path.join(__dirname + 'logs')

if(!fs.existsSync('logs')) fs.mkdirSync('logs')

const logger = (req:Request, res:Response, option:string, where:string)=>{
  const logFilePath = path.join(path.dirname(path.dirname(__dirname)) + `/logs/` + `/${req.method}.log` )
  let logMessage:string;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  logMessage = `[${formattedDate}] WHERE : ${where} STATUS : ${res.statusCode} OPTION : ${option} IP: ${req.ip}, Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}}\n`;

  fs.appendFileSync(logFilePath, logMessage);
}

export default logger ;