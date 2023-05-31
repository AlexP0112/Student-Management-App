import * as React from "react";
import {
	Breadcrumb,
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Ratio,
	Row,
} from "react-bootstrap";
import { FaUserEdit, FaBook, FaSchool, FaUserGraduate } from "react-icons/fa";
import LuSchool from "react-icons/"
import NavbarComp from "./NavbarComp";
import UserPageWrapper from "./UserPageWrapper";
import { NavLink } from "react-router-dom";

const AdminDashboard = function () {
	return (
		<Row className='h-100 d-flex justify-content-start align-items-center '>
			<Col className='d-flex justify-content-center align-items-center flex-column'>
				<h1>
					Welcome! You are logged in as <span>Admin</span>.
				</h1>
				<h2>Please choose an option</h2>

				<Container className='mt-5' style={{ width: "50%" }}>
					<Row>
						<Col>
							<NavLink to="/dashboard/users/students">
								<Card
									className='justify-content-center bg-zoom-in shadow-lg'
									style={{
										aspectRatio: "1/1",
										// border: "1px solid red",
										minWidth: "fit-content",
									}}
								>

									<Card.Body
										className='d-flex flex-column justify-content-center align-items-center zoom-in'
									// style={{ border: "1px solid green" }}
									>
										<FaUserGraduate
											style={{
												width: "100%",
												height: "8vh",
												maxHeight: "15%",
											}}
										></FaUserGraduate>

										<Card.Title className="text-center">Manage Students</Card.Title>
									</Card.Body>
								</Card>
							</NavLink>
						</Col>
						<Col>
							<NavLink to={"/dashboard/university/faculties"}>
								<Card
									className='justify-content-center bg-zoom-in shadow-sm'
									style={{
										aspectRatio: "1/1",
										minWidth: "fit-content",
									}}
								>
									<Card.Body className='d-flex flex-column justify-content-center align-items-center zoom-in'>


										<FaSchool
											style={{
												width: "100%",
												height: "10vh",
												maxHeight: "15%",
											}}
										></FaSchool>

										<Card.Title>Edit Faculties</Card.Title>
									</Card.Body>
								</Card>
							</NavLink>
						</Col>
					</Row>
					<Row>
						<Col>
							<NavLink to="/dashboard/users/secretaries">
								<Card
									className='justify-content-center bg-zoom-in shadow-lg'
									style={{
										aspectRatio: "1/1",
										// border: "1px solid red",
										minWidth: "fit-content",
									}}
								>

									<Card.Body
										className='d-flex flex-column justify-content-center align-items-center zoom-in'
									// style={{ border: "1px solid green" }}
									>
										<FaUserEdit
											style={{
												width: "100%",
												height: "8vh",
												maxHeight: "15%",
											}}
										></FaUserEdit>

										<Card.Title className="text-center"> Manage Secretaries </Card.Title>
									</Card.Body>
								</Card>
							</NavLink>
						</Col>
						<Col>
							<NavLink to={"/dashboard/university/subjects"}>
								<Card
									className='justify-content-center bg-zoom-in shadow-lg'
									style={{
										aspectRatio: "1/1",
										minWidth: "fit-content",
									}}
								>
									<Card.Body className='d-flex flex-column justify-content-center align-items-center zoom-in'>


										<FaBook
											style={{
												width: "100%",
												height: "10vh",
												maxHeight: "15%",
											}}
										></FaBook>

										<Card.Title>Edit Subjects</Card.Title>
									</Card.Body>
								</Card>
							</NavLink>
						</Col>
					</Row>
				</Container>
			</Col>
		</Row >
	);
};

const AdminPage = () =>
	UserPageWrapper({
		WrappedComponent: AdminDashboard,
	});

export default AdminPage;
