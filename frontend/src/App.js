import logo from './logo.svg';
import './App.css';
import Index from "./book/Index";
import Home from "./home/Home";
import Navbar from './shared/Navbar';
import Create from './book/Create';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Edit from './book/Edit';
import Details from './home/Details';
import Login from './login/Login';
import Register from './login/Register';
import Dashboard from './dashboard/Dashboard';
import Cart from './cart/Cart';
import { useState } from 'react';


function App() {

  const [cart, setCart] = useState([])

  return (
    <div className="App"> 
     
     <BrowserRouter>
     <Navbar cart={cart} />
    <Routes> 
        <Route index element={<Home cart={cart}  setCartP={setCart} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="books" element={<Index />} />
        <Route path="book/edit/:bookId" element={ <Edit />} />
        <Route path="book/details/:bookId" element={ <Details />} />
        <Route path="book/create" element={<Create />} />
        <Route path="cart"  element={<Cart cart={cart} />} />


        <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
      {/*
      <h3 align="center">Create New Book</h3>
      <Create />
      <hr/>
      <h3 align="center">Book List</h3>
      <Index />
      */}
    </div>
  );
}

export default App;
