package main

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"personal-data-service/data"
)

type RPCServer struct{}

type RPCPayload struct {
}

func (r *RPCServer) getAllPersonalData(reply *[]data.PersonalInfo) error {
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

func (r *RPCServer) getPersonalDataByCNP(payload string, reply *data.PersonalInfo) error {
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

func (r *RPCServer) getPersonalDataByFirstName(payload string, reply *[]data.PersonalInfo) error {
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

func (r *RPCServer) addPersonalData(payload data.PersonalInfo, reply *string) error {
	collection := mongoClient.Database("university").Collection("personalData")
	_, err := collection.InsertOne(context.Background(), payload)
	if err != nil {
		return err
	}
	*reply = "OK"
	return nil
}
