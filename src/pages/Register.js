import { Button, InputAdornment, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'
import axios from 'axios'
import { Formik,Form} from 'formik';
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import bg from '../assets/images/bg-image.jpg'
import { Visibility, VisibilityOff } from '@mui/icons-material';




const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
        .min(3, "Name is too short!")
        .max(20, "Name is too long"),
    surname: Yup.string().required("Surname is required")
    .min(3, "Surname is too short!")
    .max(20, "Surname is too long"),
    username: Yup.string().required("Username is required")
        .min(3, "Username is too short!")
        .max(20, "Username is too long"),
    password: Yup.string().required("Password is required!")
        .min(4, "Password is too short!"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password")], "Password not match!").required("Password not matched!"),
    phonenumber: Yup.string().required("Phone Number is required!")
})

function Register() {
const [isShow, setIsShow] = useState(true)
const [isShowConfirm, setIsShowConfirm] = useState(true)

    const navigate = useNavigate()
    const handleRegister = async (registerObject) => {
        try {
            let response = await axios.post("http://localhost:9000/user/register", registerObject)
            console.log(response.data)
            if (response.data.status) {
                navigate("/login")
                toast.success(response.data.message)
            }

        }
        catch (error) {
            toast.error(error.response.data.message)
            console.log("Login Error : ", error.response.data.message)
        }
    }


    return (
        <div className='flex justify-center h-screen items-center' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div style={{ minWidth: "300px" }} className='border-gray-300 border-2 p-6 rounded-md bg-gray-800 bg-opacity-20'>
               
                <Formik
                    initialValues={{name:"",surname:"", username: "", password: "", email: "", passwordConfirm: "",phonenumber:"" }}
                    onSubmit={(value) => handleRegister(value)}
                    validationSchema={RegisterSchema}
                >
                    
                    {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                        <Form>
                            <div>
                                <TextField
                                    label="Name" variant="standard" required
                                    fullWidth
                                    value={values.name}
                                    onChange={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Surname" variant="standard" required
                                    fullWidth
                                    value={values.surname}
                                    onChange={handleChange("surname")}
                                    onBlur={handleBlur("surname")}
                                    error={touched.surname && Boolean(errors.surname)}
                                    helperText={touched.surname && errors.surname}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Username" variant="standard" required
                                    fullWidth
                                    value={values.username}
                                    onChange={handleChange("username")}
                                    onBlur={handleBlur("username")}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </div>
                            <div className='my-4'>
                                <TextField
                                    label="Email" variant="standard" type="email" required
                                    fullWidth
                                    value={values.email}
                                    onChange={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </div>
                            
                            <div className='my-4'>
                                <TextField
                                    label="Password" variant="standard" type={isShow ? "text" : "password" } required
                                    fullWidth
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps= {{
                                        endAdornment : <InputAdornment position='end' onClick={()=>setIsShow(!isShow)}>
                                    {
                                        isShow ? <VisibilityOff/> : <Visibility/>
                                    }
                                    
                                    </InputAdornment>}}
                                    
                                />
                            </div>
                            <div className='my-4'>
                                <TextField
                                    label="Password Confirm" variant="standard" type={isShowConfirm ? "text" : "password" } required
                                    fullWidth
                                    value={values.passwordConfirm}
                                    onChange={handleChange("passwordConfirm")}
                                    onBlur={handleBlur("passwordConfirm")}
                                    error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                                    InputProps= {{
                                        endAdornment : <InputAdornment position='end' onClick={()=>setIsShowConfirm(!isShowConfirm)}>
                                    {
                                        isShowConfirm ? <VisibilityOff/> : <Visibility/>
                                    }
                                    
                                    </InputAdornment>}}


                                />
                            </div>
                            <div>
                                <TextField
                                    label="Phone Number" variant="standard" required
                                    fullWidth
                                    value={values.phonenumber}
                                    onChange={handleChange("phonenumber")}
                                    onBlur={handleBlur("phonenumber")}
                                    error={touched.phonenumber && Boolean(errors.phonenumber)}
                                    helperText={touched.phonenumber && errors.phonenumber}
                                />
                            </div>

                            <div className='my-4'>

                                <span className='my-3 text-sm'>Do You Have an account?
                                    <Link to="/login" className="underline text-blue-500 ml-1">Login Now!</Link></span>
                            </div>
                            <div className='flex justify-center mt-3'>
                                <Button variant="outlined" type="submit" size='large' onClick={handleSubmit} endIcon={<SendIcon />}>Create Account</Button>
                            </div>

                        </Form>
                    )}

                </Formik>
                

            </div>
        </div>
    )
}

export default Register