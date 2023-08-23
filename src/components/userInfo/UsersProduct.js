import {rem, Table} from '@mantine/core';
import {useEffect, useState} from "react";
import {request} from "../../axiosFile/axios_helper";

function UsersProduct({ userId }) {

    const [products, setProducts] = useState([])
    console.log(userId)
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

        </tr>
    ));

    return (
        <Table style={{ border: `${rem(2)} solid grey` }} size="sm">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
export default UsersProduct