import React, { useEffect, useState } from "react";
import {
	Button,
	CloseButton,
	Col,
	Container,
	Form,
	Modal,
	Row,
	Table,
} from "react-bootstrap";
import NavbarComp from "./NavbarComp";
import userPageWrapper from "./UserPageWrapper";
import userDefaultPicture from "../img/user-default-picture.svg";
import picture from "../img/student.jpg";
import ManageEntity from "./ManageEntity";
import { FormGroupType, StudentType } from "../interfaces/DatabaseTypes";



function AdminStudents() {
	const [students, setStudents] = useState<StudentType[]>([
		{
			id: 1,
			lastName: "Podaru",
			firstName: "Andrei",
			year: "Bachelor's 3rd",
			faculty: "Automatica si Calculatoare",
			img: picture,
			username: "pordaruandrei",
			email: "podaru@gmail.com",
		},
		{
			id: 2,
			lastName: "Stan",
			firstName: "Andreea",
			year: "Bachelor's 3rd",
			faculty: "Automatica si Calculatoare",
			username: "stanandreea",
			email: "podaru@gmail.com",
		},
		{
			id: 3,
			lastName: "Kullman",
			firstName: "Alexandru",
			year: "Bachelor's 3rd",
			faculty: "Inginerie Medicala",
			username: "kullmanalexandru",
			email: "podaru@gmail.com",
		},
		{
			id: 4,
			lastName: "Iordache",
			firstName: "Stefan",
			year: "Bachelor's 3rd",
			faculty: "Electronica, telecomunicatii si tehnologia informatiei",
			username: "iordachestefan",
			email: "podaru@gmail.com",
		},
		{
			id: 5,
			lastName: "Manolache",
			firstName: "Alexandru",
			year: "Bachelor's 3rd",
			faculty: "Automatica si Calculatoare",
			username: "manouser",
			email: "podaru@gmail.com",
		},
	]);

	const years = [
		"Bachelor's 1st",
		"Bachelor's 2nd",
		"Bachelor's 3rd",
		"Bachelor's 4th",
		"Master 1st",
		"Master 2nd",
		"PhD",
	];

	const faculties = [
		"Facultatea de Automatica si Calculatoare",
		"Electronica, telecomunicatii si tehnologia informatiei",
		"Facultatea de Inginerie Medicala",
		"Facultatea de Inginerie in Limbi Straine",
		"Facultatea de Mecanica si Mecatronica",
	];

	const formGroups: FormGroupType[] = [
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
		<ManageEntity
			data={students}
			entity='student'
			years={years}
			faculties={faculties} formGroups={formGroups} />

	);
}

const AdminStudentsPage = () =>
	userPageWrapper({ WrappedComponent: AdminStudents });
export default AdminStudentsPage;
