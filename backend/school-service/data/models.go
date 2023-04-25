package data

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Models struct {
	School SchoolEntry
}

type SchoolEntry struct {
	Name        string       `bson:"name" json:"name"`
	Departments []Department `bson:"departments" json:"departments"`
	CreatedAt   time.Time    `bson:"createdAt" json:"createdAt"`
	UpdatedAt   time.Time    `bson:"updatedAt" json:"updatedAt"`
}

type Department struct {
	Name         string        `bson:"name" json:"name"`
	Teachers     []string      `bson:"teachers" json:"teachers"`
	YearsOfStudy []YearOfStudy `bason:"yearsOfStudy" json:"yearsOfStudy"`
}

type YearOfStudy struct {
	Type             string   `bson:"type" json:"type"` // bachelor, master, phd
	Year             int      `bson:"year" json:"year"`
	NumberOfSerieses int      `bson:"numberOfSerieses" json:"numberOfSerieses"`
	NumberOfGroups   int      `bson:"numberOfGroups" json:"numberOfGroups"`
	Subjects         []string `bson:"subjects" json:"subjects"`
}

var mongoClient *mongo.Client

func New(mongo *mongo.Client) {
	mongoClient = mongo
}

// func New(mongo *mongo.Client) Models {
// 	mongoClient = mongo
// 	return Models{
// 		School: SchoolEntry{},
// 	}
// }

func InsertSchool(school SchoolEntry) error {
	collection := mongoClient.Database("university").Collection("schools")
	_, err := collection.InsertOne(context.TODO(), school)

	if err != nil {
		return err
	}

	return nil
}

func GetSchoolByName(name string) (SchoolEntry, error) {
	var school SchoolEntry
	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": name}
	err := collection.FindOne(context.Background(), filter).Decode(&school)

	if err != nil {
		return SchoolEntry{}, err
	}

	return school, nil
}
