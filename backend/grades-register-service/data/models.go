package data

import "go.mongodb.org/mongo-driver/mongo"

type StudentRegister struct {
	CNP string `bson:"cnp" json:"cnp"`

	History []History `bson:"history" json:"history"`
}

type History struct {
	Year           int                `bson:"year" json:"year"` // might need to change to string
	Subjects       map[string]float32 `bson:"subjects" json:"subjects"`
	GeneralAverage float32            `bson:"generalAverage" json:"generalAverage"`
}

type AddGradePayload struct {
	CNP     string  `bson:"cnp" json:"cnp"`
	Subject string  `bson:"subject" json:"subject"`
	Grade   float32 `bson:"grade" json:"grade"`
	Year    int     `bson:"year" json:"year"`
}

var mongoClient *mongo.Client

func New(mongo *mongo.Client) {
	mongoClient = mongo
}
