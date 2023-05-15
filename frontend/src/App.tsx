import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import animations from "./css/animations.module.css";
import Student from "./components/Student";
import AdminPage from "./components/AdminDashboard";
import StudentPage from "./components/Student";
import SecretaryPage from "./components/Secretary";

function App() {
	return (
		<div className='App'>
			<StudentPage />
		</div>
	);
}

export default App;
