import React, {useState} from 'react';
import Search from './components/Search';
import Products from './components/Products';
import Pagination from './components/Pagination';
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';

function App() {
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleCallback = (nextDisabled) =>{
    setIsNextDisabled(nextDisabled);
  }

  return (
    <div className="App">
      <div className="container">
      <div className="header py-2"><h2>Filter data</h2></div>
      <Router>
        <div className="inputHolder mb-2">
          <Search></Search>
        </div>
        <div className="content">
           <table className="table mt-2">
            <thead className="thead-dark">
                <tr>
                    <th>id</th>
                    <th>name</th> 
                    <th>year</th>
                </tr>
            </thead>
            <tbody>
              <Products setNextDisabledCallback={handleCallback}></Products>
            </tbody>
          </table>
          <div className="pagHolder">
          <Pagination nextDisabled={isNextDisabled}></Pagination>
          </div>
        </div>
      </Router>
      </div>
    </div>
  );
}

export default App;
