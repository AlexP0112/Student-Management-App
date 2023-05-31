import React, { Component, ComponentElement, FunctionComponent } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import NavbarComp from "./NavbarComp";
import CustomBreadcrumb from "./CustomBreadcrumb";
import { useUserContext } from "../contexts/UserContext";

type UserPageWrapperPropsType = {
	WrappedComponent: FunctionComponent;
};

const UserPageWrapper = (props: UserPageWrapperPropsType) => {

	const { WrappedComponent } = props;
	const { user } = useUserContext();
	return (
		user.username ?
			<Container fluid>
				<Row className='w-100'>
					<Col md={5} lg={3} xl={2} className='ps-0'>
						<NavbarComp currentUser={user.username} />
					</Col>

					<Col className='d-flex flex-column'>
						<Row>
							<Col className="ps-0">
								<Breadcrumb className='text-secondary fw-bold fs-5'>
									<CustomBreadcrumb />

								</Breadcrumb>
							</Col>
						</Row>

						<WrappedComponent></WrappedComponent>
					</Col>
				</Row>
			</Container>
			:

			<WrappedComponent />

	);
};

export default UserPageWrapper;
