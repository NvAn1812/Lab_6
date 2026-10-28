import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SCSS/orchid.scss"; 

export default function Orchids() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrchids = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL);
                const data = await response.json();
                setOrchids(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrchids();
    }, []);

    if (loading) return <h2>Loading Orchids...</h2>;

    return (
        <div className="list">
            <h2>Orchids Collection</h2>
            <div className="palette">
                {orchids.map((orchid) => (
                    <Link to={`/detail/${orchid.id}`} key={orchid.id} className="color">
                        <div className="orchid-card">
                            <img src={orchid.image} alt={orchid.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                            <h3>{orchid.name}</h3>
                            <span>${orchid.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}