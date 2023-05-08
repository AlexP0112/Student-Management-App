package data

import "go.mongodb.org/mongo-driver/mongo"

type PersonalInfo struct {
	CNP string `bson:"cnp" json:"cnp"`

	Type string `bson:"type" json:"type"` // student, teacher, admin

	FirstName string `bson:"firstName" json:"firstName"`
	LastName  string `bson:"lastName" json:"lastName"`

	School      string `bson:"school" json:"school"`
	Department  string `bson:"department" json:"department"`
	YearOfStudy string `bson:"yearOfStudy" json:"yearOfStudy"` // bachelor 1 for example

	Email string `bson:"email" json:"email"`
	Phone string `bson:"phone" json:"phone"`

	// DOB / Citizenship / Place of birth etc.
}

var mongoClient *mongo.Client

func New(mongo *mongo.Client) {
	mongoClient = mongo
}
