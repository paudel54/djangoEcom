import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message';
import { addCartItemAsync } from '../Redux/slice/Cart/cartAddSlice';

const CartScreen = () => {
    const params = useParams()
    const id = params.id
    const location = useLocation()
    const navigate = useNavigate()

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('CartItems: test', cartItems)
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            // let payload = { id, qty }
            dispatch(addCartItemAsync({ id, qty }))
        }
    }, [dispatch, id, qty])

    return (
        <div>
            Cart Screen Test
        </div>
    )
}

export default CartScreen
