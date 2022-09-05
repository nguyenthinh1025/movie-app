import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './page/Home/Home';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import News from './page/News/News';
import Contact from './page/Contact/Contact';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import Detail from './page/Detail/Detail';
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './page/Checkout/Checkout';
import { Suspense, lazy } from 'react'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './component/Loading/Loading';
import Profile from './page/Profile/Profile';
import { AdminTempplate } from './templates/AdminTemplate/AdminTemplate';
import Dasboard from './page/Admin/Dasboard/Dasboard';
import Films from './page/Admin/Films/Films';
import ShowTime from './page/Admin/ShowTime/ShowTime';
import AddNew from './page/Admin/Films/AddNew/AddNew';
import EditFilms from './page/Admin/Films/EditFilms/EditFilms';

// const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory();
function App () {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/detail/:id' exact Component={Detail} />
        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />
        <UserTemplate path='/profile' exact Component={Profile} />
        <AdminTempplate path='/admin' exact Component={Dasboard} />
        <AdminTempplate path='/admin/films' exact Component={Films} />
        <AdminTempplate path='/admin/films/addnew' exact Component={AddNew} />
        <AdminTempplate path='/admin/films/editfilms/:id' exact Component={EditFilms} />
        <AdminTempplate path='/admin/showtimes' exact Component={ShowTime} />
        <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />

        {/* <Suspense fallback={<h1>LOADING.....</h1>}>
          <CheckoutTemplateLazy path='/checkout/:id' exact Component={Checkout} />
        </Suspense> */}

        <HomeTemplate path='/' exact Component={Home} />

      </Switch>
    </Router>
  );
}

export default App;
