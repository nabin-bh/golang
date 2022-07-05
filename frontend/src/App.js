import logo from './logo.svg';
import './App.css';
import Index from "./book/Index";
import Navbar from './shared/Navbar';

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <h3 align="center">Create New Book</h3>
      <Index />
    </div>
  );
}

export default App;
