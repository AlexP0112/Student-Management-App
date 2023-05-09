import React from "react";
import NavbarLogo from "../img/rapid-univ-vertical.png";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";

type NavbarComp = {
	currentUser: string;
};

export default function NavbarComp(props: NavbarComp) {
	const { currentUser } = props;
	return (
		<Navbar bg='light' className='custom-class'>
			<Navbar.Brand href='./	'>
				<img
					src={NavbarLogo}
					width='250'
					className='d-inline-block justify-content-start '
					alt='Rapid Univ logo'
				/>
			</Navbar.Brand>
			{/* <Navbar.Collapse className='mb-4'> */}
			<NavbarCollapse className='w-100 d-flex flex-column gap-4 fs-4 mt-2 align-items-center justify-content-start'>
				<Nav.Item className=' w-100 active-menu p-3'>
					<RxDashboard className='me-2 '></RxDashboard>
					<Navbar.Text>Dashboard</Navbar.Text>
				</Nav.Item>

				<Nav.Item className='w-100 p-3'>
					<IoSettingsOutline className='me-2'></IoSettingsOutline>
					<Navbar.Text>Settings</Navbar.Text>
				</Nav.Item>
				{/* <Nav.Item>
					<Navbar.Text>Home page</Navbar.Text>
				</Nav.Item> */}
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
