import React, { useState } from 'react'
import userPageWrapper from './UserPageWrapper';
import { Container, Row, Col, Form, Card, ListGroup, Button, InputGroup } from 'react-bootstrap';
import bookImg from "../img/book.jpg"
import { FaCircle } from 'react-icons/fa';
import { DepartmentType, FacultyType, YearOfStudyType } from '../interfaces/DatabaseTypes';

function AdminSubjects() {

    // @TODO Get Faculties
    const faculties: FacultyType[] = [
        {
            "id": 1,
            "name": "Facultatea de Automatica si Calculatoare",
            "departments": [
                {
                    "id": 1,
                    "name": "Department of Fotbal",
                    "teachers": [
                        "Hagidd"
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
                {
                    "id": 2,
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
        },
        {
            "id": 2,
            "name": "Facultatea de Inginerie Electrica",
            "departments": [
                {
                    "id": 1,
                    "name": "Department of Fotbal",
                    "teachers": [
                        "Hagiaa"
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
                {
                    "id": 2,
                    "name": "Department of Engineering",
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

    const [selectedFaculty, setSelectedFaculty] = useState<FacultyType>({
        id: -1,
        name: "Select a faculty",
        departments: []
    });
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType>({
        id: -1,
        name: "Select a department",
    } as DepartmentType);
    const [selectedYearOfStudy, setSelectedYearOfStudy] = useState<YearOfStudyType>({
    } as YearOfStudyType);

    const [subjects, setSubjects] = useState<string[]>([]);
    const [currentSubject, setCurrentSubject] = useState<string>("")
    const [yearStructure, setYearStructure] = useState({ numberOfSerieses: -1, numberOfGroups: -1 });

    function getYearID(type: string, year: number) {
        return `${type}-${year}`
    }

    function handleFacultySelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const currentFaculty = faculties.find(faculty => faculty.id == Number(e.target.value));
        console.log(currentFaculty);
        currentFaculty != undefined && setSelectedFaculty(currentFaculty);
    }

    function handleDepartmentSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const currentDepartment = selectedFaculty.departments.find(department => department.id == Number(e.target.value));
        console.log(currentDepartment);
        currentDepartment != undefined && setSelectedDepartment(currentDepartment);
    }

    function handleYearSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const currentYear = selectedDepartment.yearsOfStudy.find(year => getYearID(year.type, year.year) == e.target.value);
        console.log(currentYear);
        currentYear != undefined && setSelectedYearOfStudy(currentYear);
        currentYear && setSubjects(currentYear.subjects);
        currentYear && setYearStructure({ numberOfSerieses: currentYear.numberOfSerieses, numberOfGroups: currentYear.numberOfGroups })
    }

    function addSubjectToList(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(currentSubject);
        setSubjects([...subjects, currentSubject]);
    }

    function applyChanges() {
        //@TODO Add subjects, number of serieses, groups into the database
    }


    return (
        <Container className='border b-2 bg-light' style={{

        }}>
            <Row>
                <Col md={4} className='p-0'>
                    {/* Image */}
                    <img src={bookImg} alt="Your Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Col>
                <Col md={8} className='p-4' >
                    {/* Form */}
                    <Form>
                        <Form.Group controlId="dropdown1" className='mb-2'>
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Select value={selectedFaculty.name} onChange={(e) => {
                                handleFacultySelect(e);
                            }}>
                                <option value={selectedFaculty.name} hidden>
                                    {selectedFaculty.name}
                                </option>
                                {faculties.map(faculty => <option key={faculty.id} value={faculty.id}>{faculty.name}</option>)}

                            </Form.Select>
                        </Form.Group>

                        {selectedFaculty.id != -1 &&
                            <Form.Group controlId="dropdown2" className='mb-2'>
                                <Form.Label>Department</Form.Label>
                                <Form.Select onChange={(e) => {
                                    handleDepartmentSelect(e);
                                }}>
                                    <option value={selectedDepartment.name} hidden>
                                        {selectedDepartment.name}
                                    </option>
                                    {selectedFaculty.departments != undefined &&
                                        selectedFaculty.departments.map(department =>
                                            <option key={`${selectedFaculty.id}-${department.id}`} value={department.id}>
                                                {department.name}
                                            </option>)}
                                </Form.Select>
                            </Form.Group>}

                        {selectedDepartment.id != -1 &&
                            <Form.Group controlId="dropdown3" className='mb-2'>
                                <Form.Label>Dropdown 3</Form.Label>
                                <Form.Select onChange={e => {
                                    handleYearSelect(e);
                                }}>
                                    <option value="Year" hidden>
                                        Year
                                    </option>
                                    {selectedDepartment.yearsOfStudy != undefined && selectedDepartment.yearsOfStudy.map(year =>
                                        <option key={`${year.type}${year.year}`} value={`${year.type}-${year.year}`}>
                                            {`${year.type} ${year.year}`}
                                        </option>)}
                                </Form.Select>
                            </Form.Group>}

                        {selectedYearOfStudy.year && <Container className='text-center'>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Title>
                                            Structure
                                        </Card.Title>
                                        <Card.Body>
                                            <Form>
                                                <div className="mb-3">
                                                    <Form.Label>
                                                        Number of Series:
                                                    </Form.Label>
                                                    <Form.Control min={0} max={10} name='numberOfSerieses'
                                                        type='number' value={yearStructure.numberOfSerieses}
                                                        onChange={e => setYearStructure({ ...yearStructure, [e.target.name]: e.target.value })}>

                                                    </Form.Control>

                                                    <Form.Label>
                                                        Number of Groups:
                                                        <Form.Control min={0} max={10} name='numberOfGroups'
                                                            type='number' value={yearStructure.numberOfGroups}
                                                            onChange={e => setYearStructure({ ...yearStructure, [e.target.name]: e.target.value })}>

                                                        </Form.Control>
                                                    </Form.Label>

                                                </div>

                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card>
                                        <Card.Title>
                                            Subjects
                                        </Card.Title>
                                        <Card.Body>
                                            <ListGroup variant='flush'>
                                                {subjects.map(subject => <ListGroup.Item>{subject}</ListGroup.Item>)}
                                            </ListGroup>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="New Subject"
                                                    aria-label="New Subject username"
                                                    aria-describedby="New Subject"
                                                    onChange={e => setCurrentSubject(e.target.value)}
                                                />
                                                <Button variant="outline-success" id="button-addon2" onClick={e => addSubjectToList(e)}>
                                                    Add
                                                </Button>
                                            </InputGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>}



                        <Form.Group controlId="submitButton" className='mt-3 flex-row-center'>
                            <button type="submit" className="btn btn-primary" onClick={applyChanges}>Apply Changes</button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}


const AdminSubjectsPage = () =>
    userPageWrapper({ WrappedComponent: AdminSubjects });

export default AdminSubjectsPage;