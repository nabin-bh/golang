import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Home({ setCartP, ...props }) {
    const [loading, setLoading] = useState(false)
    const [exist, setExist] = useState(false)
    const [books, setBooks] = useState([])
    const [cookies, setCookie] = useCookies(['user']);

    function addToCart(e) {
        let book = books[e.target.getAttribute("data-info")]
        let cart = props.cart

        const found = cart.find(obj => {
            return obj.id === book.id;
        })

        if (!found) {
            let newArray = props.cart.concat([book])
            setCartP(newArray)
            setCookie('Cart', newArray, { path: '/' });
        } else {
            setExist(true)
            setTimeout(() => {
                setExist(false)
            }, 2000)
        }
    }

    useEffect(() => {
        getBookList()
    }, [])

    function getBookList() {
        setLoading(true)

        axios.get("http://localhost:8080/books").then(response => {
            setBooks(response.data)
            setLoading(false)
        })
    }

    return (
        <div className="container">
            {loading ? <center className="alert alert-success"> loading....</center> : ''}
            {exist ? <center className="alert alert-warning">item already in cart </center> : ''}
            <div className="container-fluid bg-trasparent my-4 p-3" >
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {
                        books.map((book, index) => {
                            return (
                                <div className="col hp" key={book.id}>
                                    <div className="card h-100 shadow-sm">
                                        <Link to={`book/details/${book.id}`} >
                                            <img src="https://res.cloudinary.com/jerrick/image/upload/v1610450296/5ffd857883f7a1001c77a8bf.jpg" className="card-img-top" alt="product.title" />
                                        </Link>

                                        <div className="label-top shadow-sm">
                                            <a className="text-white" href="#">{book.category}</a>
                                        </div>
                                        <div className="card-body">
                                            <div className="clearfix mb-3">
                                                <span className="float-start badge rounded-pill bg-success">RS.{book.price}</span>

                                                <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
                                            </div>
                                            <h5 className="card-title">
                                                <a target="_blank" href="#">{book.name}</a>
                                            </h5>

                                            <div className="d-grid gap-2 my-4">

                                                <button data-info={`${index}`} onClick={addToCart} className="btn btn-warning bold-btn">add to cart</button>

                                            </div>
                                            <div className="clearfix mb-1">

                                                <span className="float-start"><a href="#"><i className="fas fa-question-circle"></i></a></span>

                                                <span className="float-end">
                                                    <i className="far fa-heart"  ></i>

                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="small text-muted my-4">Designed by <a target="_blank" href="https://www.github.com/nabin-bh">Nabin</a></div>
        </div>
    );
}

export default Home;
