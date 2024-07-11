import { Button, InputAdornment, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import { Link, useNavigate, useNavigationType } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import bg from '../assets/images/bg-image.jpg'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../store/slices/userSlice';


const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required")
        .min(3, "Username is too short!")
        .max(20, "Username is too long"),
    password: Yup.string().required("Password is required!")
        .min(4, "Password is too short!")
})


function Login() {
    const [isShow, setisShow] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setLogin = async (loginObject) => {
        try {
            let response = await axios.post("http://localhost:9000/user/login", loginObject)
            console.log(response.data)
            if (response.data.status) {
                toast.success(response.data.message)
                let decoded = jwtDecode(response.data.access_token)
                localStorage.setItem("access_token",response.data.access_token)
                dispatch(handleLogin(response.data.user)) 
                navigate("/")
            }

        }
        catch (error) {
            toast.error(error.response.data.message)
            console.log("Login Error : ", error.response.data.message)
        }
    }
    return (
        <div className='flex justify-center h-screen items-center' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div style={{ minWidth: "300px" }} className='border-gray-300 border-2 p-6 rounded-md bg-gray-600 bg-opacity-20'>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(value) => setLogin(value)}
                    validationSchema={LoginSchema}
                >
                    {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                        <Form>
                            <div>
                                <TextField
                                    label="Username" variant="standard" required
                                    value={values.username}
                                    onChange={handleChange("username")}
                                    onBlur={handleBlur("username")}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </div>
                            <div className='my-4'>
                                <TextField
                                    label="Password" variant="standard" type={isShow ? "text" : "password"} required
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end' onClick={() => setisShow(!isShow)}>
                                            {
                                                isShow ? <VisibilityOff/> : <Visibility/>

                                            }
                                        </InputAdornment>
                                    }}


                                />
                            </div>
                            <div className='my-4'>

                                <span className='my-3 text-sm'>Don't Have an account?
                                    <Link to="/register" className='"underline text-blue-500 ml-1'>Create Now!</Link></span>
                            </div>
                            <div>
                                <Button variant="outlined" type="submit" size='large' onClick={handleSubmit} endIcon={<SendIcon />}>Login</Button>
                            </div>
                        </Form>
                    )}

                </Formik>

            </div>
        </div>
    )
}

// 

export default Login