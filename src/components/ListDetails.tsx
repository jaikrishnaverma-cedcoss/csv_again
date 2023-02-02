import React from 'react'


const ListDetails = ({table}: any) => {
   
 

    if (!Array.isArray(table)) {
        let obj: any = {}
        Object.entries(table).forEach((x:[string, unknown]):void => {
            obj[x[0]] = x[1]
        })
        table = [obj]
    }
    return (
        <div  className='d-flex flex-wrap justify-content-center  p-4 tabdiv' >
            <table className="table table-striped table-hover border" >
                <thead>
                    <tr>
                        {(table.length > 0) ? <th>id</th> : <th>No Data Available</th>}
                        {
                            (table.length > 0) && Object.keys(table[table.length-1]).map(x => <th scope="col">{x.replaceAll('_',' ')}</th>)
                        }
             
                    </tr>
                </thead>
                <tbody>
                    {
                        (table.length > 0) && table.map((row: any, i: number) => {
                            return <tr><td>{i}</td>{

                                Object.keys(row).map((val: string) => <td>{row[val]}</td>)
                            }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}

export default ListDetails