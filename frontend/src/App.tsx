//libs
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

//css
import './style/reset.css';
import './style/App.css';

//pages
import MainPage from './pages/MainPage';
import SagongSa from './pages/SagongSa';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Privacy from './pages/Privacy';
import QuizPage from './pages/QuizPage';
import AllProductsPage from './pages/AllProductsPage';
import EventPage from './pages/EventPage';
import Collection from './pages/Collection'

//components
import Header from './components/Header'
import Footer from './components/Footer'

//modules
import CartPage from './pages/CartPage';
import GlobalPop from './components/GlobalPop';
import { setInfoAll } from './utils/set_info';

function App() {

  const dispatch = useDispatch();
  const storeState:any = useSelector(state => state);
  
  useEffect(()=>{setInfoAll(dispatch)},[])

  return (
    <div className="all_wrapper">
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/admin_panel' element={<Admin></Admin>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/sign_up' element={<SignUpPage></SignUpPage>}></Route>
        <Route path='/privacy' element={<Privacy></Privacy>}></Route>
        <Route path='/quiz' element={<QuizPage></QuizPage>}></Route>
        <Route path='/all_products' element={<AllProductsPage></AllProductsPage>}></Route>
        <Route path='/event' element={<EventPage></EventPage>}></Route>
        <Route path='/collection' element={<Collection></Collection>}></Route>
        <Route path='/cart_page' element={<CartPage></CartPage>}></Route>
        <Route path='/detail/:id'></Route>
        <Route path='*' element={<SagongSa></SagongSa>}></Route>
      </Routes>
      <Footer></Footer>
      {storeState.globalPop.active ? <GlobalPop></GlobalPop> : null}
    </div>
  );
}

export default App; 
