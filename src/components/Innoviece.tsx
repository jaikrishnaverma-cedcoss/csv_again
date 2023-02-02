import React, { useEffect, useState } from "react";
import { useContextState } from "../context";
import "./innovice.css";
const Innoviece = ({ customer_id }: { customer_id: number }) => {
  const [details, setDetails] = useState<{ data: any,loading: boolean ,total:number} >({ data: [], loading: true ,total:0});
  const { state, setState } = useContextState();

  // responsible for calculate total
  useEffect(() => {
    let arrr: any = [];
    if (customer_id !== -1) {
      state.data.map((x: any) => {
        if (
          x &&
          x["CustomerID"] &&
          "CustomerID" in x &&
          x["CustomerID"].toString() === customer_id.toString()
        )
          {
            arrr.push(x);
        details.total += x.UnitPrice*x.Quantity
        }
      });
      setDetails({ ...details, data: arrr, loading: false });
    }
  }, [customer_id]);

  if (customer_id == -1) return <></>;

  if (details.loading)
    return (
      <div className="container py-4">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src="Pulse-1s-211px.gif" style={{ width: "60px" }} alt="" />
          <h5 className="text-primary m-3">Loading...</h5>
        </div>
      </div>
    );

  return (
    <> 
      <div className="border border-danger d-flex flex-column p-3 rounded">
        
        <section className="w-100 d-flex justify-content-between align-items-center my-1">
          <div className="col-6">
            <p className="fs-2 fw-bolder">#jai</p>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-danger">Print</button>
          </div>
        </section>

        <section className="w-100 d-flex flex-wrap justify-content-between align-items-center my-1">
          <div className="col-12 col-md-7">
            <p>Name:jai</p>
            <p>Country:england</p>
            <p>shop: jkv</p>
          </div>
          <div className="col-12 col-md-4">
            <p>Country:england</p>
            <p>shop: jkv</p>
          </div>
        </section>

        <section className="w-100 d-flex flex-wrap justify-content-between align-items-center my-1 ">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Stock Code</th>
                <th>Unit Price</th>
                <th>Innovice Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
           {
            details.data.map((x:any,i:number)=>{
                return    <tr>
                <td>#{i}</td>
                <td>{x.Description}</td>
                <td>{x.Quantity}</td>
                <td>{x.StockCode}</td>
                <td>${x.UnitPrice}</td>
                <td>{x.InvoiceDate}</td>
                <td>${(x.UnitPrice*x.Quantity).toFixed(2)}</td>
              </tr>
            })
           }
           <tr>
            <td colSpan={4}></td>
            <td colSpan={3} className='fs-3 text-primary '>Grand Total: &nbsp; ${ details.total.toFixed(2)}</td>
           </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Innoviece;
