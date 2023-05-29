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
import AddModal from "./ManageEntity";

export type StudentType = {
	id: number;
	img?: string;
	lastName: string;
	firstName: string;
	year: string;
	faculty: string;
	username: string;
	email: string;
};

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

	return (
		<AddModal
			data={students}
			entity='student'
			years={years}
			faculties={faculties}
		/>
	);
}

const AdminStudentsPage = () =>
	userPageWrapper({ WrappedComponent: AdminStudents });
export default AdminStudentsPage;
