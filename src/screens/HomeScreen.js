import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Redux/slice/product/productSlice';
import React, { useEffect } from 'react'

function HomeScreen() {
    const dispatch = useDispatch()
    // const products = []
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList
    // const [products, setProducts] = useState([])
    // useEffect(() => {
    //     // console.log('Use Effect Triggered')
    //     async function fetchProducts() {
    //         const { data } = await axios.get('http://127.0.0.1:8000/api/products/')
    //         setProducts(data)
    //     }
    //     fetchProducts()
    // }, []);

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <h2>Loading....</h2>
                : error ? <h3>{error}</h3>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }


        </div>
    )
}

export default HomeScreen
