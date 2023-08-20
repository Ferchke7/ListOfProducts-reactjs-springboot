import { Table } from '@mantine/core';
import {useEffect, useState} from "react";
import {request} from "../../axiosFile/axios_helper";

function UsersProduct({ userId }) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        if (userId !== null) {
            request("GET", `/myproducts/${userId}`)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [userId]);

    const rows = products.map((product) => (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.imageUrl}</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
export default UsersProduct