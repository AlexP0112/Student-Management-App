import React, { useRef } from "react";
import {
	Modal,
	Form,
	Row,
	Col,
	Button,
	CloseButton,
	Table,
} from "react-bootstrap";
import { StudentType } from "./AdminStudents";
import { SecretaryType } from "./Secretary";
import { useState, useEffect } from "react";
import userDefaultPicture from "../img/user-default-picture.svg";
import { randomUUID } from "crypto";

type DataType = StudentType | SecretaryType;
type ModalPropsType = {
	data: DataType[];
	entity: "student" | "secretary";
	years?: string[];
	faculties?: string[];
};

type NewStudent = {
	lastName: string;
	firstName: string;
	email: string;
	cnp: string;
	faculty: string;

}

export default function ManageEntity(props: ModalPropsType) {
	const { entity, years, faculties } = props;

	const [data, setData] = useState(props.data);
	const [filteredData, setFilteredData] = useState(data);
	const [searchValue, setSearchValue] = useState("");
	const [newData, setNewData] = useState<DataType>({} as DataType);
	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
	});

	const [studentFormValues, setStudentFormValues] = useState({
		year: years ? years[0] : "",
		faculty: faculties ? faculties[0] : ""
	})

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

	useEffect(() => {
		if (searchValue == "") {
			setFilteredData(data);
		}

		const filtered = data.filter((dataEntity: DataType) =>
			dataEntity.firstName.toLowerCase().includes(searchValue.toLowerCase())
		);

		setFilteredData(filtered);
	}, [searchValue]);

	const handleClose = () => setShowModal(false);
	const handleAddStudent = () => {
		// @TODO Add Student to the database
		console.log(formValues);	
		console.log(studentFormValues);

		const ids = data.map((data: DataType) => data.id);
		const maxID = Math.max(...ids);

		if (entity === "student") {
			setData([
				...data,
				{
					id: maxID + 1,
					...formValues,
					...studentFormValues
				},
			]);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setStudentFormValues((studentFormValues) => ({ ...studentFormValues, [name]: value }));
	};
	
	const formGroups = [
		{
			id: 1,
			column: false,
			inputs: [
				{
					id: 1,
					name: "email",
					label: "Email",
					placeholder: "Email",
					type: "email",
				},
			],
			type: "control",
		},

		{
			id: 2,
			column: false,
			inputs: [
				{
					id: 1,
					name: "username",
					label: "Username",
					placeholder: "Username",
					type: "text",
				},
			],
			type: "control",
		},

		{
			id: 3,
			column: false,
			inputs: [
				{
					id: 1,
					name: "password",
					label: "Password",
					placeholder: "Password",
					type: "password",
				},
			],
			type: "control",
		},

		{
			id: 4,
			column: false,
			inputs: [
				{
					id: 1,
					name: "cnp",
					label: "CNP",
					placeholder: "CNP",
					type: "text",
				},
			],
			type: "control",
		},
		{
			id: 5,
			column: true,
			inputs: [
				{
					id: 1,
					name: "lastName",
					label: "Last Name",
					placeholder: "Last Name",
					type: "text",
				},
				{
					id: 2,
					name: "firstName",
					label: "First Name",
					placeholder: "First Name",
					type: "text",
				},
			],
			type: "control",
		},
	];

	return (
		<Row className='h-100 d-flex flex-column justify-content-start align-items-center'>
			{/* @TODO Add button to add a student */}
			<h1>List of students</h1>
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
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a New Student</Modal.Title>
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
													<Form.Control  {...formProps} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}/>
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
											<Form.Control {...formProps} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}/>
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
			</Modal>
			<Table striped hover className='fw-bold color-primary mt-3'>
				<thead>
					<tr>
						<th>ID</th>
						<th></th>
						<th>Last Name</th>
						<th>First name</th>
						<th>Year</th>
						<th>Faculty</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((dataEntity: DataType) => {
						return (
							<tr key={dataEntity.id}>
								<td>{dataEntity.id}</td>
								<td className='text-center'>
									<img
										src={dataEntity.img ? dataEntity.img : userDefaultPicture}
										width={25}
										height={25}
										className='rounded-circle aspect-ratio-100'
									/>
								</td>
								<td> {dataEntity.lastName}</td>
								<td>{dataEntity.firstName}</td>
								{"years" in dataEntity && <td> dataEntity.year</td>}
								<td>{dataEntity.faculty}</td>
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
			</Table>
			<Button
				className='w-fit-content  fw-bold border border-white rounded shadow'
				onClick={handleShow}
			>
				ADD STUDENT
			</Button>
		</Row>
	);
}
