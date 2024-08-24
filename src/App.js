
import { useState } from 'react';
import './App.css';
import { cmpPath } from './pagePath';
import { Route, Routes } from 'react-router-dom';
import './i18n';

function App() {
  const [roterElement,setrouterElement]=useState(cmpPath)
  return (
    <div className="App">
      <Routes>
        {
          roterElement.map((item)=>(
            <Route path={item.componentPath} element={item.componentElement}/>
          ))
        }
      </Routes>

    </div>
  );
}

export default App;
