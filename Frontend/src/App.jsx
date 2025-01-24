
import {Route, Routes} from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'  element={<Start/>} />
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/Captain-login' element={<CaptainLogin/>}/>
        <Route path='/Captain-signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={
          <UserProtectWrapper>  <Home/></UserProtectWrapper>  }/>
      </Routes>
    </div> 
  )
}

export default App