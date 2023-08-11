import { useEffect, useState } from 'react';
import {request, setAuthHeader} from "../axiosFile/axios_helper";

export default function ProductInfo({ productToShow }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Make the API call to fetch products and update the state accordingly
        request(
            "GET",
            "/products" + productToShow,
            {})
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    console.error('Error fetching products:', error);
                    // Handle the error state differently if needed
                }
            });
    }, [productToShow]); // Runs when productToShow changes

    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Backend response</h5>
                        <p className="card-text">Content:</p>
                        <ul>
                            {/* Check if data is not null before mapping */}
                            {data !== null &&
                                data.map((line, index) => (
                                    <li key={index}>{line}</li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
