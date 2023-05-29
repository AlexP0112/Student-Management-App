package main

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"grades-register-service/data"
)

type RPCServer struct{}

type RPCPayload struct {
}

func (r *RPCServer) getAllGrades(reply *[]data.StudentRegister) error {
	var grades []data.StudentRegister
	collection := mongoClient.Database("university").Collection("grades")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	err = cursor.All(context.Background(), &grades)
	if err != nil {
		return err
	}
	*reply = grades
	return nil
}

func (r *RPCServer) getGradesByCNP(payload string, reply *[]data.StudentRegister) error {
	var grades []data.StudentRegister
	collection := mongoClient.Database("university").Collection("grades")
	filter := bson.M{"cnp": payload}
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return err
	}
	err = cursor.All(context.Background(), &grades)
	if err != nil {
		return err
	}
	*reply = grades
	return nil
}
