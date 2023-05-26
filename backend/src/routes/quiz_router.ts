import express from 'express';

import { getQuizByRandom, answerCheck } from '../controllers/quiz_controller';

const quizRouter = express();

quizRouter.get('/get_random', getQuizByRandom);
quizRouter.post('/answer_check', answerCheck);
export default quizRouter;