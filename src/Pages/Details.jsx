import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import "../SCSS/orchid.scss";

export default function Details() {
    const { id } = useParams();
    const [orchid, setOrchid] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrchid = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
                const data = await response.json();
                setOrchid(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrchid();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!orchid) return <h2>Orchid not found!</h2>;

    return (
        <div className="Profile">
            <h1>{orchid.name}</h1>
            <div className="img-profile">
                <img src={orchid.image} alt={orchid.name} className="image" />
            </div>
            <div>
                <p><strong>Price:</strong> ${Number(orchid.price).toFixed(2)}</p>
                <p><strong>Color:</strong> {orchid.color || 'N/A'}</p>
                <p><strong>Origin:</strong> {orchid.origin || 'N/A'}</p>
                <p><strong>Category:</strong> {orchid.category || 'N/A'}</p>
                <p><strong>Special:</strong> {orchid.isSpecial ? "Yes" : "No"}</p>
                <p><strong>Natural:</strong> {orchid.isNatural ? "Yes" : "No"}</p>
            </div>
            <Link to="/home">
                <button className="button">Back to Home</button>
            </Link>
        </div>
    );
}