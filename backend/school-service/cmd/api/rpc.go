package main

import (
	"context"
	"log"
	"time"

	"school-service/data"
)

type RPCServer struct{}

type schoolEntry struct {
	Name        string            `json:"name"`
	Departments []data.Department `json:"departments"`
}

func (r *RPCServer) AddSchool(payload schoolEntry, reply *string) error {
	collection := mongoClient.Database("university").Collection("schools")
	_, err := collection.InsertOne(context.TODO(), data.SchoolEntry{
		Name:        payload.Name,
		Departments: payload.Departments,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	})

	if err != nil {
		log.Println("Error inserting school entry")
		return err
	}

	*reply = "Success logging info to database"

	return nil
}

func (r *RPCServer) GetSchoolByName(name string, reply *schoolEntry) error {
	school, err := data.GetSchoolByName(name)
	if err != nil {
		log.Println("Error getting school by name")
		return err
	}

	*reply = schoolEntry{
		Name:        school.Name,
		Departments: school.Departments,
	}

	return nil
}
