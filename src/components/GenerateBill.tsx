import React, { useEffect, useRef, useState } from "react";
import { useContextState } from "../context";
import Innoviece from "./Innoviece";
import ListDetails from "./ListDetails";

const GenerateBill = () => {
  
  const { state, setState } = useContextState();
  let [option, setOption] = useState<React.SetStateAction<any>>({customers:[],order_items:[],countriesData:[]});
  const [loading, setLoading] = useState(true);
  const [userId, setuserId] = useState<React.SetStateAction<string>>("-1");
  const [page, setPage] = useState<React.SetStateAction<number>>(1);
  const [table,setTable]=useState<React.SetStateAction<any>>([]);
  useEffect(() => {
    let customerOptions: string[] = [];
    let descriptionsOptions: string[] = [];
    let countriesOption: string[] = [];
    state.data.map((x: any) => {
      if (x && x["CustomerID"] && "CustomerID" in x){customerOptions = [...customerOptions, x["CustomerID"].toString()]};
      if (x && x["Description"] && "Description" in x){descriptionsOptions = [...descriptionsOptions, x["Description"].toString()]};
      if (x && x["Country"] && "Country" in x){countriesOption = [...countriesOption, x["Country"].toString()]};
    });

     customerOptions = customerOptions.filter((item, index, arr) => arr.indexOf(item) === index);
        //  customerOptions =  [...new Set([...customerOptions])];
     descriptionsOptions= descriptionsOptions.filter((item, index, arr) => arr.indexOf(item) === index);
    //  [...new Set([...descriptionsOptions])];
     countriesOption = countriesOption.filter((item, index, arr) => arr.indexOf(item) === index);
      // [...new Set([...countriesOption])];


    setOption({...option,customers:[...customerOptions],order_items:[...descriptionsOptions],countriesData:[...countriesOption]});
    setLoading(false);
  }, [state]);

  const BillGenerator = (e: React.FormEvent<HTMLFormElement>, page: number) => {
    e.preventDefault();
    let val:string = ''
    switch (page) {
      case 1:
        {
         val= e.currentTarget.customerId.value;
         setuserId(val);
         setPage(1);
        }
        break;
      case 2:
        {
          val=e.currentTarget.order_item.value
          setTable([...tableGenerate(val,2)])
          setPage(2);
        }
        break;
      case 3:
        {
          val=e.currentTarget.countries.value
          setTable([...tableGenerate(val,3)])
          setPage(3);
        }
        break;
    }
  };

  const tableGenerate=(str:string,pg:number)=>{
    if(str == '-1')
    return table

    let myData:any=[]

    if(pg==2){
      myData=[{Description:str,total_order:0,total_Items:0}]
    state.data.map((x: any, i : number) => {
      if (
        x &&
        x["Description"] &&
        x["Description"].toString() == str
      )
        {
          myData[0].total_order+=1
          myData[0].total_Items+=parseInt(x.Quantity)
      }
    });
}
if(pg==3){
  state.data.map((x: any, i : number) => {
    if (
      x &&
      x["Country"] &&
      x["Country"].toString() == str
    )
      {
        myData.push({Country:str,Items:x.Description,Quantity:x.Quantity})
    }
  });
}
return myData
  }
console.log(option)
  if (loading)
    return (
      <div className="container py-4">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src="Pulse-1s-211px.gif" style={{ width: "60px" }} alt="" />
          <h5 className="text-primary m-3">Loading...</h5>
        </div>
      </div>
    );

  return (
    <div className="container py-4">
      <form
        onSubmit={(e) => BillGenerator(e, 1)}
        className="d-flex w-100 flex-wrap justify-content-between"
      >
        <div className="col-12 col-md-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Customer Id
            </label>
            <select
              name="customerId"
              className="form-select"
              aria-label="Default select example"
            >
              <option value={-1}>Open this select menu</option>
              {option.customers.map((x: string) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12 col-md-2 ">
          <button
            className="btn btn-warning"
            type="submit"
            style={{ float: "right" }}
          >
            Generate Bill
          </button>
        </div>
      </form>

      <form
        onSubmit={(e) => BillGenerator(e, 2)}
        className="d-flex w-100 flex-wrap justify-content-between"
      >
        <div className="col-12 col-md-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Ordered Items
            </label>
            <select
              name="order_item"
              className="form-select"
              aria-label="Default select example"
            >
              <option value={-1}>Open this select menu</option>
              {
              option.order_items.map((x: string) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12 col-md-2 ">
          <button
            className="btn btn-warning"
            type="submit"
            style={{ float: "right" }}
          >
            Generate Details
          </button>
        </div>
      </form>

      <form
        onSubmit={(e) => BillGenerator(e, 3)}
        className="d-flex w-100 flex-wrap justify-content-between"
      >
        <div className="col-12 col-md-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Countries
            </label>
            <select
              name="countries"
              className="form-select"
              aria-label="Default select example"
            >
              <option value={-1}>Open this select menu</option>
              {option.countriesData.map((x: string) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12 col-md-2 ">
          <button
            className="btn btn-warning"
            type="submit"
            style={{ float: "right" }}
          >
            Generate Details
          </button>
        </div>
      </form>

      <div className="w-100 my-2">
        {state.data.length > 0 ? (
          (page == 1) ? (<Innoviece customer_id={parseInt(userId.toString())} />) 
          : ( <ListDetails table={table} /> )
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default GenerateBill;
