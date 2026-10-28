import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import toast from 'react-hot-toast';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
           
            dispatch(setUser({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }));
            
            toast.success(`Xin chào ${user.displayName}!`);
            navigate("/admin");
        } catch (error) {
            toast.error("Đăng nhập thất bại: " + error.message);
        }
    };

    return (
        <div className="Profile" style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Đăng Nhập Quản Trị</h2>
            <p>Vui lòng đăng nhập bằng tài khoản Google để truy cập quyền Admin.</p>
            <Button variant="danger" onClick={handleGoogleLogin} style={{ marginTop: '20px' }}>
                Đăng nhập bằng Google
            </Button>
        </div>
    );
}