import React from "react";
import NavbarLogo from "../img/rapid-univ-vertical.png";
import { Navbar, Container, Button, Nav, NavDropdown, } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { useUserContext } from "../contexts/UserContext";
import { Link, NavLink } from "react-router-dom";
import { MdPendingActions } from "react-icons/md"

type NavbarComp = {
	currentUser: string;
};

export default function NavbarComp(props: NavbarComp) {
	const { currentUser } = props;

	return (
		currentUser ?
			<Navbar bg='light' className='custom-class position-sticky '>
				<Navbar.Brand href='./	'>
					<img
						src={NavbarLogo}
						width='150'
						className='d-inline-block justify-content-start '
						alt='Rapid Univ logo'
					/>
				</Navbar.Brand>
				{/* <Navbar.Collapse className='mb-4'> */}
				<NavbarCollapse className='w-100 d-flex flex-column gap-4 fs-4 mt-2 align-items-center justify-content-start'>
					<NavLink to="/dashboard" className={({ isActive }) => { return (isActive ? "text-secondary active-menu" : "primary-color").concat(" w-100 text-center p-3") }}>
						{/* <Nav.Item className=' w-100 active-menu p-3'> */}
						<RxDashboard className='me-2 '></RxDashboard>

						<Navbar.Text>Dashboard</Navbar.Text>

						{/* </Nav.Item> */}
					</NavLink>

					{currentUser == "secretary" &&
						<NavLink to="/requests" className={({ isActive }) => { return (isActive ? "text-secondary active-menu" : "primary-color").concat(" w-100 text-center p-3") }}>
							<MdPendingActions className='me-2'></MdPendingActions>
							<Navbar.Text>Requests</Navbar.Text>
						</NavLink>}

					<NavLink to="/settings" className={({ isActive }) => { return (isActive ? "text-secondary active-menu" : "primary-color").concat(" w-100 text-center p-3") }}>
						<IoSettingsOutline className='me-2'></IoSettingsOutline>
						<Navbar.Text>Settings</Navbar.Text>
					</NavLink>


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
			</Navbar > : <></>
	);
}
