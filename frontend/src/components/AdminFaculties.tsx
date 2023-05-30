import React from 'react'
import userPageWrapper from './UserPageWrapper';
import { Button, Card, CardGroup, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import facultyPicture from '../img/upb.jpg';
import ManageEntity from './ManageEntity';
import { FacultyType, FormGroupType } from '../interfaces/DatabaseTypes';


function AdminFaculties() {

    const formGroups: FormGroupType[] = [
        {
            id: 1,
            column: false,
            inputs: [
                {
                    id: 1,
                    name: "name",
                    label: "Name",
                    placeholder: "Faculty Name",
                    type: "text",
                },
            ],
            type: "control",
        },
    ];


    const faculties: FacultyType[] = [
        {
            id: 1,
            name: "Faculty of Automatic Control and Computer Science",
            departments: [
                {
                    id: 1,
                    "name": "Department of Fotbal",
                    "teachers": [
                        "Hagi"
                    ],
                    "yearsOfStudy": [
                        {
                            "type": "Bachelor",
                            "year": 1,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 3,
                            "subjects": [
                                "Mate",
                                "Romana",
                                "Informatica"
                            ]
                        },
                        {
                            "type": "Master",
                            "year": 2,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 4,
                            "subjects": [
                                "Geografie",
                                "Istorie"
                            ]
                        }
                    ]
                },

            ]
        },
        {
            id: 2,
            name: "Inginerie medicala",
            departments: [
                {
                    id: 1,
                    "name": "Department of Geanina",
                    "teachers": [
                        "Banel"
                    ],
                    "yearsOfStudy": [
                        {
                            "type": "Bachelor",
                            "year": 2,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 9,
                            "subjects": [
                                "Mate",
                                "Romana",
                                "Informatica"
                            ]
                        },
                        {
                            "type": "Master",
                            "year": 1,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 4,
                            "subjects": [
                                "Filosofie",
                                "Istorie"
                            ]
                        }
                    ]
                }

            ]
        }, {
            id: 3,
            name: "Electronica si telecomunicatii",
            departments: [
                {
                    id: 1,
                    "name": "Department of Geanina",
                    "teachers": [
                        "Banel"
                    ],
                    "yearsOfStudy": [
                        {
                            "type": "Bachelor",
                            "year": 2,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 9,
                            "subjects": [
                                "Mate",
                                "Romana",
                                "Informatica"
                            ]
                        },
                        {
                            "type": "Master",
                            "year": 1,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 4,
                            "subjects": [
                                "Filosofie",
                                "Istorie"
                            ]
                        }
                    ]
                }

            ]
        }, {
            id: 4,
            name: "Faculty of Automatic Control and Computer Science",
            departments: [
                {
                    id: 1,
                    "name": "Department of Geanina",
                    "teachers": [
                        "Banel"
                    ],
                    "yearsOfStudy": [
                        {
                            "type": "Bachelor",
                            "year": 2,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 9,
                            "subjects": [
                                "Mate",
                                "Romana",
                                "Informatica"
                            ]
                        },
                        {
                            "type": "Master",
                            "year": 1,
                            "numberOfSerieses": 0,
                            "numberOfGroups": 4,
                            "subjects": [
                                "Filosofie",
                                "Istorie"
                            ]
                        }
                    ]
                }

            ]
        }

    ]

    return (
        <ManageEntity
            data={faculties}
            entity='faculty'
            formGroups={formGroups}
        />
    )
}

const AdminFacultiesPage = () =>
    userPageWrapper({ WrappedComponent: AdminFaculties });

export default AdminFacultiesPage;

