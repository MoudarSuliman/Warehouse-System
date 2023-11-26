import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { WareList } from './WareList';
import { WareEdit } from './WareEdit';
import { WareCreate } from './WareCreate';
import { Register } from './Register';
import { Login } from './Login';

function App() {
  return (
    <div className="App">
      <h1>Warehouse List</h1>
      <BrowserRouter>
      <Routes>
        <Route path = '/register' element={<Register/>} ></Route>
        <Route path = '/login' element={<Login/>} ></Route>
        <Route path = '/products' element={<WareList/>} ></Route>
        <Route path = '/products/edit/:productId' element={<WareEdit/>}></Route>
        <Route path = '/products/create' element={<WareCreate/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
