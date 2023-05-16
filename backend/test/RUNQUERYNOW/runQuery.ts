import {Sequelize} from "sequelize";
import fs from 'fs';

const query = fs.readFileSync('./test/RUNQUERYNOW/QUERY.sql', 'utf8');

const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../../src/config/config.json')[env];
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {...dbConfig, logging: console.log});

const runQuery = async (query:string)=>{
  const result:any[] = await sequelize.query(query);
  console.log(result[0]) //only 
}

runQuery(query);