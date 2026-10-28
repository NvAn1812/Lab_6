import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import "../SCSS/orchid.scss";

export default function Contact() {
    const formik = useFormik({
        initialValues: { name: '', email: '', phone: '', message: '' },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Quá ngắn').required('Bắt buộc nhập'),
            email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập'),
            phone: Yup.string().matches(/^[0-9]+$/, 'Chỉ bao gồm số').min(10, 'Tối thiểu 10 số').required('Bắt buộc nhập'),
            message: Yup.string().required('Bắt buộc nhập')
        }),
        onSubmit: (values, { resetForm }) => {
            toast.success(`Cảm ơn ${values.name} đã liên hệ!`);
            resetForm(); 
        }
    });

    return (
        <div className="Profile">
            <h1>Contact Us</h1>
            <form onSubmit={formik.handleSubmit}>
                {['name', 'email', 'phone', 'message'].map((field) => (
                    <div className="input-field" key={field}>
                        <input
                            id={field}
                            name={field}
                            type={field === 'email' ? 'email' : 'text'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[field]}
                        />
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        {formik.touched[field] && formik.errors[field] && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors[field]}</div>
                        )}
                    </div>
                ))}
                <button type="submit" className="button">Send Message</button>
            </form>
        </div>
    );
}