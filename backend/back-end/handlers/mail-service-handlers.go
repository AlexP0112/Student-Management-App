package handlers

import (
	"back-end/dtos"
	"net/http"
	"net/rpc"

	"github.com/go-chi/chi/v5"
	"manouser.com/shared"
)

func AddSecretaryRequest(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.SecretaryRequest

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "mail-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string

	err = client.Call("RPCServer.AddRequest", requestPayload, &reply)

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

func DeleteSecretaryRequest(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "mail-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string
	id := chi.URLParam(r, "id")

	err = client.Call("RPCServer.DeleteRequest", id, &reply)

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

func UpdateSecretaryRequest(w http.ResponseWriter, r *http.Request) {
	var requestPayload dtos.RPCUpdateRequestPayload

	err := shared.ReadJSON(w, r, &requestPayload)
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	client, err := rpc.Dial("tcp", "mail-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply string

	err = client.Call("RPCServer.UpdateRequest", requestPayload, &reply)

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

func GetSecretaryRequestsByStatus(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "mail-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply dtos.RPCRequestsPayload
	status := chi.URLParam(r, "status")

	err = client.Call("RPCServer.GetRequestsByStatus", status, &reply)

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

func GetSecretaryRequestsByCNP(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "mail-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply dtos.RPCRequestsPayload
	cnp := chi.URLParam(r, "cnp")

	err = client.Call("RPCServer.GetRequestsByCNP", cnp, &reply)

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

func GetSecretaryRequestByID(w http.ResponseWriter, r *http.Request) {
	client, err := rpc.Dial("tcp", "mail-service:5001")
	if err != nil {
		shared.ErrorJSON(w, err)
		return
	}

	var reply dtos.SecretaryRequest
	id := chi.URLParam(r, "id")

	err = client.Call("RPCServer.GetRequestByID", id, &reply)

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
