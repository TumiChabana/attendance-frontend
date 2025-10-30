import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

function AttendanceDashboard() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(API_URL);
            setRecords(response.data);
        } catch (error) {
            setError('Failed to load records. Make sure backend is running!');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert('Record deleted successfully');
                fetchData();
            } catch (error) {
                alert('Failed to delete record');
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return <h2 style={{ textAlign: 'center', color: '#fff' }}>Loading...</h2>;
    if (error) return <h2 style={{ textAlign: 'center', color: '#fff' }}>{error}</h2>;

    return (
        <div>
            <h2>Attendance History</h2>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ color: '#fff' }}>Total Records: {records.length}</p>
            </div>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Employee Name</th>
                        <th>Employee ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                No records yet. Add some attendance records!
                            </td>
                        </tr>
                    ) : (
                        records.map((r) => (
                            <tr key={r.id}>
                                <td>{formatDate(r.date)}</td>
                                <td>{r.employeeName}</td>
                                <td>{r.employeeID}</td>
                                <td>
                                    <span className={`status-badge ${r.status.toLowerCase()}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(r.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceDashboard;