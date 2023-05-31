//libs
import {Routes, Route} from 'react-router-dom';

//css
import './style/reset.css';

//pages
import MainPage from './pages/MainPage';
import SagongSa from './pages/SagongSa';
import Admin from './pages/Admin';

//components
import Header from './components/Header';
import Footer from './components/Footer';

//TESTCOMPONENT
import TESTBUTTONCOMPONENT from './components/TESTBUTTONCOMPONENT';

//modules

function App():React.ReactElement {
  return (
    <div className="all_wrapper">
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='*' element={<SagongSa></SagongSa>}></Route>
      </Routes>
      <TESTBUTTONCOMPONENT></TESTBUTTONCOMPONENT>  {/* ONLY TEST */}
      <Footer></Footer>
    </div>
  );
}

export default App; 
