import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bg from '../assets/images/bg-image.jpg'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const categories = ["Atıştırmalık", "Gıda", "Börek"];


const ProductSchema = Yup.object().shape({
    productName: Yup.string().required("Name is required")
        .min(3, "Name is too short!")
        .max(20, "Name is too long"),
    price: Yup.number().required("Price is required"),
    quantity: Yup.number().required("Price is required"),
    image: Yup.string().required("İmage is required!"),
    category: Yup.string().required("Category is required"),
    company: Yup.string().required("Company is required!")
})

function AddProducts() {
    const [isShow, setIsShow] = useState(true)
    const [isShowConfirm, setIsShowConfirm] = useState(true)

    const handleProduct = async (addObject) => {
        try {
            let response = await axios.post("http://localhost:9000/product/addProduct", addObject)
            console.log(response.data)
            if (response.data.status) {
                toast.success(response.data.message)
            }

        }
        catch (error) {
            toast.error(error.response.data.message)
            console.log("Create Error : ", error.response.data.message)
        }
    }


    return (
        <div className='flex justify-center h-screen items-center' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div style={{ minWidth: "300px" }} className='border-gray-300 border-2 p-6 rounded-md bg-gray-800 bg-opacity-20'>

                <Formik
                    initialValues={{
                        productName: "",
                        price: "",
                        quantity: "",
                        image: "",
                        category: "",
                        company: ""
                    }}
                    onSubmit={(value) => handleProduct(value)}
                    validationSchema={ProductSchema}
                >
                    {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                        <Form>
                            <div>
                                <TextField
                                    label="Product Name" variant="standard" required
                                    fullWidth
                                    value={values.productName}
                                    onChange={handleChange("productName")}
                                    onBlur={handleBlur("productName")}
                                    error={touched.productName && Boolean(errors.productName)}
                                    helperText={touched.productName && errors.productName}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Price" variant="standard" required
                                    fullWidth
                                    value={values.price}
                                    onChange={handleChange("price")}
                                    onBlur={handleBlur("price")}
                                    error={touched.price && Boolean(errors.price)}
                                    helperText={touched.price && errors.price}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Quantity" variant="standard" required
                                    fullWidth
                                    value={values.quantity}
                                    onChange={handleChange("quantity")}
                                    onBlur={handleBlur("quantity")}
                                    error={touched.quantity && Boolean(errors.quantity)}
                                    helperText={touched.quantity && errors.quantity}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Image URL" variant="standard" required
                                    fullWidth
                                    value={values.image}
                                    onChange={handleChange("image")}
                                    onBlur={handleBlur("image")}
                                    error={touched.image && Boolean(errors.image)}
                                    helperText={touched.image && errors.image}
                                />
                            </div>
                            <div>
                                <FormControl fullWidth variant="standard" required>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={values.category}
                                        onChange={handleChange("category")}
                                        onBlur={handleBlur("category")}
                                        error={touched.category && Boolean(errors.category)}
                                    >
                                        {categories.map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    label="Company" variant="standard" required
                                    fullWidth
                                    value={values.company}
                                    onChange={handleChange("company")}
                                    onBlur={handleBlur("company")}
                                    error={touched.company && Boolean(errors.company)}
                                    helperText={touched.company && errors.company}
                                />
                            </div>
                            <div className='my-4'>
                                <Button variant="outlined" type="submit" size='large' endIcon={<SendIcon />}>Add Product</Button>
                            </div>
                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    )
}

export default AddProducts