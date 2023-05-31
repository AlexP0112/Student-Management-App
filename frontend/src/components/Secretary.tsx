import React from "react";
import UserPageWrapper from "./UserPageWrapper";



function Secretary() {
	return <div>Secretary</div>;
}

const SecretaryPage = () => UserPageWrapper({ WrappedComponent: Secretary });
export default SecretaryPage;
