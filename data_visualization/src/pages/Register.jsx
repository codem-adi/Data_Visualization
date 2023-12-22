import { useEffect, useState } from 'react';
import "../styling/register.css"
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate()
    const initiaState = { firstName: "", lastName: "", email: "", phone: "", password: "" }
    const [formValues, setFormValues] = useState(initiaState);
    const [formErrors, setFormErrors] = useState({});

    // Sending the data to the server
    function postDetails(data) {
        try {
            fetch('http://localhost:3000/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((resp) => { return resp.json() })
                .then((offer) => {
                    //  navigate("/final", { state: { 'message': "Failed to submit form" } });
                    //here we are
                })
                .catch((error) => {
                    //  navigate("/")
                });
        }
        catch {

        }
    }
    function handleChange(e) {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })

    }

    function handleSubmit(e) {
        e.preventDefault();
        const validateErr = validate(formValues)
        if (Object.keys(validateErr).length) {
            setFormErrors(validateErr)
        }
        else {
            postDetails(formValues)
        }

    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.firstName) {
            errors.firstName = "First name is required";
        } else if (values.firstName.length < 3) {
            errors.firstName = "First name should be more then 3 letters"
        }
        if (!values.lastName) {
            errors.lastName = "Last name is required";
        } else if (values.lastName.length < 3) {
            errors.lastName = "Last name should be more then 3 letters"
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Not a valid email"
        }
        if (!values.phone) {
            errors.phone = "Phone Number is required";
        } else if (values.phone.length < 10) {
            errors.phone = "Phone number must be 10 digit"
        }
        else if (values.phone.length > 10) {
            errors.phone = "Phone number can't be more then 10 digit"
        }
        if (!values.password) {
            errors.phone = "Password is required";
        } else if (values.phone.length < 8) {
            errors.phone = "Password can't be 10 less charecters"
        }
        return errors;
    }

    return (
        <div className='register_parent'>
            <div className='nav_register'>
                <button onClick={() => { navigate("/login") }}>Login</button>
            </div>

            <div className="register_form">
                <form className='details_form' onSubmit={handleSubmit}>
                    <div className="form_input_container">
                        <label className="form-label">First Name</label>
                        <input type="text" onChange={handleChange} className="form-control" id="InputFName" name="firstName" value={formValues.firstName} />
                    </div>
                    <span className='inpurt_error'>{formErrors.firstName}</span>
                    <div className="form_input_container">
                        <label className="form-label">Last Name</label>
                        <input type="text" onChange={handleChange} className="form-control" id="InputLName" name="lastName" value={formValues.lastName} />
                    </div>
                    <span className='inpurt_error'>{formErrors.lastName}</span>
                    <div className="form_input_container">
                        <label className="form-label">Email address</label>
                        <input type="email" onChange={handleChange} className="form-control" name="email" id="InputEmail" value={formValues.email} />
                    </div>
                    <span className='inpurt_error'>{formErrors.email}</span>
                    <div className="form_input_container">
                        <label className="form-label">Phone Number</label>
                        <input type="number" onChange={handleChange} className="form-control" name="phone" id="InputNumber" value={formValues.phone}></input>
                    </div>
                    <span className='inpurt_error'>{formErrors.phone}</span>
                    <div className="form_input_container">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={handleChange} className="form-control" name="password" id="InputPassword" value={formValues.password}></input>
                    </div>
                    <span className='inpurt_error'>{formErrors.password}</span>

                    <button type="submit" className="signup_btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register