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
	shared.ReadBody(r, &payload)

	client, err := rpc.Dial("tcp", "grade-register-service:5001")
	if err != nil {
		shared.SendError(w, err)
		return
	}

	var reply string
	err = client.Call("RPCServer.addGradeToSubject", payload, &reply)
	if err != nil {
		shared.SendError(w, err)
		return
	}

	shared.SendResponse(w, reply)
}

func GetGradesByCNP(w http.ResponseWriter, r *http.Request) {
	cnp := chi.URLParam(r, "cnp")

	client, err := rpc.Dial("tcp", "grade-register-service:5001")
	if err != nil {
		shared.SendError(w, err)
		return
	}

	var reply []dtos.StudentRegister
	err = client.Call("RPCServer.getGradesByCNP", cnp, &reply)
	if err != nil {
		shared.SendError(w, err)
		return
	}

	shared.SendResponse(w, reply)
}