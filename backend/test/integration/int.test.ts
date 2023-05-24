import request from 'supertest'
import app from '../../src/app'
import { idLogger } from '../../src/utils/logger';

const data_false ={email:"test",password:"test",nickname:"t"}
const data_true = {"email":"admintest@test.com","password":"asdf!123!","nickname":"test12"}


describe('AUTH API CYCLE', () => {
  describe('CREATE AUTHENTICATION', () => {
    it('should create user successfully /api/auth/sign_up', async ()=>{
      const response = await request(app)
      .post('/api/auth/sign_up')
      .send(data_true);
      // console.log(response.body)
      expect(response.status).toBe(201);
      // expect(response.body.stat).toBeTruthy();
      // expect(response.body.message).toBe('회원가입에 성공했어요')
      // expect(response.body.data.email).toBe('adminTestInt@test.com');
    });
  });
});