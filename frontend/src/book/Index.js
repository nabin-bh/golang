import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const msg = `Item   (barcode  ) is not 
  currently in this display. Do you want to add it?`

function Index() {
    const [loading, setLoading] = useState(false)
    const [books, setBooks] = useState([])

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

    const deleteBook = (e) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do delete this item ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        axios.delete("http://localhost:8080/book/" + e.target.value).then(response => {
                            console.log(response.data)
                            getBookList()
                            setLoading(false)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => 'df'
                }
            ]
        });
    }

    return (
        <div className="container">
            <center>{loading ? "loading...." : ''}</center>
            <h1> Book List <Link to="/book/create" className="btn btn-sm btn-secondary book-create-btn">Create Book</Link>   </h1>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-sm table-stripped">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Descritpiom</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book, index) => {
                                    return (
                                        <tr key={book.id}>
                                            <td>{index}</td>
                                            <td>{book.name}</td>
                                            <td>{book.author}</td>
                                            <td>{book.price}</td>
                                            <td>{book.description}</td>
                                            <td>
                                                <Link className="btn btn-sm btn-primary" to={`/book/edit/${book.id}`} >Edit</Link> &nbsp;
                                                <button value={book.id} className="btn btn-sm btn-danger" onClick={deleteBook}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Index;
