package main

import (
	"context"
	"log"
	"time"

	"school-service/data"
)

type RPCServer struct{}

type RPCSchoolPayload struct {
	Name        string            `json:"name"`
	Departments []data.Department `json:"departments"`
}

type RPCGetByPayload struct {
	Info string `json:"info"`
}

func (r *RPCServer) AddSchool(payload RPCSchoolPayload, reply *string) error {
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

func (r *RPCServer) GetSchoolByName(payload string, reply *RPCSchoolPayload) error {
	// needs to be investigated further
	// check the signature of the rpc method
	// arata ca drq pizda masii

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
