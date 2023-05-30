import React from 'react'
import UserPageWrapper from './UserPageWrapper';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import NavbarComp from './NavbarComp';

function Settings() {
    return (
        <h1>Settings</h1>
    )
}


const SettingsPage = () =>
    UserPageWrapper({
        WrappedComponent: Settings,
    });

export default SettingsPage;

