package main

import (
	"fmt"
	"log"
	"net/http"
)

const webPort = "80"

func main() {

	log.Printf("Starting back-end server on port %s", webPort)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", webPort),
		Handler: routes(),
	}

	err := srv.ListenAndServe()
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
