import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import "../SCSS/orchid.scss";

export default function Admin() {
    const [orchids, setOrchids] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newOrchid, setNewOrchid] = useState({ name: "", image: "", price: "", isNatural: false });

    // API URL Base
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setOrchids(data))
            .catch(err => toast.error("Lỗi tải dữ liệu!"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!newOrchid.name || !newOrchid.image || !newOrchid.price) {
            return toast.error("Vui lòng điền đủ Tên, Hình ảnh và Giá!");
        }

        const url = editingId ? `${API_URL}/${editingId}` : API_URL;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method, 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrchid) 
            });
            const data = await response.json();

            if (editingId) {
                setOrchids(orchids.map(o => o.id === editingId ? data : o));
                toast.success("Cập nhật thành công!");
                setEditingId(null);
            } else {
                setOrchids([...orchids, data]);
                toast.success("Thêm mới thành công!");
            }
            setNewOrchid({ name: "", image: "", price: "", isNatural: false });
        } catch (err) {
            toast.error("Thao tác thất bại!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                setOrchids(orchids.filter((o) => o.id !== id));
                toast.success("Xóa thành công!");
            } catch (err) {
                toast.error("Xóa thất bại!");
            }
        }
    };

    return (
        <div className="Profile" style={{ maxWidth: '900px', margin: 'auto' }}>
            <h1>Quản Trị Hoa Lan</h1>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <div className="input-field">
                    <input type="text" value={newOrchid.name} onChange={e => setNewOrchid({...newOrchid, name: e.target.value})} required />
                    <label>Tên Hoa Lan</label>
                </div>
                <div className="input-field">
                    <input type="text" value={newOrchid.image} onChange={e => setNewOrchid({...newOrchid, image: e.target.value})} required />
                    <label>Link Hình Ảnh</label>
                </div>
                <div className="input-field">
                    <input type="number" value={newOrchid.price} onChange={e => setNewOrchid({...newOrchid, price: e.target.value})} required />
                    <label>Giá ($)</label>
                </div>
                <label>
                    <input type="checkbox" checked={newOrchid.isNatural} onChange={e => setNewOrchid({...newOrchid, isNatural: e.target.checked})} />
                    {' '}Là giống hoa tự nhiên
                </label>
                <br /><br />
                <button type="submit" className="button">{editingId ? 'Cập Nhật' : 'Lưu Mới'}</button>
            </form>

            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #ccc' }}>
                        <th>Hình ảnh</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orchids.map((orchid) => (
                        <tr key={orchid.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td><img src={orchid.image} alt={orchid.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                            <td>{orchid.name}</td>
                            <td>${Number(orchid.price).toFixed(2)}</td>
                            <td>
                                <button className="button" style={{ padding: '5px 10px', fontSize: '12px', marginRight: '5px' }} onClick={() => { setEditingId(orchid.id); setNewOrchid(orchid); }}>Sửa</button>
                                <button className="button" style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => handleDelete(orchid.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}