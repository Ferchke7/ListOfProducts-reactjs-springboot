import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {setAuthHeader , request} from "../axiosFile/axios_helper";


class ListOfProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        // Make the API call to fetch products and update the state accordingly
        request(
            "GET",
            "/products",
            {}).then(
            (response) => {
                this.setState({ products: response.data });
            }).catch(
            (error) => {
                if (error.response && error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    console.error('Error fetching products:', error);
                    // Handle the error state differently if needed
                }
            }
        );
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-4">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">List of Products</h5>
                            <p className="card-text">Content:</p>
                            <ListGroup>
                                {this.state.products.map((product, index) => (
                                    <ListGroup.Item key={index}>
                                        {product.name} - ${product.price.toFixed(2)}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListOfProducts;