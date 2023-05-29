package main

import (
	"context"
	"grades-register-service/data"

	"go.mongodb.org/mongo-driver/bson"
)

type RPCServer struct{}

type RPCPayload struct {
}

func (r *RPCServer) GetAllGrades(reply *[]data.StudentRegister) error {
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

func (r *RPCServer) GetGradesByCNP(payload string, reply *[]data.StudentRegister) error {
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

func (r *RPCServer) AddGradeToSubject(payload data.AddGradePayload, reply *string) error {
	collection := mongoClient.Database("university").Collection("grades")
	filter := bson.M{"cnp": payload.CNP, "history.year": payload.Year}
	update := bson.M{"$set": bson.M{"history.$.subjects." + payload.Subject: payload.Grade}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	*reply = "OK"
	return nil
}

func (r *RPCServer) AddGradeRegister(payload data.StudentRegister, reply *string) error {
	collection := mongoClient.Database("university").Collection("grades")
	_, err := collection.InsertOne(context.Background(), payload)
	if err != nil {
		return err
	}
	*reply = "OK"
	return nil
}
