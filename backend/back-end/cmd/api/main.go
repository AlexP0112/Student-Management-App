package main

import (
	"fmt"
	"log"
	"net/http"
)

const webPort = "80"

// Basic receiver type for all the functions, maybe not needed?
type Config struct{}

func main() {
	app := Config{}

	log.Printf("Starting back-end server on port %s", webPort)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", webPort),
		Handler: app.routes(),
	}

	err := srv.ListenAndServe()
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
