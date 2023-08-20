import {useState} from "react";
import axios from "axios";



function ProductForm({ authToken, authenticatedUserLogin }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('file', image);

        try {
            const response = await axios.post('/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                },
                params: {
                    authenticatedUserLogin: authenticatedUserLogin,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="customFile">Default file input example</label>
                    <input type="file" class="form-control" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
