import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);

    const navigate = useNavigate();
    const location = useLocation();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "" });

    const singIn = async () => {
        try {
            let userData = isLogin ? await login(email, password) : await registration(email, password);
            user.setIsAuth(true);
            user.setUser(userData);
            navigate(SHOP_ROUTE);
        } catch (error) {
            setAlert({ show: true, message: error.response.data.message });
        }
    };

    return (
        <div>
            {alert.show && (
                <Alert variant="danger" onClose={() => setAlert({ show: false, message: "" })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 120 }}>
                <Card style={{ width: 600 }} className="p-3">
                    <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
                    <Form className="d-flex flex-column ">
                        <Form.Control placeholder="Enter email" className="mt-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="d-flex flex-row">
                            <Form.Control
                                isValid={password === repeatPassword && password}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordVisible ? "text" : "password"}
                                className="mt-3 me-2"
                            />
                            <Button
                                className="mt-3 align-self-end"
                                variant={passwordVisible ? "danger" : "outline-dark"}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setPasswordVisible(!passwordVisible);
                                }}
                            >
                                {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                            </Button>
                        </div>
                        {!isLogin && (
                            <div className="d-flex flex-row">
                                <Form.Control
                                    isValid={password === repeatPassword && password}
                                    placeholder="Repeat password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    type={repeatPasswordVisible ? "text" : "password"}
                                    className="mt-3 me-2"
                                />
                                <Button
                                    className="mt-3 align-self-end"
                                    variant={repeatPasswordVisible ? "danger" : "outline-dark"}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setRepeatPasswordVisible(!repeatPasswordVisible);
                                    }}
                                >
                                    {repeatPasswordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                </Button>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                {isLogin ? "Don't have account?" : "Has account?"} <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? "Registration!" : "Login"}</NavLink>
                            </div>
                            <Button variant="outline-primary" className="align-self-end" onClick={singIn}>
                                {isLogin ? "Login" : "Register"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
});

export default Auth;
