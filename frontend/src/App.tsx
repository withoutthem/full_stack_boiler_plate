//libs
import {Routes, Route} from 'react-router-dom';

//reset css
import './style/reset.css';

//pages
import MainPage from './pages/MainPage';
import SagongSa from './pages/SagongSa';
import Admin from './pages/Admin';
import DataGridPage from './pages/DataGridPage';
import TabMenu from './components/TabMenu/TabMenu';
import ChartPage from './pages/ChartPage';

//components
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar';

//TESTCOMPONENT
import TESTBUTTONCOMPONENT from './components/TEST/TESTBUTTONCOMPONENT';

//modules

function App():React.ReactElement {
  return (
    <div className="all_wrapper">
      <Header></Header>
      <SideBar></SideBar>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='/data_grid' element={<DataGridPage></DataGridPage>}></Route>
        <Route path='/tab_menu' element={<TabMenu></TabMenu>}></Route>
        <Route path='/chart' element={<ChartPage></ChartPage>}></Route>
        <Route path='*' element={<SagongSa></SagongSa>}></Route>
      </Routes> 
      <TESTBUTTONCOMPONENT></TESTBUTTONCOMPONENT>  {/* ONLY TEST */}
      <Footer></Footer>
    </div>
  );
}

export default App; 
