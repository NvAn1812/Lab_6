import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SCSS/orchid.scss";

export default function Natural() {
    const [naturalOrchids, setNaturalOrchids] = useState([]);

    useEffect(() => {
        const fetchNaturals = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL);
                const data = await response.json();
                const filtered = data.filter(item => item.isNatural === true || String(item.isNatural) === "true");
                setNaturalOrchids(filtered);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNaturals();
    }, []);

    return (
        <div className="list">
            <h2>Natural Orchids</h2>
            <div className="palette">
                {naturalOrchids.map((orchid) => (
                    <Link to={`/detail/${orchid.id}`} key={orchid.id} className="color">
                        <div className="orchid-card">
                            <img src={orchid.image} alt={orchid.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                            <h3>{orchid.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}