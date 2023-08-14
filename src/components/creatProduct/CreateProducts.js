import axios from "axios";
import {useState} from "react";


function ImageUploader() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const response = await axios.post('CLOUDINARY_UPLOAD_URL', formData);
        const imageUrl = response.data.secure_url;

        // Now you can send the imageUrl to your Spring Boot backend.
    };

    return (
        <div>
            <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
            <button onClick={handleImageUpload}>Upload Image</button>
        </div>
    );
}

export default ImageUploader;