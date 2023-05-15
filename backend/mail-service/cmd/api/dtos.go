package main

type SecretaryRequest struct {
	FromCNP string

	Status string

	Subject string
	Message string
}

type RPCUpdateRequestPayload struct {
	ID     string
	Status string
}

type RPCRequestsPayload struct {
	Requests []SecretaryRequest
}
