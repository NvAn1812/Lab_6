import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { Button } from 'react-bootstrap';
import "../SCSS/navbar.scss";

export default function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/home");
    };

    return (
        <div className="navbar">
            <nav className="nav-links">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/natural" className="nav-link">Natural</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                {user && <Link to="/admin" className="nav-link">Admin</Link>}
            </nav>

            <div className="user-info">
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={user.photoURL} alt="avatar" style={{ width: '30px', borderRadius: '50%' }} />
                        <span className="user-name">{user.name}</span>
                        <Button variant="outline-dark" size="sm" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Link to="/login">
                        <Button variant="primary" size="sm">Log in</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}