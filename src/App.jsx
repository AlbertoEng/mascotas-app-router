
import './App.css'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './components/HomePage'
import DetailPage from './components/DetailPage'
import EditPage from './components/EditPage'

// https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/.json

function App() {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/detalle/:id' element={<DetailPage/>} />
          <Route path='/editar/:id' element={<EditPage />} />
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
