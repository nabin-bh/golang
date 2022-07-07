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


function App() {
  return (
    <div className="App"> 
     
     <BrowserRouter>
     <Navbar />
    <Routes> 
        <Route index element={<Home />} />
        <Route path="books" element={<Index />} />
        <Route path="book/edit/:bookId" element={ <Edit />} />
        <Route path="book/details/:bookId" element={ <Details />} />
        <Route path="book/create" element={<Create />} />
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
