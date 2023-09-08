
import React, { useState, useEffect } from 'react';
import { setAuthHeader, request } from "../axiosFile/axios_helper";
import './ListOfProducts.css'
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

import {Button, Dialog, Group, Pagination, rem, ScrollArea, Text, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconMessage2} from "@tabler/icons-react";

function ListOfProducts() {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalProductsCount, setTotalProductsCount] = useState(0);
    const [opened, { toggle, close }] = useDisclosure(false);
    const [chatInfo,{ openChat, closeChat }] = useDisclosure(false);
    const [tempDial, setTempDial] = useState('');
    const [message, setMessage] = useState('');

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

    };

    const handleSendMessage = () => {
        // Add the message to tempDial and reset the message input
        setTempDial((prevDial) => prevDial + `\n${message}`);
        setMessage('');
    };



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
                            <th width={"170"}>Posted date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={product.imageUrl}
                                         alt={product.name}
                                         style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td>
                                    {product.name}
                                </td>
                                <td>${product.price}</td>
                                <td>
                                    {product.user.firstName}

                                    <Button compact onClick={toggle} rightIcon={<IconMessage2 />}
                                            variant="white" size={rem(5)} />
                                    <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md" >
                                        <Text size="sm" mb="xs" weight={500}>
                                            Send a message to {product.user.firstName} as {localStorage.getItem("userLogin")}
                                        </Text>
                                        <ScrollArea h={200}>
                                        <Text>
                                            {tempDial}
                                        </Text>
                                        </ScrollArea>
                                        <TextInput
                                            placeholder="Send a message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rightSection={
                                                <Button onClick={handleSendMessage} rightIcon={<IconMessage2 />} />
                                            }
                                            ></TextInput>
                                    </Dialog>

                                </td>
                                <td>{new Date(product.createdDate).toLocaleDateString()}</td>
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

        </div>
    );
}

export default ListOfProducts;