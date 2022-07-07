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


function App() {
  return (
    <div className="App"> 
     <Navbar />
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Index />}>
          {/* <Route path=":teamId" element={<Team />} /> */}
          <Route path="create" element={<Create />} />
          {/* <Route index element={<LeagueStandings />} /> */}
        </Route>
      </Route>
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
