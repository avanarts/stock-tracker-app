import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import About from './components/About.jsx'
import Sidebar from './components/Sidebar.jsx'


function App() {


  return (
    <>


    <div className="flex container">
     <Sidebar />
     <main className="flex-grow p-4 ml-64 w-[calc(100%-16rem)]">
       <Routes>
         <Route path="/" element={ <Dashboard /> } />
         <Route path="about" element={ <About /> } />
       </Routes>
     </main>
   </div>
    </>
  )
}

export default App