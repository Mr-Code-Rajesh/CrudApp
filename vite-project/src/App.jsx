import { useState } from 'react'
import './App.css'
import { Crud } from './Crud'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className=' p-10 font-poppins'>
       <h2 className=' text-center uppercase tracking-widest text-blue-500 font-semibold'> Crud Application With React & Node.js </h2>
       <div className=' flex justify-center my-5'>
         <Crud/>
       </div>
     </div>
    </>
  )
}

export default App


