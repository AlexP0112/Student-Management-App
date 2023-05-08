package main

import (
	"net/http"
)

type JSONPayload struct {
	Name string `json:"name"`
	Data string `json:"data"`
}

func (app *Config) WriteLog(w http.ResponseWriter, r *http.Request) {

	resp := jsonResponse{
		Error:   false,
		Message: "Random stuff",
	}

	app.writeJSON(w, http.StatusAccepted, resp)
}