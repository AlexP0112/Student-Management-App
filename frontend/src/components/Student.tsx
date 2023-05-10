import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import StudentImg from "../img/student.jpg";
import CounterImg from "../img/counter.svg";
import {
	Button,
	Card,
	Col,
	Container,
	Row,
	Toast,
	ToastContainer,
	Image,
} from "react-bootstrap";
import userPageWrapper from "./UserPageWrapper";
import GradesGraph from "../img/grades-graph.svg";
import { useCountdown } from "../hooks/useCountdown";

function Student() {
	const user = {
		username: "podaruandrei",
		name: "Podaru Andrei",
		group: "333CA",
		faculty: "Facultatea de Automatica si Calculatoare",
	};

	const [days, hours, minutes, seconds] = useCountdown();

	return (
		<Row className='h-100 d-flex justify-content-start align-items-start'>
			<Col className='d-flex justify-content- align-items-center flex-column'>
				<Container fluid className='ms-0'>
					<Row
						className='d-flex align-items-center'
						style={{ width: "fit-content" }}
					>
						<Col>
							<Card className='text-start rounded shadow-lg'>
								<Card.Body className='d-flex align-items-center'>
									<Col>
										<Card.Title>
											{" "}
											<h1>Welcome back, {user.username}!</h1>
										</Card.Title>
										<Card.Text>
											Want to be up-to-date to your academic situation?
										</Card.Text>
										<Button variant='primary'>Check your grades</Button>{" "}
									</Col>
									<Col lg={true} className='text-center'>
										<img src={GradesGraph} width={100} />
									</Col>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card className='text-start rounded shadow-lg'>
								<Card.Body
									className='d-flex align-items-center w-100'
									style={{ width: "min-content" }}
								>
									<Col className='flex-1'>
										<Card.Title>
											{" "}
											<h4>Time before semester ending</h4>
										</Card.Title>
										<Container>
											<Row className='gap-2'>
												<Col className='b-2-red'>
													<Row className='fs-2 fw-bold '>{days}</Row>
													<Row>days</Row>
												</Col>

												<Col>
													<Row className='fs-2 fw-bold'>{hours}</Row>
													<Row>hours</Row>
												</Col>
												<Col>
													<Row className='fs-2 fw-bold'>{minutes}</Row>
													<Row>minutes</Row>
												</Col>
												<Col>
													<Row className='fs-2 fw-bold'>{seconds}</Row>
													<Row>seconds</Row>
												</Col>
											</Row>
										</Container>
									</Col>
									<Col lg={true} className='text-center'>
										<img src={CounterImg} width={100} />
									</Col>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row className='mt-5'>
						<Col className='text-start d-flex justify-content-center flex-column align-items-center'>
							<Card className='text-start rounded shadow-lg position-relative'>
								<Card.Body className='position-relative text-center d-flex justify-content-start flex-column align-items-center'>
									<Row className='align-self-start'>
										<Col>
											<h2>Profile</h2>
										</Col>
										<Col className=''>
											<Button
												variant='primary'
												className='position-absolute end-0 me-2'
											>
												Edit info
											</Button>
										</Col>
									</Row>

									<Image
										className='w-25 d-inline shadow-lg'
										src={StudentImg}
										roundedCircle
										style={{
											aspectRatio: "1/1",
											objectFit: "cover",
										}}
									/>

									<Card.Title>
										<h3>{user.name}</h3>
										<p style={{ color: "gray" }}>@{user.username}</p>
									</Card.Title>

									<Card.Text>
										<Row className='bg-light fw-bold'>
											<Col className='border border-start-2'>
												<Row>
													<p>Group</p>
												</Row>

												<Row>
													<p>{user.group}</p>
												</Row>
											</Col>

											<Col className='border border-start-2'>
												<Row>
													<p>Faculty</p>
												</Row>

												<Row>
													<p>{user.faculty}</p>
												</Row>
											</Col>

											<Col className='border border-start-2'>
												<Row>
													<p>Year</p>
												</Row>

												<Row>
													<p>2020</p>
												</Row>
											</Col>
										</Row>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>

						<Col lg={true} className='text-center'>
							<ToastContainer
								position='bottom-end'
								className='p-3'
								style={{ zIndex: 1 }}
							>
								<Toast>
									<Toast.Header>
										<img
											src='holder.js/20x20?text=%20'
											className='rounded me-2'
											alt=''
										/>
										<strong className='me-auto'>Secretariat</strong>
										<small className='text-muted'>just now</small>
									</Toast.Header>
									<Toast.Body>Your request has been fulfilled</Toast.Body>
								</Toast>
							</ToastContainer>
						</Col>
					</Row>
				</Container>
			</Col>
		</Row>
	);
}

const StudentPage = () => userPageWrapper({ WrappedComponent: Student });

export default StudentPage;
