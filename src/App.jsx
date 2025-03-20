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
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Campaigns from './Pages/Campaigns'
import CreateCampaign from './Pages/CreateCampaigns'
import ViewRequests from './Pages/ViewRequests'
import Product from './Pages/Products'

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
           <Route path='/cart' element={<Cart/>} />
           <Route path='/login' element={<Login/>} />
           <Route path='/campaigns' element={<Campaigns/>} />
           <Route path='/products' element={<Product/>} />
           <Route path='/createCampaign' element={<CreateCampaign/>} />
           <Route path='/viewRequests' element={<ViewRequests/>} />
         </Routes>
         </SearchProvider>
      <Footer/> 
        
      </BrowserRouter>
    </>
  )
}

export default App
