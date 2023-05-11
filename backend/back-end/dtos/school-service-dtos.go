package dtos

type SchoolEntry struct {
	Name        string       `bson:"name" json:"name"`
	Departments []Department `bson:"departments" json:"departments"`
}

type Department struct {
	Name         string        `bson:"name" json:"name"`
	Teachers     []string      `bson:"teachers" json:"teachers"`
	YearsOfStudy []YearOfStudy `bason:"yearsOfStudy" json:"yearsOfStudy"`
}

type YearOfStudy struct {
	Type             string   `bson:"type" json:"type"` // bachelor, master, phd
	Year             int      `bson:"year" json:"year"`
	NumberOfSerieses int      `bson:"numberOfSerieses" json:"numberOfSerieses"`
	NumberOfGroups   int      `bson:"numberOfGroups" json:"numberOfGroups"`
	Subjects         []string `bson:"subjects" json:"subjects"`
}

type RPCAddDepartmentsPayload struct {
	Name        string       `bson:"name" json:"name"`
	Departments []Department `bson:"departments" json:"departments"`
}

type RPCDeleteDepartmentsPayload struct {
	Name        string   `bson:"name" json:"name"`
	Departments []string `bson:"departments" json:"departments"`
}

type RPCChangeNamePayload struct {
	SchoolName           string `bson:"schoolName" json:"schoolName"`
	FormerDepartmentName string `bson:"formerDepartmentName" json:"formerDepartmentName"`
	NewDepartmentName    string `bson:"newDepartmentName" json:"newDepartmentName"`
}

type RPCTeachersPayload struct {
	SchoolName     string   `bson:"schoolName" json:"schoolName"`
	DepartmentName string   `bson:"departmentName" json:"departmentName"`
	Teachers       []string `bson:"teachers" json:"teachers"`
}

type RPCInsertYearsOfStudyPayload struct {
	SchoolName     string        `bson:"schoolName" json:"schoolName"`
	DepartmentName string        `bson:"departmentName" json:"departmentName"`
	YearsOfStudy   []YearOfStudy `bson:"yearsOfStudy" json:"yearsOfStudy"`
}

type RPCDeleteYearsOfStudyPayload struct {
	SchoolName          string   `bson:"schoolName" json:"schoolName"`
	DepartmentName      string   `bson:"departmentName" json:"departmentName"`
	TypesOfYearsOfStudy []string `bson:"typesOfYearsOfStudy" json:"typesOfYearsOfStudy"`
	YearsOfStudy        []int    `bson:"yearsOfStudy" json:"yearsOfStudy"`
}

type RPCSubjectsPayload struct {
	SchoolName      string   `bson:"schoolName" json:"schoolName"`
	DepartmentName  string   `bson:"departmentName" json:"departmentName"`
	YearOfStudyType string   `bson:"yearOfStudyType" json:"yearOfStudyType"`
	YearOfStudy     int      `bson:"yearOfStudy" json:"yearOfStudy"`
	Subjects        []string `bson:"subjects" json:"subjects"`
}

type RPCChangeNumberOfPayload struct {
	SchoolName      string `bson:"schoolName" json:"schoolName"`
	DepartmentName  string `bson:"departmentName" json:"departmentName"`
	YearOfStudyType string `bson:"yearOfStudyType" json:"yearOfStudyType"`
	YearOfStudy     int    `bson:"yearOfStudy" json:"yearOfStudy"`
	NewNumber       int    `bson:"newNumber" json:"newNumber"`
}
