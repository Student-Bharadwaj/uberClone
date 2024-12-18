
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtectPage from './pages/UserProtectPage';
import UserHero from './pages/UserHero';
import CaptainProtectPage from './pages/CaptainProtectPage';
import CaptainHero from './pages/CaptainHero';
// import UserHome from './pages/UserHero';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-signup' element={<CaptainSignup/>}/>
          <Route path='/user-hero' element={
            <UserProtectPage>
<UserHero/>
                          </UserProtectPage>
          } />
          <Route path='/captain-hero' element={
            <CaptainProtectPage>
              <CaptainHero/>
            </CaptainProtectPage>
          } />
         
        </Routes>
      </div>
    </>
  )
}

export default App
