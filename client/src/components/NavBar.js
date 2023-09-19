import { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem("token");
        navigate(SHOP_ROUTE);
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
                        Shop
                    </NavLink>
                    {user.isAuth ? (
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>
                                Admin panel
                            </Button>
                            <Button variant="outline-light" className="ms-2" onClick={logout}>
                                Logout
                            </Button>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                                Authorization
                            </Button>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;
