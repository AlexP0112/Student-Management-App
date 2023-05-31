import React, { SyntheticEvent, useEffect, useState } from 'react'
import UserPageWrapper from './UserPageWrapper';
import { Container, Row, Col, Form, Accordion, ProgressBar, FormGroup, Button } from 'react-bootstrap';
import { StudentType } from '../interfaces/DatabaseTypes';
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

type GradeType = {
    subject: string;
    grade: number;
}


function SecretaryDashboard() {


    const initialStudents = [
        {
            id: 1,
            lastName: "Podaru",
            firstName: "Andrei",
            year: "Bachelor's 3rd",
            faculty: "Automatica si Calculatoare",
            username: "pordaruandrei",
            email: "podaru@gmail.com",
            cnp: "234242323223"
        },
        {
            id: 2,
            lastName: "Stan",
            firstName: "Andreea",
            year: "Bachelor's 3rd",
            faculty: "Automatica si Calculatoare",
            username: "stanandreea",
            email: "podaru@gmail.com",
            cnp: "234242323227"
        },
        {
            id: 3,
            lastName: "Kullman",
            firstName: "Alexandru",
            year: "Bachelor's 3rd",
            faculty: "Inginerie Medicala",
            username: "kullmanalexandru",
            email: "podaru@gmail.com",
            cnp: "234242323225"
        },
        {
            id: 4,
            lastName: "Iordache",
            firstName: "Stefan",
            year: "Bachelor's 3rd",
            faculty: "Electronica, telecomunicatii si tehnologia informatiei",
            username: "iordachestefan",
            email: "podaru@gmail.com",
            cnp: "234242323224"
        },
        {
            id: 5,
            lastName: "Manolache",
            firstName: "Alexandru",
            year: "Bachelor's 3rd",
            faculty: "Automatica si Calculatoare",
            username: "manouser",
            email: "podaru@gmail.com",
            cnp: "234242323226"
        },
    ]


    const [students, setStudents] = useState<StudentType[]>(initialStudents);
    const [filteredStudents, setFilteredStudents] = useState<StudentType[]>(students);
    const [currentStudent, setCurrentStudent] = useState<StudentType>()
    const [searchStudent, setSearchStudent] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [newGrade, setNewGrade] = useState(1);
    const [subjects, setSubjects] = useState(["romana", "matematica", "vrajeala"]);
    const [grades, setGrades] = useState<GradeType[]>([])

    useEffect(() => {
        // @TODO: Get users from database
    }, [])

    useEffect(() => {
        // @TODO: Get grades from database 
        setGrades([{ subject: "Romana", grade: 7 }, { subject: "Engleza", grade: 9 }])
    }, [currentStudent])

    useEffect(() => {
        const filtered = students.filter(student => student.cnp.includes(searchStudent))
        setFilteredStudents(filtered);
    }, [searchStudent])

    useEffect(() => {
        // @TODO Get subjects from database for the same year as the currentStudent
    }, [currentStudent])



    function handleStudentSelect(eventKey: AccordionEventKey) {
        const foundStudent = students.find(student => student.cnp === eventKey);
        console.log(foundStudent);
        eventKey && foundStudent && setCurrentStudent(foundStudent);
    }


    function handleAddGrade() {
        // @TODO: Add to database
        newSubject != "" && newGrade &&
            setGrades([...grades, { subject: newSubject, grade: newGrade }])
    }



    return (
        <Container fluid>
            <Row>
                <Col className="bg-light border" xs={12} md={6}>
                    <h2>Current Student</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='fw-bold' >
                                Search student by CNP</Form.Label>
                            <Form.Control type="text" onChange={e => setSearchStudent(e.target.value)} />
                        </Form.Group>
                    </Form>

                    {filteredStudents &&
                        < Accordion onSelect={(eventKey) => handleStudentSelect(eventKey)}>
                            {filteredStudents.map(student =>
                                <Accordion.Item key={student.id} eventKey={String(student.cnp)}>
                                    <Accordion.Header>{student.firstName} {student.lastName}</Accordion.Header>
                                    <Accordion.Body>
                                        <p><span className='fw-bold'>CNP</span>: {student.cnp}</p>
                                        <p><span className='fw-bold'>Faculty</span>: {student.faculty}</p>
                                        <p><span className='fw-bold'>Year</span>: {student.year}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>}
                </Col>
                <Col xs={12} className='bg-light border' md={6}>
                    <h2>Grades</h2>
                    {grades.map(grade =>
                        <>
                            <p>{grade.subject}</p>
                            <ProgressBar now={grade.grade * 10} label={`${grade.grade}/10`} className='mb-4' />
                        </>)
                    }

                    <div className='flex-col-center'>
                        <FormGroup className='text-center w-50'>
                            <Row>
                                <Col>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Select name="subject" aria-label='Select subject'
                                        value={newSubject}
                                        onChange={e => setNewSubject(e.target.value)}>

                                        <option value={newSubject} hidden>
                                            {newSubject}
                                        </option>

                                        {subjects.map((subject) => (
                                            <option value={subject}>{subject}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Grade
                                    </Form.Label>
                                    <Form.Control min={1} max={10} name='newGrade'
                                        type='number' value={newGrade} onChange={e => setNewGrade(Number(e.target.value))}>
                                    </Form.Control>

                                </Col>
                            </Row>
                        </FormGroup>
                        <Button className='mt-4' onClick={handleAddGrade}>Add Grade</Button>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}


const SecretaryDashboardPage = () =>
    UserPageWrapper({
        WrappedComponent: SecretaryDashboard,
    });

export default SecretaryDashboardPage;