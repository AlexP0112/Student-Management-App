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
import { FormGroupType, SecretaryType } from "../interfaces/DatabaseTypes";
import ManageEntity from "./ManageEntity";


function AdminSecretaries() {
    const [secretaries, setStudents] = useState<SecretaryType[]>([
        {
            id: 1,
            lastName: "Secretara",
            firstName: "Nebuna",
            faculty: "Automatica si Calculatoare",
            img: picture,
            username: "pordaruandrei",
            email: "podaru@gmail.com",
        },
        {
            id: 2,
            lastName: "Mircea",
            firstName: "Ioana",
            faculty: "Automatica si Calculatoare",
            username: "stanandreea",
            email: "podaru@gmail.com",
        },
        {
            id: 3,
            lastName: "Stroe",
            firstName: "Alexandra",
            faculty: "Inginerie Medicala",
            username: "kullmanalexandru",
            email: "podaru@gmail.com",
        },
        {
            id: 4,
            lastName: "Nicu",
            firstName: "Cristina",
            faculty: "Electronica, telecomunicatii si tehnologia informatiei",
            username: "iordachestefan",
            email: "podaru@gmail.com",
        },
        {
            id: 5,
            lastName: "Gheorghe",
            firstName: "Anca",
            faculty: "Automatica si Calculatoare",
            username: "manouser",
            email: "podaru@gmail.com",
        },
    ]);

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
            data={secretaries}
            entity="secretary"
            formGroups={formGroups}
        />
    );
}

const AdminSecretariesPage = () =>
    userPageWrapper({ WrappedComponent: AdminSecretaries });
export default AdminSecretariesPage;
