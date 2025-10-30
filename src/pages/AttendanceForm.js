import { useState } from "react";
import axios from 'axios';
import API_URL from '../config';

function AttendanceForm() {
    const [formData, setFormData] = useState({
        employeeName: "",
        employeeID: "",
        date: "",
        status: 'Present',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employeeName || !formData.employeeID || !formData.date) {
        alert('Please fill in all fields');
        return;
    }

    setLoading(true);

    try {
        console.log('Sending data to:', API_URL);
        console.log('Data:', formData);
        
        const response = await axios.post(API_URL, formData);
        console.log('Success response:', response.data);
        alert('✅ Attendance recorded successfully');
        
        setFormData({
            employeeName: "",
            employeeID: "",
            date: "",
            status: 'Present'
        });
    } catch (error) {
        console.error('Full error:', error);
        console.error('Error response:', error.response);
        alert('❌ Error: ' + (error.response?.data?.error || error.message || 'Failed to record attendance'));
    } finally {
        setLoading(false);
    }
};
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Good Day! Please Check In Below</h2>
            <input
                name="employeeName"
                value={formData.employeeName}
                placeholder="Employee Name"
                onChange={handleChange}
                required
                disabled={loading}
            />
            <input
                name="employeeID"
                value={formData.employeeID}
                placeholder="Employee ID"
                onChange={handleChange}
                required
                disabled={loading}
            />
            <input
                name="date"
                value={formData.date}
                type="date"
                onChange={handleChange}
                required
                disabled={loading}
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
            >
                <option value='Present'>Present</option>
                <option value='Absent'>Absent</option>
            </select>
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Attendance'}
            </button>
        </form>
    );
}

export default AttendanceForm;