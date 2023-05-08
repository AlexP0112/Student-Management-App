import React from "react";
import NavbarComp from "./NavbarComp";
import { Col, Container, Row } from "react-bootstrap";

export default function Student() {
	const user = "dummy";

	return (
		<>
			<NavbarComp currentUser={user} />
			<Container className='align-items-start text-start ms-0'>
				<Col>
					<Row>
						<p>dsdssds</p>
					</Row>
					<Row>
						<p>sdsds</p>
					</Row>
				</Col>
			</Container>
		</>
	);
}
