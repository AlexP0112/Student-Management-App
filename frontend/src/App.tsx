import React, { ReactNode, useEffect } from "react";
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
import AdminStudents from "./components/AdminStudents";
import AdminStudentsPage from "./components/AdminStudents";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import SecretaryDashboard from "./components/SecretaryDashboard";
import Login from "./components/Login";
import { useUserContext } from "./contexts/UserContext";
import { UserType } from "./contexts/UserContext";
import Settings from "./components/Settings";
import NotFoundPage from "./components/NotFoundPage";
import AdminSecretariesPage from "./components/AdminSecretaries";
import AdminFacultiesPage from "./components/AdminFaculties";


function App() {

	const { user, setUser } = useUserContext();

	useEffect(() => {
		setUser({ username: "admin" });
	}, [])

	const navigate = useNavigate();

	// useEffect(() => {
	// 	const storageUser = localStorage.getItem("user");

	// 	if (user.username == undefined && storageUser) {
	// 		setUser(JSON.parse(storageUser));
	// 		console.log("S-a setat userul global si se va face un API request");
	// 	}

	// 	if (user.username != undefined) {
	// 		console.log("My user is: ");
	// 		console.log(user);
	// 		// Check if the token is still valid
	// 		fetch(`http://localhost:8000/api/user/${user.username}`, {
	// 			method: "GET",
	// 			headers: { Authorization: `Bearer ${user.token}` },
	// 		}).then((res) => {
	// 			if (res.status == 401) {
	// 				logout();
	// 			} else if (user.username != undefined) {
	// 				console.log("My user second requesst is: ");
	// 				console.log(user);
	// 			}
	// 		});
	// 	}
	// }, [user]);

	return (
		<Routes>
			<Route path='/' element={user === undefined ? (
				<HomePage />
			) : (
				(<DashboardRedirect />))

			}
			></Route>
			<Route path="/dashboard" element={user.username == "admin" ? <AdminDashboard /> : <SecretaryDashboard />} />

			<Route path="/dashboard/users/students" element={user.username == "admin" ? <AdminStudentsPage /> : <SecretaryDashboard />} />
			<Route path="/dashboard/users/secretaries" element={user.username == "admin" ? <AdminSecretariesPage /> : < NotFoundPage />} />
			<Route path="/dashboard/university/faculties" element={user.username == "admin" ? <AdminFacultiesPage /> : < NotFoundPage />} />


			<Route path='/login' element={<Login />} />
			<Route path='/settings' element={<Settings />} />
			<Route path="*" element={<NotFoundPage />} />

		</Routes>
		// <div className='App'>
		// 	<AdminStudentsPage />
		// </div>
	);
}

function DashboardRedirect() {
	const navigate = useNavigate();
	navigate('/dashboard');
	return <></>;
}


export default App;


