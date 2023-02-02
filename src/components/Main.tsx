import React from 'react'
import { useContextState } from '../context';
import GenerateBill from './GenerateBill'
import Nav from './Nav'

const Main = () => {
  const { state, setState } = useContextState();
  
  if(state.loading)
  return(
   <>
   <Nav/>
   <div className='w-100 d-flex justify-content-center align-items-center vh-100'>
          <img src="Pulse-1s-211px.gif" style={{ width: "80px" }} alt="" />
   </div>
   </>
  )

  return (
    <>
    <Nav/>
    <GenerateBill/>
    </>
  )
}

export default Main