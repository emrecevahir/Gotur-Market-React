import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DeleteForeverOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { addOneProduct, clearCart, removeOneProduct, removeItem } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import YesNoModal from '../components/YesNoModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function Cart() {
    const dispatch = useDispatch()



    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalAll, setIsShowModalAll] = useState(false)

    const [productId, setProductId] = useState("")


    const onClickYes = () => {
        setIsShowModal(false)
        dispatch(removeItem(productId))
        toast.success("Product Removed")
    }

    const onClickYesAll = () => {
        setIsShowModalAll(false)
        dispatch(clearCart())
        toast.success("Product Removed")

    }
    const removeItemFromComponent = async (id) => {
        // dispatch(removeItem(id))
        setIsShowModal(true)
        setProductId(id)
    }
    const incrementProduct = (product)=>{
        if(product.cartQuantity !== product.quantity){
            dispatch(addOneProduct(product))
        }
        else{
            toast.error("No Enough Stock")
        }
    }
    console.log(productId)

    const calculateTotal = () => {
        return products.reduce((total, product) => total + product.price * product.cartQuantity, 0);
    }
        

    const { products } = useSelector(state => state.cart)
    const { user, phonenumber,username } = useSelector(state => state.user)
    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Image</TableCell>
                        <TableCell align='center'>Product Name</TableCell>
                        <TableCell align='center'>Price</TableCell>
                        <TableCell align='center' >Quantity</TableCell>

                        <TableCell align='center'>Actions</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <img src={product.image} alt="product image" className="cardImage" />
                            </TableCell>
                            <TableCell align='center'>{product.productName}</TableCell>
                            <TableCell align='center'>{product.price}</TableCell>
                            <TableCell align='center'>
                                <RemoveCircleOutlineIcon className='mx-2'
                                    onClick={product.cartQuantity === 1 ? ()=>removeItemFromComponent(product._id) : () => dispatch(removeOneProduct(product))} />
                                {product.cartQuantity}
                                <AddCircleOutlineIcon className='mx-2' 
                                onClick={product.cartQuantity >=  product.quantity ?()=>incrementProduct(product._id) : () => dispatch(addOneProduct(product))} />
                            </TableCell>

                            <TableCell align='center'>
                                <DeleteForeverOutlined
                                    color="error" variant="outlined"
                                    onClick={() => removeItemFromComponent(product._id)}
                                /></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div className='flex justify-end m-4'>
        <div className='flex justify-end m-4'>
            <h3>Sepet Toplamı: ₺{calculateTotal().toFixed(2)}</h3>
        </div>
            <Button color="error" variant="outlined" startIcon={<DeleteForeverOutlined />} onClick={() => setIsShowModalAll(true)}>Clear İtems</Button>

        </div>

        {/* Tek tek silmek için */}
        <YesNoModal isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            title="Remove From Cart"
            desc='Would you like to remove item from cart ?'
            onClickYes={onClickYes}
        />
        {/* toplu silmek için */}
        <YesNoModal isShowModal={isShowModalAll}
            setIsShowModal={setIsShowModalAll}
            title="Clear Cart"
            desc='Would you like to clear cart ?'
            onClickYes={onClickYesAll}
        />
       

    </>
    )
}

export default Cart