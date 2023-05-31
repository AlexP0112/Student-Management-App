import React from 'react'
import UserPageWrapper from './UserPageWrapper';

function Login() {
  return (
    <div>Login</div>
  )


}

const LoginPage = () => UserPageWrapper({ WrappedComponent: Login });
export default LoginPage;
