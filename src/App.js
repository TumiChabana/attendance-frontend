import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AttendanceDashboard from "./pages/AttendanceDashboard";
import AttendanceForm from "./pages/AttendanceForm";
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <div className="content-wrap">
                    <nav>
                        <Link to="/">Attendance Form</Link>
                        <Link to="/dashboard">View Dashboard</Link>
                    </nav>
                    <div className="welcome-message">
                        <h1>Welcome to Employee Attendance Tracker</h1>
                        <p>Track and manage employee attendance efficiently</p>
                    </div>
                    <Routes>
                        <Route path="/" element={<AttendanceForm />} />
                        <Route path="/dashboard" element={<AttendanceDashboard />} />
                    </Routes>
                </div>
                <footer className="footer">
                    <p>Created by ~ Itumeleng Priscilla Chabana</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;