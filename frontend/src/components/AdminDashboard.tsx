import * as React from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Ratio,
	Row,
} from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import NavbarComp from "./NavbarComp";

export default function AdminDashboard() {
	return (
		<Container fluid>
			<Row className='w-100'>
				<Col md={5} lg={3}>
					<NavbarComp currentUser='admin' />
				</Col>
				<Col
					md={7}
					lg={9}
					className='d-flex justify-content-center align-items-center flex-column'
				>
					<h1>
						Welcome! You are logged in as <span>Admin</span>.
					</h1>
					<h2>Please choose an option</h2>

					<Container className='mt-5 d-flex' style={{ width: "70%" }}>
						<Row>
							<Col>
								<Card
									className='justify-content-center bg-zoom-in'
									style={{
										aspectRatio: "1/1",
										minWidth: "fit-content",
										// minHeight: "fit-content",
									}}
								>
									<Card.Body className='d-flex flex-column justify-content-center align-items-center zoom-in'>
										<FaUserEdit
											style={{
												width: "100%",
												height: "10vh",
												maxHeight: "15%",
											}}
										></FaUserEdit>

										<Card.Title>Manage Students & Secretaries</Card.Title>
										<Card.Text>
											Create or delete accounts for the students or secretaries.
											Change users info
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card
									className='justify-content-center  bg-zoom-in'
									style={{
										aspectRatio: "1/1",
										minWidth: "fit-content",
									}}
								>
									<Card.Body className='d-flex flex-column justify-content-center align-items-center zoom-in'>
										<FaUserEdit
											style={{
												width: "100%",
												height: "10vh",
												maxHeight: "15%",
											}}
										></FaUserEdit>

										<Card.Title>Edit Faculties & Subjects</Card.Title>
										<Card.Text>
											Add or remove faculties and the corresponding subjects.
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
}
