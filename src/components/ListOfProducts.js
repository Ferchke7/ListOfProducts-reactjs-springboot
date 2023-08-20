import React, { Component } from 'react';
import {setAuthHeader , request} from "../axiosFile/axios_helper";
import './ListOfProducts.css'
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {UserInfoIcons} from "./userInfo/UserInformation";

class ListOfProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            userInfo: null,
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
    handleProductClick = (user) => {
        this.setState({ userInfo: user })
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div>
                    <div className="card w-100">
                        <div className="card-body">
                            <h5 className="card-title">List of Products</h5>
                            <p className="card-text">Products:</p>
                            <Table stripped bordered hover size={"sm"}>
                                <thead>
                                <tr>
                                    <th width={"170"}>Picture of Product</th>
                                    <th width={"170"}>Name of Product</th>
                                    <th width={"170"}>Price</th>
                                    <th width={"170"}>Distributor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.products.map((product, index) => (
                                    <tr key={index} onClick={() => this.handleProductClick(product.user)}>
                                        {/*TODO Change this for detailed Product*/}
                                        <td>
                                            <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.user.firstName}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                {this.state.userInfo && (
                    <UserInfoIcons name={this.state.userInfo.firstName}
                                   email={this.state.userInfo.email} />
                )}
            </div>
        );
    }
}

export default ListOfProducts;