import axios from "axios";
import {useEffect, useState} from "react";

function Index() {
    const [loading, setLoading] = useState(false)
    const [books, setBooks] = useState([])

    useEffect(()=> {
        getBookList()
    }, [])

    function getBookList(){
        setLoading(true)

        axios.get("http://localhost:8080/books").then(response => {
            console.log(response.data)
            setBooks(response.data)
            setLoading(false)
        })
    }
    
    return (
        <div className="container">
            <center>{ loading ? "loading...." : '' }</center>
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
                            books.map((book, index)=> {
                                return (
                                    <tr key={book.id}>
                                        <td>{index}</td>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.price}</td>
                                        <td>{book.description}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
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
