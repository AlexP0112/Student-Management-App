package handlers

import (
	"back-end/dtos"
	"net/http"
	"net/rpc"

	"github.com/go-chi/chi/v5"
	"manouser.com/shared"
)

func AddGrade(w http.ResponseWriter, r *http.Request) {
	var payload dtos.AddGradePayload
	shared.ReadJSON(w, r, &payload)

	client, err := rpc.Dial("tcp", "grades-register-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.AddGradeToSubject", payload, &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}

func GetGradesByCNP(w http.ResponseWriter, r *http.Request) {
	cnp := chi.URLParam(r, "cnp")

	client, err := rpc.Dial("tcp", "grades-register-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply []dtos.StudentRegister
	err = client.Call("RPCServer.GetGradesByCNP", cnp, &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}

func AddGradeRegister(w http.ResponseWriter, r *http.Request) {
	var payload dtos.StudentRegister
	shared.ReadJSON(w, r, &payload)

	client, err := rpc.Dial("tcp", "grades-register-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.AddGradeRegister", payload, &reply)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	shared.WriteJSON(w, http.StatusOK, reply)
}
