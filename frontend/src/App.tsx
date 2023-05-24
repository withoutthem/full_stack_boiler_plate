//libs
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

//css
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import MainPage from './pages/MainPage';
import SagongSa from './pages/SagongSa';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

//components
import Header from './components/Header'
import Footer from './components/Footer'

//modules
import { setUserInfo_reducer } from './store';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const getMyInfo = async ():Promise<void>=>{
      try{
        const result:any = await axios.get('/api/auth/get_my_info')
        console.log(result.data)
        if(result.data.stat) dispatch(setUserInfo_reducer(result.data.data))
        else console.log(result)
      }
      catch(err){
        console.log(err)
      }
    }

    getMyInfo();
  },[dispatch])

  return (
    <div className="all_wrapper">
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/admin_panel' element={<Admin></Admin>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/sign_up' element={<SignUpPage></SignUpPage>}></Route>
        <Route path='*' element={<SagongSa></SagongSa>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App; 
