package main

import (
	"errors"
	"net/http"
	"net/rpc"
)

type RequestPayload struct {
	Action       string       `json:"action"`
	AdminPayload adminPayload `json:"adminPayload,omitempty"`
}

type adminPayload struct {
	University string `json:"university"`
	Faculty    string `json:"faculty"`
	Department string `json:"department"`
}

func (app *Config) handleSubmission(w http.ResponseWriter, r *http.Request) {
	var requestPayload RequestPayload

	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	switch requestPayload.Action {
	case "admin":
		app.sendToAdmin(w, requestPayload.AdminPayload)
	default:
		app.errorJSON(w, errors.New("unknown action"))
	}
}

func (app *Config) sendToAdmin(w http.ResponseWriter, a adminPayload) {
	client, err := rpc.Dial("tcp", "admin-service:5001")
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	var reply string

	err = client.Call("RPCServer.LogInfo", a, &reply)

	if err != nil {
		app.errorJSON(w, err)
		return
	}

	payload := jsonResponse{
		Error:   false,
		Message: reply,
	}

	app.writeJSON(w, http.StatusOK, payload)
}
