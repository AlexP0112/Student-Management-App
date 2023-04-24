package data

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

type Models struct {
	School SchoolEntry
}

type SchoolEntry struct {
	University string    `bson:"university,omitempty" json:"university,omitempty"`
	Faculty    string    `bson:"faculty,omitempty" json:"faculty,omitempty"`
	Department string    `bson:"department,omitempty" json:"department,omitempty"`
	CreatedAt  time.Time `bson:"created_at,omitempty" json:"created_at,omitempty"`
	UpdatedAt  time.Time `bson:"updated_at,omitempty" json:"updated_at,omitempty"`
}

var mongoClient *mongo.Client

func New(mongo *mongo.Client) Models {
	mongoClient = mongo
	return Models{
		School: SchoolEntry{},
	}
}

func (m *Models) InsertSchool(school SchoolEntry) error {
	collection := mongoClient.Database("test").Collection("test")
	_, err := collection.InsertOne(context.TODO(), school)

	if err != nil {
		return err
	}

	return nil
}
