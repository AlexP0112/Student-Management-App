package dtos

type SchoolEntry struct {
	Name        string       `json:"name"`
	Departments []Department `json:"departments"`
}

type Department struct {
	Name         string        `json:"name"`
	Teachers     []string      `json:"teachers"`
	YearsOfStudy []YearOfStudy `json:"yearsOfStudy"`
}

type YearOfStudy struct {
	Type             string   `json:"type"` // bachelor, master, phd
	Year             int      `json:"year"`
	NumberOfSerieses int      `json:"numberOfSerieses"`
	NumberOfGroups   int      `json:"numberOfGroups"`
	Subjects         []string `json:"subjects"`
}

type RPCAddDepartmentsPayload struct {
	Name        string       `json:"name"`
	Departments []Department `json:"departments"`
}

type RPCDeleteDepartmentsPayload struct {
	Name        string   `json:"name"`
	Departments []string `json:"departments"`
}

type RPCChangeNamePayload struct {
	SchoolName           string `json:"schoolName"`
	FormerDepartmentName string `json:"formerDepartmentName"`
	NewDepartmentName    string `json:"newDepartmentName"`
}

type RPCTeachersPayload struct {
	SchoolName     string   `json:"schoolName"`
	DepartmentName string   `json:"departmentName"`
	Teachers       []string `json:"teachers"`
}

type RPCInsertYearsOfStudyPayload struct {
	SchoolName     string        `json:"schoolName"`
	DepartmentName string        `json:"departmentName"`
	YearsOfStudy   []YearOfStudy `json:"yearsOfStudy"`
}

type RPCDeleteYearsOfStudyPayload struct {
	SchoolName          string   `json:"schoolName"`
	DepartmentName      string   `json:"departmentName"`
	TypesOfYearsOfStudy []string `json:"typesOfYearsOfStudy"`
	YearsOfStudy        []int    `json:"yearsOfStudy"`
}

type RPCSubjectsPayload struct {
	SchoolName      string   `json:"schoolName"`
	DepartmentName  string   `json:"departmentName"`
	YearOfStudyType string   `json:"yearOfStudyType"`
	YearOfStudy     int      `json:"yearOfStudy"`
	Subjects        []string `json:"subjects"`
}

type RPCChangeNumberOfPayload struct {
	SchoolName      string `json:"schoolName"`
	DepartmentName  string `json:"departmentName"`
	YearOfStudyType string `json:"yearOfStudyType"`
	YearOfStudy     int    `json:"yearOfStudy"`
	NewNumber       int    `json:"newNumber"`
}
