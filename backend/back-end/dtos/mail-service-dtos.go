package dtos

type SecretaryRequest struct {
	FromCNP string `json:"fromCNP"`

	Status string `json:"status"`

	Subject string `json:"subject"`
	Message string `json:"message"`
}

type RPCUpdateRequestPayload struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}

type RPCRequestsPayload struct {
	Requests []SecretaryRequest `json:"secretaryRequests"`
}
