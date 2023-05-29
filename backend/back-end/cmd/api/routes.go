package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"back-end/handlers"
)

func routes() http.Handler {
	mux := chi.NewRouter()

	// These might need changes based on the evolvement of the API
	mux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://&", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	mux.Use(middleware.Heartbeat("/ping"))

	// School Service routes
	mux.Post("/addSchool", handlers.AddSchool)
	mux.Post("/addDepartments", handlers.AddDepartments)
	mux.Post("/deleteDepartments", handlers.DeleteDepartments)
	mux.Post("/changeDepartmentName", handlers.ChangeDepartmentName)
	mux.Post("/insertTeachers", handlers.InsertTeachers)
	mux.Post("/deleteTeachers", handlers.DeleteTeachers)
	mux.Post("/insertYearsOfStudy", handlers.InsertYearsOfStudy)
	mux.Post("/deleteYearsOfStudy", handlers.DeleteYearsOfStudy)
	mux.Post("/insertSubjects", handlers.InsertSubjects)
	mux.Post("/deleteSubjects", handlers.DeleteSubjects)
	mux.Post("/changeNumberOfSerieses", handlers.ChangeNumberOfSerieses)
	mux.Post("/changeNumberOfGroups", handlers.ChangeNumberOfGroups)

	mux.Get("/getSchool/{name}", handlers.GetSchoolByName)
	// ^ one get for the entire school, maybe more specific would make sense

	// Mail Service routes
	mux.Post("/addSecretaryRequest", handlers.AddSecretaryRequest)
	mux.Post("/deleteSecretaryRequest/{id}", handlers.DeleteSecretaryRequest)
	mux.Post("/updateSecretaryRequest", handlers.UpdateSecretaryRequest)

	mux.Get("/getSecretaryRequestsByStatus/{status}", handlers.GetSecretaryRequestsByStatus)
	mux.Get("/getSecretaryRequestsByCNP/{cnp}", handlers.GetSecretaryRequestsByCNP)
	mux.Get("/getSecretaryRequestByID/{id}", handlers.GetSecretaryRequestByID)

	// Grades Register Service routes
	mux.Post("/addGrade", handlers.AddGrade)
	mux.Get("/getGradesByCNP/{cnp}", handlers.GetGradesByCNP)

	// Personal Data Service routes
	mux.Get("/getPersonalDataByCNP/{cnp}", handlers.GetPersonalDataByCNP)
	mux.Post("/addPersonalData", handlers.AddPersonalData)

	return mux
}
