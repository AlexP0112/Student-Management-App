import React, { useState } from 'react'
import UserPageWrapper from './UserPageWrapper';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import RapidUniv from "../img/rapid-univ-cover.png"
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useUserContext } from '../contexts/UserContext';

function Login() {

  const { user, setUser } = useUserContext();
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {

    if (usernameInput != "" && password != "") {
      // @TODO Get Login From database
      // const userDB = fetch
      let userDB;
      console.log(usernameInput)

      if (usernameInput == "admin") {
        userDB = { username: "admin" };
      } else if (usernameInput == "secretary") {
        userDB = { username: "secretary" };
      } else {
        alert("Invalid Credentials");
      }


      if (userDB) {
        setUser(userDB);
      }
    }
  }

  return (
    <div className="background-login  flex-row-center w-100 text-white" style={{ height: "100vh" }}>
      <Card className='w-50 border border-light-3 p-3' style={{ background: "transparent", backdropFilter: "blur(5px)" }}>
        <Card.Img variant="top" src={RapidUniv} />
        <Card.Body className='flex-col-center'>
          <Card.Title>Welcome to our university platform</Card.Title>
          <Card.Text>
            <Form className='text-black'>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Username" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </FloatingLabel>
            </Form>
          </Card.Text>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Card.Body>
      </Card>
    </div>
  )


}

const LoginPage = () => UserPageWrapper({ WrappedComponent: Login });
export default LoginPage;
