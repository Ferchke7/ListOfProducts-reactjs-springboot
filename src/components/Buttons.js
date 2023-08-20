import * as React from "react";
export default function Buttons(props) {
    return (
        <div className="row">
            <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
                {!props.isAuthenticated && (
                    <button className="btn btn-primary" style={{ margin: '10px' }} onClick={props.login}>
                        Login or Register
                    </button>
                )}
                {props.isAuthenticated && (
                    <>
                        <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.logout}>
                            Logout
                        </button>
                        <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.create}>
                            Create Product
                        </button>
                        <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.myProducts}>
                            My products
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};