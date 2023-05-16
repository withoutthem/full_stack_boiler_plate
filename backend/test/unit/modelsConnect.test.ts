
//libs
import fs from 'fs'
import path from 'path'

//modules
import * as models from '../../src/models';
import { ErrorClass } from '../../src/types/ErrorClass';

//mocks modules
jest.mock('fs', ()=>{
  const actualFs = jest.requireActual('fs'); 
  return {
    ...actualFs, //fs 모듈 내부의 다른 함수들은 그대로 둠
    existsSync : jest.fn()
  }
})

jest.mock('path', () => {
  const actualPath = jest.requireActual('path');
  return {
    ...actualPath, //path 모듈 내부의 다른 함수들은 그대로 둠
    join: jest.fn(),
  };
});


//spyOn modules
const mockImportModule = jest.spyOn(models, 'importModule');
mockImportModule.mockImplementation(()=>Promise.resolve({}));

//test Variables 
const modelsDir = '../../src/models';
const file = 'user.ts';

describe('getModel', ()=>{
  it('should be function type', ()=>{
    expect(typeof models.getModel).toBe('function')
  })

  it('should throw an error if file does not exist', async()=>{
    (path.join as jest.Mock).mockReturnValue('mockPath');
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    await expect(models.getModel(modelsDir, file)).rejects.toEqual(new ErrorClass(false, `File does not exist ${file}`,500))
  })
  
  it('should call importModule with modulePath if file exists', async ()=>{
    (path.join as jest.Mock).mockReturnValue('mockModulePath');
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    await models.getModel(modelsDir, file);
    expect(mockImportModule).toBeCalledWith('mockModulePath');
  })
})
