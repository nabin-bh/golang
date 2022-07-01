import {useState} from "react";

function Index() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name : "",
        address : "",
        description : ""
    })


    let submitForm = () => {
        setLoading(true)
        fetch('http://localhost:8080/blog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({a: 7, str: 'Some string: &=&'})
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
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label htmlFor="">Address: </label>
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <label htmlFor="">Description: </label>
                    <input type="text" className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4 col-offset-4">
                    <button className="btn btn-success" onClick={() => submitForm() }>Save Form Data</button>
                </div>
            </div>
        </div>
    );
}

export default Index;
