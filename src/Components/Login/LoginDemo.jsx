import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginDemo() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = userData;

        if (!email || !password) {
            alert("Please fill the form completely");
            return;
        }

        try {
            const response = await axios.post(
                'https://zerobook.milestone-hosting.cloud/login',
                userData
            );

            if (response.status === 200) {
                const { existingUser, token } = response.data;

                sessionStorage.setItem("existingUser", JSON.stringify(existingUser));
                sessionStorage.setItem("token", token);


                if (existingUser) {
                    sessionStorage.setItem(
                        "userData",
                        JSON.stringify(existingUser)
                    );
                }

                setUserData({
                    email: "",
                    password: "",
                });

                navigate(existingUser ? "/adminDashboardNew" : "/addnewslist");
            } else {
                console.error(response.data);
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("An error occurred during login", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="row w-100 d-flex justify-content-center align-items-center vh-100">
            <div className="w-75 shadow-lg" style={{ backgroundColor: "#F0F8FF" }}>
                <div className="row w-100 p-5 d-flex justify-content-center align-items-center">
                    <Col lg={6} sm={12}>
                        {/* Your image code here */}
                    </Col>
                    <Col lg={6} sm={12}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    controlId="ForBasicEmail"
                                    placeholder="name@example.com"
                                    value={userData.email}
                                    onChange={(e) =>
                                        setUserData({ ...userData, email: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <Form.Label>Password</Form.Label>
                                    <span>
                                        <button
                                            className="icon-link"
                                            style={{ border: "none", backgroundColor: "white" }}
                                        >
                                            <VisibilityIcon style={{ color: "#6CB4EE" }} />
                                        </button>
                                    </span>
                                </div>
                                <Form.Control
                                    type="password"
                                    placeholder="password"
                                    controlId="ForBasicPassword"
                                    value={userData.password}
                                    onChange={(e) =>
                                        setUserData({ ...userData, password: e.target.value })
                                    }
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center mt-5">
                                <div>
                                    <div>
                                        <button
                                            onClick={(e) => handleLogin(e)}
                                            className="btn btn-primary m-3"
                                        >
                                            Login
                                        </button>
                                        <p>
                                            New User? Click here to{" "}
                                            <Link to={"/register"}>Register</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </div>
            </div>
        </div >
    );
}

export default LoginDemo;

