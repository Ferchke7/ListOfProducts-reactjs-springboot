import * as React from "react";
import {request, setAuthHeader} from "../axiosFile/axios_helper";


export default class AuthContent extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state with an empty array for data
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        request(
            "GET",
            "/messages",
            {}).then(
            (response) => {
                this.setState({ data: response.data });
            }).catch(
            (error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({ data: [error.response.code] }); // Wrap the error response code in an array
                }
            }
        );
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-4">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Backend response</h5>
                            <p className="card-text">Content:</p>
                            <ul>
                                {/* Check if data is not null before mapping */}
                                {this.state.data !== null && this.state.data.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}