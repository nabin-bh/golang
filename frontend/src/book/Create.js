import { useState } from "react";

function Create() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        author: "",
        price: 0.00,
        description: ""
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }


    let saveBook = () => {
        setLoading(true)
        let datat = formData

        fetch('http://localhost:8080/books/store', {
            method: 'POST',
            mode: 'no-cors',
            json: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datat)
        }).then(res => {
            console.log(res);
            return res.json();
        })
            .then(res => {
                console.log(res)
                setFormData({
                    name: "",
                    category: "",
                    author: "",
                    price: 0.00,
                    description: ""
                })

                setLoading(false)
            }).catch(() => {
                setLoading(false)
            });

    }
    return (
        <div className="container">
            <center>{loading ? "loading...." : ''}</center>
            <h1 align="center">Create Book</h1>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label >Name: </label>
                    <input type="text" name="name" value={formData.name} className="form-control" onInput={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label >Category: </label>
                    <select type="text" name="category" value={formData.category} onChange={handleChange} className="form-control">
                        <option value="">Select Category</option>
                        <option>Fantasy</option>
                        <option>Poem</option>
                        <option>Contemporary</option>
                        <option>Sci-Fi</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label >Author: </label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} className="form-control" />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label >Price: </label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label >Description: </label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <br />
                    <button className="btn btn-success" onClick={() => saveBook()}>Save Book</button>
                </div>
            </div>
        </div>
    );
}

export default Create;
