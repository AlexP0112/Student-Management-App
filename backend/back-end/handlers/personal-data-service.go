package handlers

import (
	"back-end/dtos"
	"net/http"
	"net/rpc"

	"github.com/go-chi/chi/v5"
	"manouser.com/shared"
)

func GetPersonalDataByCNP(w http.ResponseWriter, r *http.Request) {
	cnp := chi.URLParam(r, "cnp")

	client, err := rpc.Dial("tcp", "personal-data-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply dtos.PersonalInfo
	err = client.Call("RPCServer.GetPersonalDataByCNP", cnp, &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}

func GetPersonalDataByFirstName(w http.ResponseWriter, r *http.Request) {
	firstName := chi.URLParam(r, "firstName")

	client, err := rpc.Dial("tcp", "personal-data-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply []dtos.PersonalInfo
	err = client.Call("RPCServer.GetPersonalDataByFirstName", firstName, &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}

func GetAllPersonalData(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "personal-data-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply []dtos.PersonalInfo
	err = client.Call("RPCServer.GetAllPersonalData", "", &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}

func AddPersonalData(w http.ResponseWriter, r *http.Request) {
	var payload dtos.PersonalInfo
	shared.ReadJSON(w, r, &payload)

	client, err := rpc.Dial("tcp", "personal-data-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.AddPersonalData", payload, &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}
