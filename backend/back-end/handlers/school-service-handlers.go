package handlers

import (
	"net/http"
	"net/rpc"

	"back-end/dtos"

	"github.com/go-chi/chi/v5"
	"manouser.com/shared"
)

func AddSchool(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.SchoolEntry

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string

	err = client.Call("RPCServer.AddSchool", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func GetSchoolByName(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply dtos.SchoolEntry
	name := chi.URLParam(r, "name")

	err = client.Call("RPCServer.GetSchoolByName", name, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: "success",
		Data:    reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func AddDepartments(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCAddDepartmentsPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.AddDepartments", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func DeleteDepartments(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCDeleteDepartmentsPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.DeleteDepartments", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func ChangeDepartmentName(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCChangeNamePayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.ChangeDepartmentName", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func InsertTeachers(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCTeachersPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.InsertTeachers", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func DeleteTeachers(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCTeachersPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.DeleteTeachers", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func InsertYearsOfStudy(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCInsertYearsOfStudyPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.InsertYearsOfStudy", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func DeleteYearsOfStudy(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCDeleteYearsOfStudyPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.DeleteYearsOfStudy", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func InsertSubjects(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCSubjectsPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.InsertSubjects", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func DeleteSubjects(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCSubjectsPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.DeleteSubjects", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func ChangeNumberOfSerieses(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCChangeNumberOfPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.ChangeNumberOfSerieses", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}

func ChangeNumberOfGroups(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCChangeNumberOfPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.ChangeNumberOfGroups", requestPayload, &reply)

	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	payload := shared.JsonResponse{
		Error:   false,
		Message: reply,
	}

	shared.WriteJSON(w, http.StatusOK, payload)
}
