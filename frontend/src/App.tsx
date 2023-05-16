//libs
import {Routes, Route} from 'react-router-dom';

//css
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import MainPage from './pages/MainPage';
import SagongSa from './pages/SagongSa';
import LoginPage from './pages/LoginPage';

//components
import Header from './components/Header'

//modules


function App() {

  return (
    <div className="all_wrapper">
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>} ></Route>
        <Route path='*' element={<SagongSa></SagongSa>}></Route>
      </Routes>
      
    </div>
  );
}

export default App; 
