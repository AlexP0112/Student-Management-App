package main

import (
	"log"
	"mail-service/data"
	"time"
)

type RPCServer struct{}

func (r *RPCServer) AddRequest(payload SecretaryRequest, reply *string) error {
	err := data.InsertRequest(data.SecretaryRequest{
		FromCNP:   payload.FromCNP,
		Status:    payload.Status,
		Subject:   payload.Subject,
		Message:   payload.Message,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	})

	if err != nil {
		log.Println("Error inserting request")
		return err
	}

	*reply = "Success logging info to database"

	return nil
}

func (r *RPCServer) DeleteRequest(payload string, reply *string) error {
	err := data.DeleteRequest(payload)
	if err != nil {
		log.Println("Error deleting request")
		return err
	}

	*reply = "Success deleting info from database"

	return nil
}

func (r *RPCServer) UpdateRequest(payload RPCUpdateRequestPayload, reply *string) error {
	err := data.UpdateRequest(payload.ID, payload.Status)
	if err != nil {
		log.Println("Error updating request")
		return err
	}

	*reply = "Success updating info in database"

	return nil
}

func (r *RPCServer) GetRequestsByStatus(payload string, reply *RPCRequestsPayload) error {
	requests, err := data.GetRequestsByStatus(payload)
	if err != nil {
		log.Println("Error getting requests by status")
		return err
	}

	myRequests := []SecretaryRequest{}

	for _, request := range requests {
		myRequests = append(myRequests, SecretaryRequest{
			FromCNP: request.FromCNP,
			Status:  request.Status,
			Subject: request.Subject,
			Message: request.Message,
		})
	}

	*reply = RPCRequestsPayload{
		Requests: myRequests,
	}

	return nil
}

func (r *RPCServer) GetRequestsByCNP(payload string, reply *RPCRequestsPayload) error {
	requests, err := data.GetRequestsByCNP(payload)
	if err != nil {
		log.Println("Error getting requests by CNP")
		return err
	}

	myRequests := []SecretaryRequest{}

	for _, request := range requests {
		myRequests = append(myRequests, SecretaryRequest{
			FromCNP: request.FromCNP,
			Status:  request.Status,
			Subject: request.Subject,
			Message: request.Message,
		})
	}

	*reply = RPCRequestsPayload{
		Requests: myRequests,
	}

	return nil
}

func (r *RPCServer) GetRequestByID(payload string, reply *SecretaryRequest) error {
	request, err := data.GetRequestByID(payload)
	if err != nil {
		log.Println("Error getting request by ID")
		return err
	}

	*reply = SecretaryRequest{
		FromCNP: request.FromCNP,
		Status:  request.Status,
		Subject: request.Subject,
		Message: request.Message,
	}

	return nil
}
