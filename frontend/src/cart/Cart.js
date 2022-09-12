import { useState } from "react"
import { useCookies } from 'react-cookie';

function Cart({ setCartP, ...props }) {
    let carts = props.cart
    const [cookies, setCookie] = useCookies(['user']);
    const result = carts.reduce((total, currentValue) => total = parseFloat(total) + parseFloat(currentValue.price), 0);
    const [checkoutSuccess, setCheckoutSuccess] = useState(0)

    function removeFromCart(e) {
        let index = e.target.getAttribute("data-info")
        let newArray = props.cart.filter((e, i) => i != index);
        console.log(newArray)
        setCartP(newArray)
        setCookie('Cart', newArray, { path: '/' });

    }

    let checkoutOrder = () => {
        let datat = props.cart
        let checkout_id = new Date().getUTCMilliseconds();

        datat = datat.map((data, index) => {

            return {
                user_id: 1,
                product_id: data.id,
                qty: 1,
                price: data.price,
                created_at: new Date().toJSON().split('.')[0].split('T').join(' '),
                checkout_id: checkout_id
            }
        })

        datat.forEach((element, index) => {
            let singledata = element
            fetch('http://localhost:8080/checkout', {
                method: 'POST',
                mode: 'no-cors',
                json: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(singledata)
            })
                .then(res => {

                    console.log(res)
                    console.log("datat.length", datat.length)
                    console.log("index", index)
                    if (datat.length == (index + 1)) {


                        let cart = []
                        setCartP(cart)
                        setCookie('Cart', cart, { path: '/' });

                        setCheckoutSuccess(true)

                        setTimeout(() => {
                            setCheckoutSuccess(false)
                        }, 2000)
                    }

                    // make empty cart


                }).catch((e) => {
                    console.log(e)
                });
        });


    }

    return (
        <div className="container">
            <div className="container-fluid bg-trasparent " >
                <div className=" ">
                    <div className="checkoutBox">
                        {
                            checkoutSuccess ? <div className="alert alert-success">Checkout Success !! </div> : ''
                        }
                        <h1>Cart</h1>

                        <table className="table table-sm table-striped table">
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
                                                <td>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td>1</td>
                                                <td>{data.price}</td>
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
                                            <th>{result}</th>
                                            <th><button onClick={checkoutOrder} className="btn btn-sm btn-success">Checkout</button></th>
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

export default Cart