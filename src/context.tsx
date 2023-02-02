import { createContext, useContext, } from 'react';

type MyContext = {
    state: any;
    setState: (x:any)=>void;
  };
  
export const ContextState = createContext<MyContext>({
    state:{ data: [], loading: true},
    setState: ()=>{},
  })

export const useContextState = () => useContext(ContextState)