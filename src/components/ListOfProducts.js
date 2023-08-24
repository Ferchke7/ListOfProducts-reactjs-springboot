
import React, { useState, useEffect } from 'react';
import { setAuthHeader, request } from "../axiosFile/axios_helper";
import './ListOfProducts.css'
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { UserInfoIcons } from "./userInfo/UserInformation";
import { Pagination } from "@mantine/core";

function ListOfProducts() {
    const [products, setProducts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalProductsCount, setTotalProductsCount] = useState(0);



    useEffect(() => {
        request('GET', `/products?page=${currentPage}&pageSize=${itemsPerPage}`, {})
            .then((response) => {
                setProducts(response.data.content);
                console.log("Product" + response.data)
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    console.error('Error fetching products:', error);
                }
            });
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page);
        console.log("onPageChange triggered. Current page:", currentPage);
        console.log("onPageChange triggered. Current page:", page);
    };
    const handleProductClick = (user) => {
        setUserInfo(user);
    }


    useEffect(() => {
        request('GET', '/products/count', {})
            .then((response) => {
                setTotalProductsCount(Math.ceil(response.data / itemsPerPage));
            })
            .catch((error) => {
                console.error('Error fetching product count:', error);
            });
    }, []);

    return (
        <div className="row justify-content-md-center">
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
                        {products.map((product, index) => (
                            <tr key={index} onClick={() => handleProductClick(product.user)}>
                                <td>
                                    <img src={product.imageUrl}
                                         alt={product.name}
                                         style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.user.firstName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination
                        total={totalProductsCount}
                        itemsPerPage={10}
                        currentPage={currentPage}
                        onChange={onPageChange}
                        position="center"
                        styles={(theme) => ({
                            control: {
                                '&[data-active]': {
                                    backgroundImage: theme.fn.gradient({ from: 'blue', to: 'black' }),
                                    border: 0,
                                },
                            },
                        })}
                    />
                </div>
            </div>
            {userInfo && (
                <UserInfoIcons name={userInfo.firstName} email={userInfo.email} />
            )}
        </div>
    );
}

export default ListOfProducts;