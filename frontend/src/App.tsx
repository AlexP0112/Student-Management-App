import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Student from "./components/Student";

function App() {
	return (
		<div className='App'>
			<AdminDashboard />
		</div>
	);
}

export default App;
