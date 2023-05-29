package handlers

import (
	"back-end/dtos"
	"net/http"
	"net/rpc"

	"github.com/go-chi/chi/v5"
	"manouser.com/shared"
)

func getPersonalDataByCNP(w http.ResponseWriter, r *http.Request) {
	cnp := chi.URLParam(r, "cnp")

	client, err := rpc.Dial("tcp", "personal-data-service:5002")
	if err != nil {
		shared.SendError(w, err)
		return
	}

	var reply dtos.PersonalInfo
	err = client.Call("RPCServer.getPersonalDataByCNP", cnp, &reply)
	if err != nil {
		shared.SendError(w, err)
		return
	}

	shared.SendResponse(w, reply)
}

func getPersonalDataByFirstName(w http.ResponseWriter, r *http.Request) {
	firstName := chi.URLParam(r, "firstName")

	client, err := rpc.Dial("tcp", "personal-data-service:5002")
	if err != nil {
		shared.SendError(w, err)
		return
	}

	var reply []dtos.PersonalInfo
	err = client.Call("RPCServer.getPersonalDataByFirstName", firstName, &reply)
	if err != nil {
		shared.SendError(w, err)
		return
	}

	shared.SendResponse(w, reply)
}

func getAllPersonalData(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "personal-data-service:5002")
	if err != nil {
		shared.SendError(w, err)
		return
	}

	var reply []dtos.PersonalInfo
	err = client.Call("RPCServer.getAllPersonalData", "", &reply)
	if err != nil {
		shared.SendError(w, err)
		return
	}

	shared.SendResponse(w, reply)
}

func addPersonalData(w http.ResponseWriter, r *http.Request) {
	var payload dtos.PersonalInfo
	shared.ReadBody(r, &payload)

	client, err := rpc.Dial("tcp", "personal-data-service:5002")
	if err != nil {
		shared.SendError(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.addPersonalData", payload, &reply)
	if err != nil {
		shared.SendError(w, err)
		return
	}

	shared.SendResponse(w, reply)
}