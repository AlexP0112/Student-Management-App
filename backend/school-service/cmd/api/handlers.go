package main

import (
	"net/http"

	"manouser.com/shared"
)

type JSONPayload struct {
	Name string `json:"name"`
	Data string `json:"data"`
}

func WriteLog(w http.ResponseWriter, r *http.Request) {

	resp := shared.JsonResponse{
		Error:   false,
		Message: "Random stuff",
	}

	shared.WriteJSON(w, http.StatusAccepted, resp)
}
