package main

import (
	"context"
	"personal-data-service/data"

	"go.mongodb.org/mongo-driver/bson"
)

type RPCServer struct{}

type RPCPayload struct {
}

func (r *RPCServer) GetAllPersonalData(reply *[]data.PersonalInfo) error {
	var personalInfo []data.PersonalInfo
	collection := mongoClient.Database("university").Collection("personalData")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	err = cursor.All(context.Background(), &personalInfo)
	if err != nil {
		return err
	}
	*reply = personalInfo
	return nil
}

func (r *RPCServer) GetPersonalDataByCNP(payload string, reply *data.PersonalInfo) error {
	var personalInfo data.PersonalInfo
	collection := mongoClient.Database("university").Collection("personalData")
	filter := bson.M{"cnp": payload}
	err := collection.FindOne(context.Background(), filter).Decode(&personalInfo)
	if err != nil {
		return err
	}
	*reply = personalInfo
	return nil
}

func (r *RPCServer) GetPersonalDataByFirstName(payload string, reply *[]data.PersonalInfo) error {
	var personalInfo []data.PersonalInfo
	collection := mongoClient.Database("university").Collection("personalData")
	filter := bson.M{"firstName": payload}
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return err
	}
	err = cursor.All(context.Background(), &personalInfo)
	if err != nil {
		return err
	}
	*reply = personalInfo
	return nil
}

func (r *RPCServer) AddPersonalData(payload data.PersonalInfo, reply *string) error {
	collection := mongoClient.Database("university").Collection("personalData")
	_, err := collection.InsertOne(context.Background(), payload)
	if err != nil {
		return err
	}
	*reply = "OK"
	return nil
}
