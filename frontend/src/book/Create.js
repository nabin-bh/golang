import {useState} from "react";

function Create() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name : "",
        category : "",
        author : "",
        price : 0.00,
        description : ""
    })

    const handleChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })

        console.log(formData)
      }


    let saveBook = () => {
        setLoading(true)
        fetch('http://localhost:8080/books/store', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(res => {
                console.log(res)

                setLoading(false)
            }).catch(() => {
            setLoading(false)
        });

    }
    return (
        <div className="container">
            <center>{ loading ? "loading...." : '' }</center>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label htmlFor="">Name: </label>
                    <input type="text" name="name" className="form-control" onInput={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label htmlFor="">Category: </label>
                    <select type="text" name="category" onChange={handleChange} className="form-control">
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
                    <label htmlFor="">Author: </label>
                    <input type="text" name="author" onChange={handleChange} className="form-control"/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label htmlFor="">Price: </label>
                    <input type="number" name="price" onChange={handleChange} className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label htmlFor="">Description: </label>
                    <input type="text" name="description" onChange={handleChange} className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <br/>
                    <button className="btn btn-success" onClick={() => saveBook() }>Save Book</button>
                </div>
            </div>
        </div>
    );
}

export default Create;
