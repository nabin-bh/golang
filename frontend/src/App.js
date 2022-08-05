import logo from './logo.svg';
import './App.css';
import Index from "./book/Index";
import Home from "./home/Home";
import Navbar from './shared/Navbar';
import Create from './book/Create';
import Error from './shared/Error';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Edit from './book/Edit';
import Details from './home/Details';
import Login from './login/Login';
import Register from './login/Register';
import Dashboard from './dashboard/Dashboard';
import Cart from './cart/Cart';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function App() {

  const [cart, setCart] = useState([])
  const [auth, setAuth] = useState()
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (cookies && cookies.Cart) {
      setCart(cookies.Cart)
    }

    if (cookies && cookies.Auth) {
      setAuth(cookies.Auth)
    }

    getAuthByToken()

  }, [])

  async function getAuthByToken() {
    if (cookies.Auth) {
      console.log(cookies.Auth.token)
      const headers = {
        'Content-Type': 'application/json',
      }
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${cookies.Auth.token}`,
        }
      };
      console.log(axiosConfig)

      await fetch('http://localhost:8080/api/secured/getauthuser', {
        method: 'POST',
        mode: 'no-cors',
        json: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Authorization': `${cookies.Auth.token}`,
        },
        // body: JSON.stringify(datat)
      }).then(res => {
        console.log("dsfsdf", res);
        return res.json();
      })
    }
  }

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar cart={cart} auth={auth} />
        <Routes>
          <Route index element={<Home cart={cart} setCartP={setCart} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="books" element={<Index />} />
          <Route path="book/edit/:bookId" element={<Edit />} />
          <Route path="book/details/:bookId" element={<Details />} />
          <Route path="book/create" element={<Create />} />
          <Route path="cart" element={<Cart cart={cart} setCartP={setCart} />} />

          <Route path="error" element={<Error />} />

          <Route path="dashboard" element={
            <ProtectedRoute user={auth}>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const ProtectedRoute = ({ user, children }) => {

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
