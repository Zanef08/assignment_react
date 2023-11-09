
import './App.css';

import NavigationBar from './components/NavigationBar';
import { Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Detail from './components/Detail';
import AddCake from './components/AddCake';
import UpdateCake from './components/UpdateCake';
import './App.css';
import Login from './components/Login'
import Profile from './components/Profile';

function App() {
  
  return (

    <div>

      <NavigationBar />

      <Routes>

        <Route path='/' element={<Home />}></Route >

        <Route path='/dashboard' element={<Dashboard />}></Route>

        <Route path='/contact' element={<Contact />}></Route>

        <Route path='/detail/:id' element={<Detail />}></Route>

        <Route path='/AddCake' element={<AddCake />}></Route>

        <Route path='/UpdateCake/:id' element={<UpdateCake />}></Route>

        <Route path='/login' element={<Login />}></Route>

        <Route path='/profile' element={<Profile />} />
      </Routes>

    </div>



  );
}

export default App;
