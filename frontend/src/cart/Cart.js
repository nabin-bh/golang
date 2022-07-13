import { useState } from "react"

 
function Cart(props) { 
    let carts = props.cart
    
    return (
        <div className="container"> 
            <div className="container-fluid bg-trasparent " >
                <div className=" ">
                    <div className="form">
                        <h1>Cart</h1> 

                        <table className="table table-sm table-stripped">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Product Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>

                                </tr>

                            </thead>
                            <tbody>
                                {
                                    carts.map((data, index) => {
                                        return (
                                            <tr>
                                                <td>{ index+1 }</td>
                                                <td>{ data.name }</td>
                                                <td>1</td>
                                                <td>{ data.price }</td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={3} className="text-center">Total</th>
                                    <th>100</th>
                                </tr>
                                <tr>
                                    <th colSpan={4} className="text-center"><button className="btn btn-sm btn-success">Checkout</button></th>
                                     
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Cart