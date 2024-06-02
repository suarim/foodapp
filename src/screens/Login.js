import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();  // Correctly initialize navigate inside the component
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert('Enter valid credentials');
        } else {
            localStorage.setItem('authToken',json.authtoken)
            navigate('/');  // Use navigate to redirect after successful login
        
        }
    };

    const onChange = (event) => setCredentials({
        ...credentials, [event.target.name]: event.target.value
    });

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-success m-3">
                        Submit
                    </button>
                    <Link to="/createuser" className="m-3 btn btn-danger">
                        SignUp
                    </Link>
                </form>
            </div>
        </>
    );
}

export default Login;
