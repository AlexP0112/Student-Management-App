package main

type requestPayload struct {
	Action                 string                 `json:"action"`
	Info                   string                 `json:"info,omitempty"`
	SchoolEntry            schoolEntry            `json:"schoolEntry,omitempty"`
	RegisterServicePayload registerServicePayload `json:"registerServicePayload,omitempty"`
}

type schoolEntry struct {
	Name        string       `json:"name"`
	Departments []department `json:"departments"`
}

type department struct {
	Name         string        `json:"name"`
	Teachers     []string      `json:"teachers"`
	YearsOfStudy []yearOfStudy `json:"yearsOfStudy"`
}

type yearOfStudy struct {
	Type             string   `json:"type"` // bachelor, master, phd
	Year             int      `json:"year"`
	NumberOfSerieses int      `json:"numberOfSerieses"`
	NumberOfGroups   int      `json:"numberOfGroups"`
	Subjects         []string `json:"subjects"`
}

// --------------------------------------------------------------------------------------------

type registerServicePayload struct {
	Role    string      `json:"role"` // student, teacher, admin
	Student student     `json:"student,omitempty"`
	Other   otherPerson `json:"other,omitempty"` // maybe in the future
}

type student struct {
	FirstName  string `json:"firstName"`
	MiddleName string `json:"middleName,omitempty"`
	LastName   string `json:"lastName"`

	Email string `json:"email"`

	Faculty    string `json:"faculty"`
	Department string `json:"department"`
	Year       int    `json:"year"`
	Series     string `json:"series"`
	Group      string `json:"group"`

	Regiser register `json:"register"`
}

type register struct {
	// maybe it would be better to keep this somewhere else
	// a service for people data and another one for register(catalog) data
}

type otherPerson struct{} // maybe in the future
