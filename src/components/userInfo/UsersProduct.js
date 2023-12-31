import {ActionIcon, rem, Table} from '@mantine/core';
import {useEffect, useState} from "react";
import {request} from "../../axiosFile/axios_helper";
import {IconX} from "@tabler/icons-react";
import {notifications} from "@mantine/notifications";


function UsersProduct({ userId }) {

    const [products, setProducts] = useState([])
    const [deleteResponse, setDeleteResponse] = useState()
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (userId !== null) {

            request("GET", `/myproducts/${userId}`)
                .then((response) => {
                    setProducts(response.data);
                    setRefresh(false)
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [userId, refresh]);

    const openDeleteProduct = (imageId, imageName) => {
        console.log("WORKING and delete if " + imageId)
        request("DELETE", `/delete/${imageId}`)
            .then((response) => {
                setDeleteResponse(response)
                notifications.show({
                    message: `you've deleted successfully image of ${imageName}`,
                color: 'red'})
                setRefresh(true)
            })
            .catch((error) => {
                console.error('Error fetching and deleting:', error);
            })
    }

    const rows = products.map((product) => (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{new Date(product.createdDate).toLocaleDateString()}</td>
            <ActionIcon onClick={() => {
                openDeleteProduct(product.id,product.name)}
            }><IconX size="1rem" color="red" /></ActionIcon>
        </tr>
    ));

    return (
        <Table style={{ border: `${rem(2)} solid grey` }} size="sm">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Date of creation</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
export default UsersProduct