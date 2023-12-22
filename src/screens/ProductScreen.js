import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../Redux/slice/product/productDetailsSlice';
import Loader from '../components/Loader'
import Messsage from '../components/Message'


const ProductScreen = () => {
    let navigate = useNavigate();
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // const [product, setProduct] = useState([])

    const params = useParams()
    // const product = products.find((p) => p._id === params.id)
    useEffect(() => {
        // async function fetchProduct() {
        //     const { data } = await axios.get(`/api/products/${params.id}`)
        //     setProduct(data)
        // }
        // fetchProduct()
        dispatch(listProductDetails(params.id))
    }, [dispatch, params])

    const addToCartHandler = () => {
        // console.log('Add to Cart', params.id)
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <div>
            {/* {JSON.stringify(product)} */}
            {/* {product.name} */}
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Messsage varient='danger'>{error}</Messsage>
                    :
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: {product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block' disabled={product.countInStock === 0}
                                            type='button'>
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default ProductScreen
