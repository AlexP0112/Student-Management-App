import React from "react";
import NavbarLogo from "../img/rapid-univ-cover.png";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

type NavbarComp = {
	currentUser: string;
};

export default function NavbarComp(props: NavbarComp) {
	const { currentUser } = props;
	return (
		<Navbar bg='light' className='custom-class'>
			<Navbar.Brand href='#home'>
				<img
					src={NavbarLogo}
					width='250'
					className='d-inline-block justify-content-start '
					alt='Rapid Univ logo'
				/>
			</Navbar.Brand>
			{/* <Navbar.Collapse className='mb-4'> */}
			<NavbarCollapse className='d-flex flex-column gap-4 fs-4 mt-2 align-items-center justify-content-center'>
				<Nav.Item>
					<Navbar.Text>Home page</Navbar.Text>
				</Nav.Item>

				<Nav.Item>
					<Navbar.Text>Home page</Navbar.Text>
				</Nav.Item>
				<Nav.Item>
					<Navbar.Text>Home page</Navbar.Text>
				</Nav.Item>
			</NavbarCollapse>

			<Navbar.Text>
				Signed in as: <a href='#login'>{currentUser}</a>
			</Navbar.Text>

			<Nav.Item className='mb-2'>
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
			{/* </Navbar.Collapse> */}
		</Navbar>
	);
}
