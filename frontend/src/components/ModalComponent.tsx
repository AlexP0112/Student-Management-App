import { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import AdminStudentsPage from "./AdminStudents";
import { FormGroupType, FormValuesType, StudentFormValues } from "../interfaces/DatabaseTypes";



type ModalPropsType = {
    entity: "student" | "secretary" | "faculty";
    years?: string[];
    faculties?: string[];
    handleAddStudent: any;
    formGroups: FormGroupType[];
    showModal: boolean;
    setShowModal: any;
    formValues: FormValuesType;
    setFormValues: any;
    setStudentFormValues: any;
};


export default function ModalComponent(props: ModalPropsType) {

    const { entity, formGroups, years, faculties, handleAddStudent, showModal, setShowModal, formValues, setFormValues, setStudentFormValues } = props;


    const handleClose = () => setShowModal(false);

    const handleShow = () => setShowModal(true);
    // const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues: FormValuesType) => ({ ...prevValues, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStudentFormValues((studentFormValues: StudentFormValues) => ({ ...studentFormValues, [name]: value }));
    };


    return (
        <Modal show={showModal} onHide={handleClose}>
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

                    {
                        entity == "student" && (years && faculties && <Form.Group className='mb-3' controlId=''>
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
                        </Form.Group>)


                    }



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
    )
}



