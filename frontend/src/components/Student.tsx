import React from "react";
import NavbarComp from "./NavbarComp";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import userPageWrapper from "./UserPageWrapper";

function Student() {
	const user = "dummy";

	return (
		<Row className='h-100 d-flex justify-content-start align-items-start'>
			<Col className='d-flex justify-content-center align-items-center flex-column'>
				<Container fluid>
					<Card className='text-start'>
						<Card.Body>
							<Card.Title>Welcome back, {user}</Card.Title>
							<Card.Text>
								Want to be up-to-date to your academic situation?
							</Card.Text>
							<Button variant='primary'>Check your grades</Button>
						</Card.Body>
					</Card>
				</Container>
				<h1>Welcome, {user}</h1>
			</Col>
		</Row>
	);
}

const StudentPage = () => userPageWrapper({ WrappedComponent: Student });

export default StudentPage;
