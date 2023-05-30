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
import { FaUserEdit, FaBook } from "react-icons/fa";
import NavbarComp from "./NavbarComp";
import UserPageWrapper from "./UserPageWrapper";
import { NavLink } from "react-router-dom";

const AdminDashboard = function () {
	return (
		<Row className='h-100 d-flex justify-content-start align-items-center'>
			<Col className='d-flex justify-content-center align-items-center flex-column'>
				<h1>
					Welcome! You are logged in as <span>Admin</span>.
				</h1>
				<h2>Please choose an option</h2>

				<Container className='mt-5 d-flex' style={{ width: "75%" }}>
					<Row>
						<Col>
							<NavLink to="/dashboard/users">
								<Card
									className='justify-content-center bg-zoom-in'
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

										<Card.Title>Manage Students & Secretaries </Card.Title>
										<Card.Text className="text-center p-2">
											Create or delete accounts for the students or secretaries.
											Change users info
										</Card.Text>
									</Card.Body>
								</Card>
							</NavLink>
						</Col>
						<Col>
							<NavLink to={"/dashboard/university/faculties"}>
								<Card
									className='justify-content-center bg-zoom-in'
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

										<Card.Title>Edit Faculties & Subjects</Card.Title>
										<Card.Text className="text-center p-2">
											Add or remove faculties and the corresponding subjects.
										</Card.Text>
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
