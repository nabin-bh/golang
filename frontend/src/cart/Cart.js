import { useState } from "react"
import { useCookies } from 'react-cookie';
 
function Cart({setCartP, ...props} ) { 
    let carts = props.cart
    const [cookies, setCookie] = useCookies(['user']);
    const result = carts.reduce((total, currentValue) => total = parseFloat(total) + parseFloat(currentValue.price),0);


    function removeFromCart(e){
        let index = e.target.getAttribute("data-info")
        let newArray = props.cart.filter((e, i) => i != index);
        console.log(newArray)
        setCartP(newArray)
        setCookie('Cart', newArray, { path: '/' });
         
    }
    
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
                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    carts.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{ index+1 }</td>
                                                <td>{ data.name }</td>
                                                <td>1</td>
                                                <td>{ data.price }</td>
                                                <td><button data-info={index} onClick={removeFromCart} className="btn btn-xs btn-danger">X</button></td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                            {
                                carts.length ? 
                               
                                <tfoot>
                                
                                    <tr>
                                        <th colSpan={3} className="text-center">Total</th>
                                        <th>{ result }</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={4} className="text-center"><button className="btn btn-sm btn-success">Checkout</button></th>
                                        
                                    </tr>
                                </tfoot>

                                : 

                                <tbody>
                                    <tr>
                                        <td colSpan={5} className="text-center">No Data</td>
                                    </tr>
                                </tbody>
                            
                            }
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Cart