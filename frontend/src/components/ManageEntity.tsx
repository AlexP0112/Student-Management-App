import React, { useRef } from "react";
import {
	Modal,
	Form,
	Row,
	Col,
	Button,
	CloseButton,
	Table,
	Card,
	Container,
	ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import userDefaultPicture from "../img/user-default-picture.svg";
import ModalComponent from "./ModalComponent";
import { StudentType, SecretaryType, FormValuesType, StudentFromValuesType, SecretaryFormValuesType, FacultyFormValuesType, SubjectFormValuesType, FacultyType, SubjectType, FormGroupType } from "../interfaces/DatabaseTypes";
import CardHeader from "react-bootstrap/esm/CardHeader";
import facultyPicture from '../img/upb.jpg';

type DataType = StudentType | SecretaryType | FacultyType;

type ManageEntityPropsType = {
	data: DataType[];
	entity: "student" | "secretary" | "faculty";
	years?: string[];
	faculties?: string[];
	formGroups: FormGroupType[];
};


export default function ManageEntity(props: ManageEntityPropsType) {
	const { entity, years, faculties, formGroups } = props;

	const [data, setData] = useState<DataType[]>(props.data);

	console.log(data);

	const [filteredData, setFilteredData] = useState(data);
	const [searchValue, setSearchValue] = useState("");
	const [newData, setNewData] = useState<DataType>({} as DataType);
	const [formValues, setFormValues] = useState<FormValuesType>({} as FormValuesType);

	const [studentFormValues, setStudentFormValues] = useState({
		year: years ? years[0] : "",
		faculty: faculties ? faculties[0] : ""
	})

	const [newSubjects, setNewSubjects] = useState<SubjectType[]>([]);

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	const deleteStudent = (removableDataEntityID: number) => {
		setData(
			data.filter(
				(dataEntity: DataType) => dataEntity.id != removableDataEntityID
			)
		);
	};

	const handleShow = () => setShowModal(true);
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);

	useEffect(() => {
		if (searchValue == "") {
			setFilteredData(data);
		}

		let filtered;
		switch (entity) {
			case "student":
				filtered = data.filter((dataEntity: DataType) =>
				((dataEntity as StudentType | SecretaryType).lastName.toLowerCase().includes(searchValue.toLowerCase())
				));
				break;
			case "secretary":
				filtered = data.filter((dataEntity: DataType) =>
				((dataEntity as StudentType | SecretaryType).lastName.toLowerCase().includes(searchValue.toLowerCase())
				));
				break;
			default:
			case "faculty":
				filtered = data.filter((dataEntity: DataType) =>
					(dataEntity as FacultyType).name.toLowerCase().includes(searchValue.toLowerCase())
				);
				break;
		}

		setFilteredData(filtered);
	}, [searchValue]);

	const handleAddStudent = () => {
		// @TODO Add Student to the database
		console.log(formValues);
		console.log(studentFormValues);

		const ids = data.map((data: DataType) => data.id);
		const maxID = Math.max(...ids);

		let newData: DataType = {} as DataType;
		switch (entity) {
			case "student":
				newData = {
					id: data.length + 1,
					...formValues as StudentFromValuesType,
					...studentFormValues
				}
				break;
			case "secretary":
				newData = {
					id: data.length + 1,
					...formValues as SecretaryFormValuesType
				}
				break;
			case "faculty":
				newData = {
					id: data.length + 1,
					...formValues as FacultyFormValuesType
				}
				break;
			default:
				break;

		}


		setData([
			...data,
			newData
		]);

	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	};


	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setStudentFormValues((studentFormValues) => ({ ...studentFormValues, [name]: value }));
	};



	return (
		<Row className='h-100 d-flex flex-column justify-content-start align-items-center'>
			{/* @TODO Add button to add a student */}
			<h1>List of {entity === "student" ? "students" : "secretaries"}</h1>
			<div className='d-flex justify-content-between align-items-center'>
				<Form className='d-flex justify-content-start mb-4'>
					<Form.Control
						type='search'
						placeholder='Search'
						className='me-2'
						aria-label='Search'
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</Form>
			</div>



			{/* <Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a New {entity.charAt(0).toUpperCase() + entity.slice(1)}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						{formGroups.map((group) =>
							group.column ? (
								<Form.Group key={group.id} className='mb-3' controlId=''>
									<Row>
										{group.inputs.map((input) => {
											const { id, ...formProps } = input;
											return (
												<Col key={input.id}>
													<Form.Label>{input.label}</Form.Label>
													<Form.Control  {...formProps} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
												</Col>
											);
										})}
									</Row>
								</Form.Group>
							) : (
								group.inputs.map((input) => {
									const { id, ...formProps } = input;
									return (
										<Form.Group key={id} className='mb-3' controlId=''>
											<Form.Label>{input.label}</Form.Label>
											<Form.Control {...formProps} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
										</Form.Group>
									);
								})
							)
						)}

						{entity === "student" ? (
							years && faculties ? (
								<Form.Group className='mb-3' controlId=''>
									<Row>
										<Col>
											<Form.Label>Year</Form.Label>
											<Form.Select name="year" aria-label='Select year' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)}>
												{years.map((year) => (
													// @TODO Add Key for each option
													<option value={year}>{year}</option>
												))}
											</Form.Select>
										</Col>
										<Col>
											<Form.Label>Faculty</Form.Label>
											<Form.Select name="faculty"
												onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)}
												aria-label='Select faculty'
												style={{
													textOverflow: "ellipsis",
												}}
												value={faculties[0]}
											>
												{faculties.map((year) => (
													<option value={year}>{year}</option>
												))}
											</Form.Select>
										</Col>
									</Row>
								</Form.Group>
							) : (
								<></>
							)
						) : (
							<></>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							handleClose();
							handleAddStudent();
						}}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal> */}

			<ModalComponent showModal={showModal} formValues={formValues} setFormValues={setFormValues}
				setShowModal={setShowModal} entity={entity} handleAddStudent={handleAddStudent} formGroups={formGroups}
				years={years} faculties={faculties} setStudentFormValues={setStudentFormValues} />

			{
				(entity == "student" || entity == "secretary") &&
				<Table striped hover className='fw-bold color-primary mt-3'>
					<thead>
						<tr>
							<th>ID</th>
							<th></th>
							<th>Last Name</th>
							<th>First name</th>
							{entity == "student" && <th>Year</th>}
							<th>Faculty</th>
						</tr>
					</thead>
					<tbody>
						{(filteredData).map((dataEntity) => {
							return (
								<tr key={dataEntity.id}>
									<td>{dataEntity.id}</td>
									<td className='text-center'>
										<img
											src={(dataEntity as StudentType | SecretaryType).img ? (dataEntity as StudentType | SecretaryType).img : userDefaultPicture}
											width={25}
											height={25}
											className='rounded-circle aspect-ratio-100'
										/>
									</td>
									<td> {(dataEntity as StudentType | SecretaryType).lastName}</td>
									<td>{(dataEntity as StudentType | SecretaryType).firstName}</td>
									{entity == "student" && <td> {(dataEntity as StudentType).year}</td>}
									<td>{(dataEntity as StudentType | SecretaryType).faculty}</td>
									<td>
										<Button>Edit</Button>
									</td>
									<td className='align-middle'>
										<CloseButton
											className='text-danger'
											onClick={() => deleteStudent(dataEntity.id)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>}

			{entity == "faculty" && <Container>
				<Row>
					{filteredData.map((dataEntity) =>
						<Col lg={3}>
							<Card style={{ wordBreak: "keep-all", wordWrap: "normal", minWidth: "min-content" }} className='flex-col-center'>
								<Card.Img variant="top" src={facultyPicture} className='box-shadow ' />
								<CardHeader className='fw-bold'>{(dataEntity as FacultyType).name}</CardHeader>

							</Card></Col>)}
				</Row>

			</Container>
			}


			<Button
				className='w-fit-content fw-bold border border-white rounded shadow mt-2'
				onClick={handleShow}
			>
				ADD {entity.toUpperCase()}
			</Button>
		</Row >
	);
}
