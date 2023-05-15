package main

import (
	"school-service/data"
)

type RPCSchoolPayload struct {
	Name        string
	Departments []data.Department
}

type RPCDeleteDepartmentsPayload struct {
	Name        string
	Departments []string
}

type RPCChangeNamePayload struct {
	SchoolName           string
	FormerDepartmentName string
	NewDepartmentName    string
}

type RPCTeachersPayload struct {
	SchoolName     string
	DepartmentName string
	Teachers       []string
}

type RPCInsertYearsOfStudyPayload struct {
	SchoolName     string
	DepartmentName string
	YearsOfStudy   []data.YearOfStudy
}

type RPCDeleteYearsOfStudyPayload struct {
	SchoolName          string
	DepartmentName      string
	TypesOfYearsOfStudy []string
	YearsOfStudy        []int
}

type RPCSubjectsPayload struct {
	SchoolName      string
	DepartmentName  string
	YearOfStudyType string
	YearOfStudy     int
	Subjects        []string
}

type RPCChangeNumberOfPayload struct {
	SchoolName      string
	DepartmentName  string
	YearOfStudyType string
	YearOfStudy     int
	NewNumber       int
}
