import {useEffect, useState} from "react";
import axios from "axios";
import {
    Input,
    FileInput,
    NumberInput,
    Button,
    Box,
    LoadingOverlay
} from "@mantine/core";
import { Icon3dCubeSphere} from "@tabler/icons-react";
import '../style/Product-form.css'
import {useDisclosure} from "@mantine/hooks";
import {notifications} from "@mantine/notifications";
function ProductForm({ authToken }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState();
    const userLogin = localStorage.getItem("userLogin")
    const [visible, { toggle }] = useDisclosure(false);
    const [createdNotification, setCreatedNotification] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("file", image);

        console.log(image)

        try {
            const response = await axios.post("/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    authenticatedUserLogin: userLogin,
                },
            });
            console.log(response.data);
            notifications.show({ message: `Product ${name} has been created`})

        } catch (error) {
            console.error("Error uploading product:", error);
            notifications.show({
                message: 'OOPS something went wrong' ,
                color: 'red'})
        }
        const click = toggle;
        click()

    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
        <Box maw={320} mx="auto" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} onClick={toggle}/>
            <Input
                icon={<Icon3dCubeSphere />}
                placeholder="Name of Product"
                radius="xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <NumberInput
                label="Price"
                value={price}
                onChange={(value) => setPrice(value)}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                        ? `$ ${value}`.replace(
                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                            ","
                        )
                        : "$ "
                }
            />
            <FileInput
                placeholder="Pick a file"
                label="Picture of a product"
                value={image}
                onChange={setImage}
            />
            <Button type="submit" color="yellow" onClick={toggle}>
                Submit a product
            </Button>
        </Box>
        </form>
    );
}

export default ProductForm;
