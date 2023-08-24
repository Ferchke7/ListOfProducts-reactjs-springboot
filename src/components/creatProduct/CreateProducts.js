import { useState } from "react";
import axios from "axios";
import {Loader, TextInput, Input, FileInput, NumberInput, Button, Box} from "@mantine/core";
import { Icon3dCubeSphere, IconAt } from "@tabler/icons-react";
import '../style/Product-form.css'
function ProductForm({ authToken, authenticatedUserLogin }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState();




    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("file", image);
        console.log(image)
        console.log(authenticatedUserLogin)
        try {
            const response = await axios.post("/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    authenticatedUserLogin: authenticatedUserLogin,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading product:", error);
        } finally {

        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
        <Box maw={320} mx="auto" pos="relative">
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
            <Button type="submit" color="yellow">
                Submit a product
            </Button>
        </Box>
        </form>
    );
}

export default ProductForm;
