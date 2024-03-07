import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Create from './components/Create.jsx'
import Read from './components/Read.jsx'
import Update from './components/Update.jsx'
import NavBar from './components/NavBar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
    <Routes >
<Route index element={ <App/>}/>
<Route path='/create' element={<Create/>}/>
<Route path='/all' element={<Read/>}/>
<Route path='/update' element={<Update/>}/>






    </Routes>
   
    </BrowserRouter>
    
  </React.StrictMode>,
)
