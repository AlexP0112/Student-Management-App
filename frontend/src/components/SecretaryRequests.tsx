
import React, { useEffect, useState } from 'react'
import UserPageWrapper from './UserPageWrapper';
import { ListGroup, Badge, Form, Button } from 'react-bootstrap';

function SecretaryRequests() {

    const requests = [{
        id: 1,
        "fromCNP": "12345",
        "status": "pending",
        "subject": "adeverinta student",
        "message": "vreau adeverinta student sau dau peste voi"
    },
    {
        id: 2,
        "fromCNP": "12346",
        "status": "completed",
        "subject": "poza diploma BAC",
        "message": "poza cu BAC-u"
    },
    ]

    const [solvedRequests, setSolvedRequests] = useState<number[]>([]);

    useEffect(() => {
        console.log(solvedRequests)
    }, [solvedRequests])

    function updateRequests() {
        // @TODO Add requests to the database

    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSolvedRequests([...solvedRequests, Number(event.target.id)])
        } else {
            const index = solvedRequests.indexOf(Number(event.target.id));
            if (index > -1) { // only splice array when item is found
                setSolvedRequests(solvedRequests.filter(request => request != Number(event.target.id))); // 2nd parameter means remove one item only
            }
        }
    }


    return (

        <Form className=''>
            <h1>Requests</h1>
            <ListGroup as="ol" numbered>

                {requests.map(request =>
                    <>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <Form.Check
                                type="switch"
                                id={`${request.id}`}
                                label=""
                                onChange={handleCheckboxChange}
                            />
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{request.subject}</div>
                                {request.message}
                                <p className='fst-italic'>CNP: {request.fromCNP}</p>
                            </div>
                            <Badge bg="primary" pill>
                                {solvedRequests.indexOf(request.id) >= 0 ? "completed" : request.status}
                            </Badge>

                        </ListGroup.Item>
                    </>
                )}

                <div className='w-100 flex-row-center'>
                    <Button onClick={updateRequests}>
                        Update requests
                    </Button>
                </div>

            </ListGroup>
        </Form>




    )
}

const SecretaryRequestsPage = () =>
    UserPageWrapper({
        WrappedComponent: SecretaryRequests
    });

export default SecretaryRequestsPage;