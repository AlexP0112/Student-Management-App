package main

import (
	"log"
	"time"

	"school-service/data"
)

// structurile astea trebuiesc mutate intr un fisier dedicat

type RPCServer struct{}

func (r *RPCServer) AddSchool(payload RPCSchoolPayload, reply *string) error {
	err := data.InsertSchool(data.SchoolEntry{
		Name:        payload.Name,
		Departments: payload.Departments,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	})

	if err != nil {
		log.Println("Error inserting school")
		return err
	}

	*reply = "Success logging info to database"

	return nil
}

func (r *RPCServer) GetSchoolByName(payload string, reply *RPCSchoolPayload) error {
	school, err := data.GetSchoolByName(payload)
	if err != nil {
		log.Println("Error getting school by name")
		return err
	}

	*reply = RPCSchoolPayload{
		Name:        school.Name,
		Departments: school.Departments,
	}

	return nil
}

func (r *RPCServer) AddDepartments(payload RPCSchoolPayload, reply *string) error {
	err := data.InsertDepartments(payload.Name, payload.Departments)
	if err != nil {
		log.Println("Error inserting departments")
		return err
	}

	*reply = "Success logging info to database"

	return nil
}

func (r *RPCServer) DeleteDepartments(payload RPCDeleteDepartmentsPayload, reply *string) error {
	err := data.DeleteDepartments(payload.Name, payload.Departments)
	if err != nil {
		log.Println("Error deleting departments")
		return err
	}

	*reply = "Success deleting info from database"

	return nil
}

func (r *RPCServer) ChangeDepartmentName(payload RPCChangeNamePayload, reply *string) error {
	err := data.ChangeDepartmentName(payload.SchoolName, payload.FormerDepartmentName, payload.NewDepartmentName)
	if err != nil {
		log.Println("Error changing department name")
		return err
	}

	*reply = "Success changing department name"

	return nil
}

func (r *RPCServer) InsertTeachers(payload RPCTeachersPayload, reply *string) error {
	err := data.InsertTeachers(payload.SchoolName, payload.DepartmentName, payload.Teachers)
	if err != nil {
		log.Println("Error inserting teachers")
		return err
	}

	*reply = "Success inserting teachers"

	return nil
}

func (r *RPCServer) DeleteTeachers(payload RPCTeachersPayload, reply *string) error {
	err := data.DeleteTeachers(payload.SchoolName, payload.DepartmentName, payload.Teachers)
	if err != nil {
		log.Println("Error deleting teachers")
		return err
	}

	*reply = "Success deleting teachers"

	return nil
}

func (r *RPCServer) InsertYearsOfStudy(payload RPCInsertYearsOfStudyPayload, reply *string) error {
	err := data.InsertYearsOfStudy(payload.SchoolName, payload.DepartmentName, payload.YearsOfStudy)
	if err != nil {
		log.Println("Error inserting years of study")
		return err
	}

	*reply = "Success inserting years of study"

	return nil
}

func (r *RPCServer) DeleteYearsOfStudy(payload RPCDeleteYearsOfStudyPayload, reply *string) error {
	err := data.DeleteYearsOfStudy(payload.SchoolName, payload.DepartmentName, payload.TypesOfYearsOfStudy, payload.YearsOfStudy)
	if err != nil {
		log.Println("Error deleting years of study")
		return err
	}

	*reply = "Success deleting years of study"

	return nil
}

func (r *RPCServer) InsertSubjects(payload RPCSubjectsPayload, reply *string) error {
	err := data.InsertSubjects(payload.SchoolName, payload.DepartmentName, payload.YearOfStudyType, payload.YearOfStudy, payload.Subjects)
	if err != nil {
		log.Println("Error inserting subjects")
		return err
	}

	*reply = "Success inserting subjects"

	return nil
}

func (r *RPCServer) DeleteSubjects(payload RPCSubjectsPayload, reply *string) error {
	err := data.DeleteSubjects(payload.SchoolName, payload.DepartmentName, payload.YearOfStudyType, payload.YearOfStudy, payload.Subjects)
	if err != nil {
		log.Println("Error deleting subjects")
		return err
	}

	*reply = "Success deleting subjects"

	return nil
}

func (r *RPCServer) ChangeNumberOfSerieses(payload RPCChangeNumberOfPayload, reply *string) error {
	err := data.ChangeNumberOfSerieses(payload.SchoolName, payload.DepartmentName, payload.YearOfStudyType, payload.YearOfStudy, payload.NewNumber)
	if err != nil {
		log.Println("Error changing number of serieses")
		return err
	}

	*reply = "Success changing number of serieses"

	return nil
}

func (r *RPCServer) ChangeNumberOfGroups(payload RPCChangeNumberOfPayload, reply *string) error {
	err := data.ChangeNumberOfGroups(payload.SchoolName, payload.DepartmentName, payload.YearOfStudyType, payload.YearOfStudy, payload.NewNumber)
	if err != nil {
		log.Println("Error changing number of groups")
		return err
	}

	*reply = "Success changing number of groups"

	return nil
}
