import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'
import { SearchProvider } from './Context/SearchContext'
import SingleProduct from './Components/SingleProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <SearchProvider>
      
         <Routes>
         <Route path='/' element={<HomePage/>} />
         <Route path='/campaign/:id' element={<SingleProduct/>}/>
        
         </Routes>
         </SearchProvider>
      <Footer/>   
      </BrowserRouter>
    </>
  )
}

export default App
