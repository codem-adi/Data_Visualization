import { useEffect, useState } from 'react';
import axios from 'axios';
import MakeToast from '../components/MakeToast';
import { useNavigate } from 'react-router-dom';
import "../styling/login.css"

export default function Login() {

    const navigate = useNavigate()
    const initiaState = { email: "", password: "" }
    const [formValues, setFormValues] = useState(initiaState);
    const [formErrors, setFormErrors] = useState({});
    const [popupMessage, setPopupMessage] = useState();

    // Sending the data to the server
    async function postDetails(data) {
        try {

            const request = await axios.post('http://localhost:3000/api/v1/user/login', { data })
            const response = request.data
            // alert(response.message)
            setPopupMessage(response.message)
            if (response.status) {
                localStorage.setItem("visualization_user_token", JSON.stringify(response.token))
                navigate("/")
            }

            // .then((resp) => { return resp.json() })
            // .then((offer) => {
            //     //  navigate("/final", { state: { 'message': "Failed to submit form" } });
            //     //here we are
            // })
            // .catch((error) => {
            //     //  navigate("/")
            // });
        }
        catch (error) {
            console.log("Error ", error.response.data);
            setPopupMessage(error.response.data.message)
            // alert(error.response.data.message)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })

    }

    function handleSubmit(e) {
        // console.log("Calling submit ")
        e.preventDefault();
        const errors = validate(formValues)
        if (Object.keys(errors).length === 0) {
            postDetails(formValues)
        }
        setFormErrors(errors);
        // setIsSubmit(true)
    }

    const validate = (values) => {
        console.log(values);
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Not a valid email"
        }
        if (!values.password) {
            errors.password = "Please provide the password";
        }
        return errors;
    }

    return (
        <div className='login_form_parent'>
            <div className='nav_register'>
                <button onClick={() => { navigate("/register") }}>Register</button>
            </div>

            <div className="login_form_container">
                <form className='details_form' onSubmit={handleSubmit}>
                    <span className='inpurt_error'>{formErrors.email}</span>
                    <div className="form_input_container">
                        <label className="form_label">Email address</label>
                        <input type="email" onChange={handleChange} className="form-control" name="email" id="InputEmail" value={formValues.email} />
                    </div>
                    <span className='inpurt_error'>{formErrors.password}</span>
                    <div className="form_input_container">
                        <label className="form_label">Password</label>
                        <input type="password" onChange={handleChange} className="form-control" name="password" id="InputPassword" value={formValues.password}></input>
                    </div>
                    <button type="submit" className="login_button">Login</button>
                </form>
                <MakeToast props={{ popup: false, message: popupMessage }} />
            </div>
        </div>
    );
}
