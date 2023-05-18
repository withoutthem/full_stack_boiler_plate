//libs
import {Routes, Route} from 'react-router-dom';

//css
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import MainPage from './pages/MainPage';
import SagongSa from './pages/SagongSa';
import Admin from './pages/Admin';

//components
import Header from './components/Header'
import Footer from './components/Footer'

//modules


function App() {

  return (
    <div className="all_wrapper">
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/admin_panel' element={<Admin></Admin>}></Route>
        <Route path='*' element={<SagongSa></SagongSa>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App; 
