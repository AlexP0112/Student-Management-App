import React from "react";
import userPageWrapper from "./UserPageWrapper";

function Secretary() {
	return <div>Secretary</div>;
}

const SecretaryPage = () => userPageWrapper({ WrappedComponent: Secretary });
export default SecretaryPage;
