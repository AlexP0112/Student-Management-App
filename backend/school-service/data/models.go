package data

import (
	"context"
	"errors"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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

func InsertSchool(school SchoolEntry) error {
	collection := mongoClient.Database("university").Collection("schools")
	_, err := collection.InsertOne(context.TODO(), school)

	if err != nil {
		log.Println("Error inserting school entry")
		return err
	}

	return nil
}

func GetSchoolByName(schoolName string) (SchoolEntry, error) {
	var school SchoolEntry
	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName}
	err := collection.FindOne(context.Background(), filter).Decode(&school)

	if err != nil {
		return SchoolEntry{}, err
	}

	return school, nil
}

func InsertDepartments(schoolName string, departments []Department) error {
	school, err := GetSchoolByName(schoolName)

	if err != nil {
		log.Println("Error getting school by name in insert departments")
		return err
	}

	currentDepartments := school.Departments
	currentDepartments = append(currentDepartments, departments...)

	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName}
	update := bson.M{"$set": bson.M{"departments": currentDepartments, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error inserting departments")
		return err
	}

	return nil
}

func DeleteDepartments(schoolName string, departmentsNames []string) error {
	school, err := GetSchoolByName(schoolName)

	if err != nil {
		log.Println("Error getting school by name in delete departments")
		return err
	}

	currentDepartments := school.Departments

	for _, departmentName := range departmentsNames {
		for i, department := range currentDepartments {
			if department.Name == departmentName {
				currentDepartments = append(currentDepartments[:i], currentDepartments[i+1:]...)
			}
		}
	}

	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName}
	update := bson.M{"$set": bson.M{"departments": currentDepartments, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error deleting departments")
		return err
	}

	return nil
}

func GetDepartmentByName(schoolName string, departmentName string) (Department, error) {
	school, err := GetSchoolByName(schoolName)

	if err != nil {
		log.Println("Error getting school by name in get department by name")
		return Department{}, err
	}

	for _, department := range school.Departments {
		if department.Name == departmentName {
			return department, nil
		}
	}

	return Department{}, nil
}

func ChangeDepartmentName(schoolName string, formerDepartmentName string, newDepartmentName string) error {
	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName, "departments.name": formerDepartmentName}
	update := bson.M{"$set": bson.M{"departments.$.name": newDepartmentName, "updatedAt": time.Now()}}

	_, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error changing department name")
		return err
	}

	return nil
}

func InsertTeachers(schoolName string, departmentName string, teachers []string) error {
	department, err := GetDepartmentByName(schoolName, departmentName)

	if err != nil {
		log.Println("Error getting department by name in insert teachers")
		return err
	}

	currentTeachers := department.Teachers
	currentTeachers = append(currentTeachers, teachers...)

	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName, "departments.name": departmentName}
	update := bson.M{"$set": bson.M{"departments.$.teachers": currentTeachers, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error inserting teachers")
		return err
	}

	return nil
}

func DeleteTeachers(schoolName string, departmentName string, teachers []string) error {
	department, err := GetDepartmentByName(schoolName, departmentName)

	if err != nil {
		log.Println("Error getting department by name in delete teachers")
		return err
	}

	currentTeachers := department.Teachers

	for _, teacher := range teachers {
		for i, currentTeacher := range currentTeachers {
			if currentTeacher == teacher {
				currentTeachers = append(currentTeachers[:i], currentTeachers[i+1:]...)
			}
		}
	}

	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName, "departments.name": departmentName}
	update := bson.M{"$set": bson.M{"departments.$.teachers": currentTeachers, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error deleting teachers")
		return err
	}

	return nil
}

func InsertYearsOfStudy(schoolName string, departmentName string, yearsOfStudy []YearOfStudy) error {
	department, err := GetDepartmentByName(schoolName, departmentName)

	if err != nil {
		log.Println("Error getting department by name in insert years of study")
		return err
	}

	currentYearsOfStudy := department.YearsOfStudy
	currentYearsOfStudy = append(currentYearsOfStudy, yearsOfStudy...)

	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName, "departments.name": departmentName}
	update := bson.M{"$set": bson.M{"departments.$.yearsOfStudy": currentYearsOfStudy, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error inserting years of study")
		return err
	}

	return nil
}

func DeleteYearsOfStudy(schoolName string, departmentName string, typesOfYearsOfStudy []string, yearsOfStudy []int) error {
	if len(typesOfYearsOfStudy) != len(yearsOfStudy) {
		log.Println("Error deleting years of study")
		return errors.New("types of years of study and years of study must have the same length")
	}

	department, err := GetDepartmentByName(schoolName, departmentName)

	if err != nil {
		log.Println("Error getting department by name in delete years of study")
		return err
	}

	currentYearsOfStudy := department.YearsOfStudy

	for i, yearOfStudy := range yearsOfStudy {
		for j, currentYearOfStudy := range currentYearsOfStudy {
			if currentYearOfStudy.Year == yearOfStudy && currentYearOfStudy.Type == typesOfYearsOfStudy[i] {
				currentYearsOfStudy = append(currentYearsOfStudy[:j], currentYearsOfStudy[j+1:]...)
			}
		}
	}

	collection := mongoClient.Database("university").Collection("schools")
	filter := bson.M{"name": schoolName, "departments.name": departmentName}
	update := bson.M{"$set": bson.M{"departments.$.yearsOfStudy": currentYearsOfStudy, "updatedAt": time.Now()}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error deleting years of study")
		return err
	}

	return nil
}

func GetYearsOfStudy(schoolName string, departmentName string) ([]YearOfStudy, error) {
	department, err := GetDepartmentByName(schoolName, departmentName)

	if err != nil {
		log.Println("Error getting department by name in get years of study")
		return nil, err
	}

	return department.YearsOfStudy, nil
}

