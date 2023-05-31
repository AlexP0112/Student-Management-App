import React from 'react'
import UserPageWrapper from './UserPageWrapper';
import { Container, Row, Col, Breadcrumb, Form } from 'react-bootstrap';
import NavbarComp from './NavbarComp';
import { useUserContext } from '../contexts/UserContext';

function Settings() {
    const { user } = useUserContext();

    return (
        <>
            <h1>Settings</h1>
            <Form className='w-25'>
                <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={`${user.username}`}
                        aria-label="Disabled input example"
                        readOnly
                    />
                </Form.Group>
            </Form>
            <h2>No settings available for your account.</h2>
            <h4>Please contact the platform administrator</h4>
        </>
    )
}


const SettingsPage = () =>
    UserPageWrapper({
        WrappedComponent: Settings,
    });

export default SettingsPage;

