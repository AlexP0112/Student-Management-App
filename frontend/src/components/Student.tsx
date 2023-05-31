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
import UserPageWrapper from "./UserPageWrapper";
import GradesGraph from "../img/grades-graph.svg";
import { useCountdown } from "../hooks/useCountdown";
import animations from "../css/animations.module.css";

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
			<Col className='d-flex  align-items-center flex-column'>
				<Container fluid className='ms-0'>
					<Row
						className='d-flex align-items-start'
						style={{ width: "fit-content" }}
					>
						<Col>
							{/* Profile Card */}
							<Card
								className={`text-start rounded shadow-lg position-relative ${animations["scale-up-center"]}`}
							>
								<Card.Body className='position-relative text-center d-flex justify-content-start flex-column align-items-center'>
									<Row className='w-100 flex-row-center justify-content-between mb-3'>
										<Col className='text-start'>
											<h2>Profile</h2>
										</Col>
										<Col className='text-end'>
											<Button variant='primary'>Edit info</Button>
										</Col>
									</Row>

									<Card.Title className='align-self-start'>
										{" "}
										<h1>Welcome back, {user.name}!</h1>
									</Card.Title>
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
										<h3>@{user.username}</h3>
									</Card.Title>

									<Row className='bg-light fw-bold'>
										<Col className='border border-start-2'>
											<Row>
												<span className='color-primary'>Group</span>
											</Row>

											<Row>
												<span>{user.group}</span>
											</Row>
										</Col>

										<Col className='border border-start-2'>
											<Row>
												<span className='color-primary'>Faculty</span>
											</Row>

											<Row>
												<span>{user.faculty}</span>
											</Row>
										</Col>

										<Col className='border border-start-2'>
											<Row>
												<span className='color-primary'>Year</span>
											</Row>

											<Row>
												<span>2020</span>
											</Row>
										</Col>
									</Row>

									<Row className='mt-4 '>
										{/* Welcome back Card */}
										<Col className='text-start flex-col-center '>
											<Row className=''>
												<Card.Text className='mb-3 fs-5 align-self'>
													Did you check your latest grades and how your semester
													is going?
												</Card.Text>
											</Row>
											<Row className='flex-row-center'>
												<Row>
													<div className='w-100 fw-bold color-primary fs-5 flex-col-center justify-content-between border border-start-2 rounded aspect-ratio-100'>
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

												<Button variant='primary' className='w-100 mt-2'>
													Check your grades
												</Button>
											</Row>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Row>
								{/* Time before semester ending counter */}
								<Card
									className={`text-start rounded shadow-lg ${animations["scale-up-center"]}`}
								>
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
													<Col className='flex-col-center'>
														<Row className='fs-2 fw-bold'>{days}</Row>
														<Row>days</Row>
													</Col>

													<Col className='flex-col-center'>
														<Row className='fs-2 fw-bold'>{hours}</Row>
														<Row>hours</Row>
													</Col>
													<Col className='flex-col-center'>
														<Row className='fs-2 fw-bold'>{minutes}</Row>
														<Row>minutes</Row>
													</Col>
													<Col className='flex-col-center'>
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
							</Row>
							<Row>
								<Card></Card>
							</Row>
						</Col>
					</Row>
					<Row className='mt-5'>
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

const StudentPage = () => UserPageWrapper({ WrappedComponent: Student });

export default StudentPage;