func GetYear(schoolName string, departmentName string, yearOfStudyType string, year int) (YearOfStudy, error) {
	department, err := GetDepartmentByName(schoolName, departmentName)

	if err != nil {
		log.Println("Error getting department by name in get year")
		return YearOfStudy{}, err
	}

	for _, yearOfStudy := range department.YearsOfStudy {
		if yearOfStudy.Type == yearOfStudyType && yearOfStudy.Year == year {
			return yearOfStudy, nil
		}
	}

	return YearOfStudy{}, nil
}

func InsertSubjects(schoolName string, departmentName string, yearOfStudyType string, yearOfStudy int, subjects []string) error {
	year, err := GetYear(schoolName, departmentName, yearOfStudyType, yearOfStudy)
	if err != nil {
		log.Println("Error getting department by name in insert courses")
		return err
	}

	currentSubjects := year.Subjects
	currentSubjects = append(currentSubjects, subjects...)

	collection := mongoClient.Database("university").Collection("schools")

	filter := bson.M{
		"name":             schoolName,
		"departments.name": departmentName,
		"departments.yearsOfStudy": bson.M{
			"$elemMatch": bson.M{
				"type": yearOfStudyType,
				"year": yearOfStudy,
			},
		},
	}

	update := bson.M{
		"$set": bson.M{
			"departments.$[dep].yearsOfStudy.$[year].subjects": currentSubjects,
			"updatedAt": time.Now(),
		},
	}

	arrayFilters := []interface{}{
		bson.M{"dep.name": departmentName},
		bson.M{"year.type": yearOfStudyType, "year.year": yearOfStudy},
	}

	opts := options.Update().SetArrayFilters(options.ArrayFilters{Filters: arrayFilters})

	_, err = collection.UpdateOne(context.Background(), filter, update, opts)

	if err != nil {
		log.Println("Error inserting subjects")
		return err
	}

	return nil
}

func DeleteSubjects(schoolName string, departmentName string, yearOfStudyType string, yearOfStudy int, subjects []string) error {
	year, err := GetYear(schoolName, departmentName, yearOfStudyType, yearOfStudy)
	if err != nil {
		log.Println("Error getting department by name in delete subjects")
		return err
	}

	currentSubjects := year.Subjects

	for _, subject := range subjects {
		for i, currentSubject := range currentSubjects {
			if currentSubject == subject {
				currentSubjects = append(currentSubjects[:i], currentSubjects[i+1:]...)
			}
		}
	}

	collection := mongoClient.Database("university").Collection("schools")

	filter := bson.M{
		"name":             schoolName,
		"departments.name": departmentName,
		"departments.yearsOfStudy": bson.M{
			"$elemMatch": bson.M{
				"type": yearOfStudyType,
				"year": yearOfStudy,
			},
		},
	}

	update := bson.M{
		"$set": bson.M{
			"departments.$[dep].yearsOfStudy.$[year].subjects": currentSubjects,
			"updatedAt": time.Now(),
		},
	}

	arrayFilters := []interface{}{
		bson.M{"dep.name": departmentName},
		bson.M{"year.type": yearOfStudyType, "year.year": yearOfStudy},
	}

	opts := options.Update().SetArrayFilters(options.ArrayFilters{Filters: arrayFilters})

	_, err = collection.UpdateOne(context.Background(), filter, update, opts)

	if err != nil {
		log.Println("Error deleting subjects")
		return err
	}

	return nil
}

func ChangeNumberOfSerieses(schoolName string, departmentName string, yearOfStudyType string, yearOfStudy int, numberOfSerieses int) error {
	collection := mongoClient.Database("university").Collection("schools")

	filter := bson.M{
		"name":             schoolName,
		"departments.name": departmentName,
		"departments.yearsOfStudy": bson.M{
			"$elemMatch": bson.M{
				"type": yearOfStudyType,
				"year": yearOfStudy,
			},
		},
	}

	update := bson.M{
		"$set": bson.M{
			"departments.$[dep].yearsOfStudy.$[year].numberOfSerieses": numberOfSerieses,
			"updatedAt": time.Now(),
		},
	}

	arrayFilters := []interface{}{
		bson.M{"dep.name": departmentName},
		bson.M{"year.type": yearOfStudyType, "year.year": yearOfStudy},
	}

	opts := options.Update().SetArrayFilters(options.ArrayFilters{Filters: arrayFilters})
	_, err := collection.UpdateOne(context.Background(), filter, update, opts)

	if err != nil {
		log.Println("Error changing number of serieses")
		return err
	}

	return nil
}

func ChangeNumberOfGroups(schoolName string, departmentName string, yearOfStudyType string, yearOfStudy int, numberOfGroups int) error {
	collection := mongoClient.Database("university").Collection("schools")

	filter := bson.M{
		"name":             schoolName,
		"departments.name": departmentName,
		"departments.yearsOfStudy": bson.M{
			"$elemMatch": bson.M{
				"type": yearOfStudyType,
				"year": yearOfStudy,
			},
		},
	}

	update := bson.M{
		"$set": bson.M{
			"departments.$[dep].yearsOfStudy.$[year].numberOfGroups": numberOfGroups,
			"updatedAt": time.Now(),
		},
	}

	arrayFilters := []interface{}{
		bson.M{"dep.name": departmentName},
		bson.M{"year.type": yearOfStudyType, "year.year": yearOfStudy},
	}

	opts := options.Update().SetArrayFilters(options.ArrayFilters{Filters: arrayFilters})
	_, err := collection.UpdateOne(context.Background(), filter, update, opts)

	if err != nil {
		log.Println("Error changing number of groups")
		return err
	}

	return nil
}
