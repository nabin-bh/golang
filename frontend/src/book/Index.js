import {useEffect, useState} from "react";

function Index() {
    const [loading, setLoading] = useState(false)
    const [books, setBooks] = useState([])

    useEffect(()=> {
        getBookList()
    }, [])

    function getBookList(){
        setLoading(true)
        fetch('http://localhost:8080/books', { 
            mode: 'no-cors',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                // 'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            // setBooks(res)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        });
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
                                    <tr>
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
