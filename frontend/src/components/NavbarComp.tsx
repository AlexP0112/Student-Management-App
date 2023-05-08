import React from "react";
import NavbarLogo from "../img/rapid-univ-cover.png";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";

type NavbarComp = {
	currentUser: string;
};

export default function NavbarComp(props: NavbarComp) {
	const { currentUser } = props;
	return (
		<Navbar bg='light'>
			<Container className='d-flex align-items-center'>
				<Navbar.Brand href='#home'>
					<img
						src={NavbarLogo}
						width='250'
						className='d-inline-block justify-content-start'
						alt='Rapid Univ logo'
					/>
				</Navbar.Brand>
				<Navbar.Collapse className='justify-content-end '>
					<Nav.Item>
						<Button variant='danger'>
							<Navbar.Text>
								<Nav.Link
									title='Item'
									className='fw-bold'
									style={{ color: "white" }}
								>
									Logout
								</Nav.Link>
							</Navbar.Text>
						</Button>
					</Nav.Item>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
