package data

import (
	"context"
	"errors"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type SecretaryRequest struct {
	FromCNP string `bson:"fromCNP" json:"fromCNP"`

	Status string `bson:"status" json:"status"`

	Subject string `bson:"subject" json:"subject"`
	Message string `bson:"message" json:"message"`

	ID        string    `bson:"_id,omitempty" json:"id,omitempty"`
	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt" json:"updatedAt"`
}

var mongoClient *mongo.Client

func New(mongo *mongo.Client) {
	mongoClient = mongo
}

func InsertRequest(request SecretaryRequest) error {
	collection := mongoClient.Database("university").Collection("secretaryRequests")
	_, err := collection.InsertOne(context.TODO(), request)

	if err != nil {
		log.Println("Error inserting request in database")
		return err
	}

	return nil
}

func DeleteRequest(id string) error {
	collection := mongoClient.Database("university").Collection("secretaryRequests")

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error converting id to object id")
		return err
	}

	filter := bson.M{"_id": objectId}

	res, err := collection.DeleteOne(context.Background(), filter)

	if res.DeletedCount == 0 {
		return errors.New("didn't find the request id in the database")
	}

	if err != nil {
		log.Println("Error deleting request from database")
		return err
	}

	return nil
}

func UpdateRequest(id string, status string) error {
	collection := mongoClient.Database("university").Collection("secretaryRequests")

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error converting id to object id")
		return err
	}

	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println("Error updating request in database")
		return err
	}

	return nil
}

func GetRequestsByStatus(status string) ([]SecretaryRequest, error) {
	collection := mongoClient.Database("university").Collection("secretaryRequests")
	cursor, err := collection.Find(context.TODO(), map[string]string{
		"status": status,
	})

	if err != nil {
		log.Println("Error getting requests from database")
		return nil, err
	}

	var requests []SecretaryRequest
	if err = cursor.All(context.Background(), &requests); err != nil {
		log.Println("Error getting requests from database")
		return nil, err
	}

	return requests, nil
}

func GetRequestsByCNP(cnp string) ([]SecretaryRequest, error) {
	collection := mongoClient.Database("university").Collection("secretaryRequests")
	cursor, err := collection.Find(context.TODO(), map[string]string{
		"fromCNP": cnp,
	})

	if err != nil {
		log.Println("Error getting requests from database")
		return nil, err
	}

	var requests []SecretaryRequest
	if err = cursor.All(context.Background(), &requests); err != nil {
		log.Println("Error getting requests from database")
		return nil, err
	}

	return requests, nil
}

func GetRequestByID(id string) (SecretaryRequest, error) {
	collection := mongoClient.Database("university").Collection("secretaryRequests")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error converting id to object id")
		return SecretaryRequest{}, err
	}

	filter := bson.M{"_id": objectId}

	var request SecretaryRequest
	err = collection.FindOne(context.Background(), filter).Decode(&request)

	if err != nil {
		log.Println("Error getting request from database")
		return SecretaryRequest{}, err
	}

	return request, nil
}
