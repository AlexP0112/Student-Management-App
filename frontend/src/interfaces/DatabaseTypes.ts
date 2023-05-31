export type StudentType = {
	id: number;
	cnp: string;
	img?: string;
	lastName: string;
	firstName: string;
	year: string;
	faculty: string;
	username: string;
	email: string;

};

export type SecretaryType = {
	id: number;
	lastName: string;
	firstName: string;
	username: string;
	email: string;
	img?: string;
	faculty: string;
};

export type YearOfStudyType = {
    type: string;
    year: number;
    numberOfSerieses: number;
    numberOfGroups: number;
    subjects: string[];
}

export type DepartmentType = {
	id: number;
    name: string;
    teachers: string[];
    yearsOfStudy: YearOfStudyType[]
}

export type FacultyType = {
    id: number;
    name:string;
    departments: DepartmentType[];
}

export type SubjectType = string;


export type DataType = StudentType | SecretaryType | FacultyType;


export type NewStudent = {
	lastName: string;
	firstName: string;
	email: string;
	cnp: string;
	faculty: string;
}

export type StudentFromValuesType = {
	username: "",
	email: "",
	lastName: "",
	firstName: ""
}

export type SecretaryFormValuesType = {
	username: "",
	email: "",
	lastName: "",
	firstName: "",
	faculty: ""
}

export type FacultyFormValuesType = {
	name: string,
	departments: DepartmentType[];
}

export type SubjectFormValuesType = {
	schoolName: string,
	departmentName: string,
	yearOfStudyType: string,
	yearOfStudy: number;
	subjects: string[]
}



export type StudentFormValues = {
    year: string; faculty: string
}

export type InputType = {
    id: number;
    name: string;
    label: string;
    placeholder: string;
    type: string;
}

export type FormGroupType = {
    id: number;
    column: boolean;
    inputs: InputType[]
    type: string; // control
}


export type FormValuesType = StudentFromValuesType | SecretaryFormValuesType | FacultyFormValuesType;