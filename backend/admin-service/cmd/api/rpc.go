package main

import (
	"admin-service/data"
	"context"
	"log"
	"time"
)

type RPCServer struct{}

type RPCPayload struct {
	University string
	Faculty    string
	Department string
}

func (r *RPCServer) LogInfo(payload RPCPayload, reply *string) error {
	collection := mongoClient.Database("test").Collection("test")
	_, err := collection.InsertOne(context.TODO(), data.SchoolEntry{
		University: payload.University,
		Faculty:    payload.Faculty,
		Department: payload.Department,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	})

	if err != nil {
		log.Println("Error inserting school entry")
		return err
	}

	*reply = "Success logging info to database"

	return nil
}
