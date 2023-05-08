package main

import (
	"errors"
	"net/http"
	"net/rpc"

	"manouser.com/shared"
)

func handleSubmission(w http.ResponseWriter, r *http.Request) {
	var requestPayload requestPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	switch requestPayload.Action {
	case "addSchool":
		addSchool(w, requestPayload.SchoolEntry)
	default:
		shared.ErrorJSON(w, errors.New("unknown action"))
	}
}

func addSchool(w http.ResponseWriter, s schoolEntry) {
	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string

	err = client.Call("RPCServer.AddSchool", s, &reply)

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

func testGet(w http.ResponseWriter, r *http.Request) {
	var requestPayload requestPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	switch requestPayload.Action {
	case "getSchoolByName":
		getSchoolByName(w, requestPayload.Info)
	default:
		shared.ErrorJSON(w, errors.New("unknown action"))
	}
}

func getSchoolByName(w http.ResponseWriter, info string) {
	client, err := rpc.Dial("tcp", "school-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply schoolEntry

	err = client.Call("RPCServer.GetSchoolByName", info, &reply)

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
