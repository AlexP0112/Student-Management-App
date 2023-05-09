import React, { Component, ComponentElement, FunctionComponent } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import NavbarComp from "./NavbarComp";

type UserPageWrapperPropsType = {
	WrappedComponent: FunctionComponent;
};

const userPageWrapper = (props: UserPageWrapperPropsType) => {
	const { WrappedComponent } = props;
	return (
		<Container fluid>
			<Row className='w-100'>
				<Col md={5} lg={3} xl={2} className='ps-0'>
					<NavbarComp currentUser='admin' />
				</Col>

				<Col className='d-flex flex-column'>
					<Row>
						<Col>
							<Breadcrumb className='color-primary fw-bold fs-5'>
								<Breadcrumb.Item href='#'>
									<span style={{ color: "gray" }}>Dashboard </span>
								</Breadcrumb.Item>
								<Breadcrumb.Item active>
									<span className='color-primary'>Edit</span>
								</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
					</Row>

					<WrappedComponent></WrappedComponent>
				</Col>
			</Row>
		</Container>
	);
};

export default userPageWrapper;
