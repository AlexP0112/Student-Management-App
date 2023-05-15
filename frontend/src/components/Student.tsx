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
	const averageGrade = 9.54;
	const [start, setStart] = useState(0);

	useEffect(() => {
		const speed = (averageGrade - start) / 20;
		const interval = setInterval(() => {
			if (averageGrade - start > 0.001) {
				setStart((start) => start + speed);
			}
		}, 10);

		return () => clearInterval(interval);
	}, [start]);

	return (
		<Row className='h-100 d-flex justify-content-start align-items-start'>
			<Col className='d-flex justify-content- align-items-center flex-column'>
				<Container fluid className='ms-0'>
					<Row
						className='d-flex align-items-center'
						style={{ width: "fit-content" }}
					>
						<Col>
							{/* Profile Card */}
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
										<span style={{ color: "gray" }}>@{user.username}</span>
									</Card.Title>

									<Row className='bg-light fw-bold'>
										<Col className='border border-start-2'>
											<Row>
												<span>Group</span>
											</Row>

											<Row>
												<span>{user.group}</span>
											</Row>
										</Col>

										<Col className='border border-start-2'>
											<Row>
												<span>Faculty</span>
											</Row>

											<Row>
												<span>{user.faculty}</span>
											</Row>
										</Col>

										<Col className='border border-start-2'>
											<Row>
												<span>Year</span>
											</Row>

											<Row>
												<span>2020</span>
											</Row>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							{/* Time before semester ending counter */}
							<Card className='text-start rounded shadow-lg'>
								<Card.Body
									className='d-flex align-items-center w-100'
									style={{ width: "min-content" }}
								>
									{/* Time col */}
									<Col className='flex-1'>
										<Card.Title>
											<h4>Time before semester ending</h4>
										</Card.Title>
										{/* Time display grid */}
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
									{/* Time image col */}
									<Col lg={true} className='text-center'>
										<img src={CounterImg} className='w-75' />
									</Col>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row className='mt-5'>
						<Col className='text-start flex-col-center'>
							{/* Welcome back Card */}
							<Card className='text-start rounded shadow-lg'>
								<Card.Body className='d-flex align-items-center'>
									<Col>
										<Row>
											<Card.Title>
												{" "}
												<h1>Welcome back, {user.username}!</h1>
											</Card.Title>
											<Card.Text className='mb-3'>
												Want to be up-to-date to your academic situation?
											</Card.Text>
										</Row>
										<Row>
											<Row>
												<div className='w-50 fw-bold color-primary fs-5 flex-col-center justify-content-between border border-start-2 rounded aspect-ratio-100'>
													<div className='align-self-start'>
														<Card.Text>AVERAGE</Card.Text>
													</div>
													<div className='w-50 bg-primary-clr text-white flex-row-center border border-start-2 rounded-circle aspect-ratio-100'>
														<div className='flex-row-center fs-3 minw-fit-content aspect-ratio-100'>
															{Math.round(start * 100) / 100}
														</div>
													</div>
													<div className='fw-normal fs-6 align-self-start'>
														TOTAL:10.0
													</div>
												</div>
											</Row>
											<Row>
												<Button variant='primary' className='w-50 mt-2'>
													Check your grades
												</Button>
											</Row>
										</Row>
									</Col>
									<Col lg={true} className='text-center'>
										<img src={GradesGraph} className='w-50' />
									</Col>
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
