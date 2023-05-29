import React from "react";
import userPageWrapper from "./UserPageWrapper";

export type SecretaryType = {
	id: number;
	lastName: string;
	firstName: string;
	username: string;
	email: string;
	img?: string;
	faculty: string;
};

function Secretary() {
	return <div>Secretary</div>;
}

const SecretaryPage = () => userPageWrapper({ WrappedComponent: Secretary });
export default SecretaryPage;
