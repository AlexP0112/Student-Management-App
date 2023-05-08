package main

import (
	"admin-service/data"
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/rpc"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	webPort  = "80"
	rpcPort  = "5001"
	mongoURL = "mongodb://mongo:27017"
)

type Config struct {
	Models data.Models
}

var mongoClient *mongo.Client

func main() {
	client, err := connectToMongo()
	if err != nil {
		log.Panic(err)
	}
	mongoClient = client

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	defer func() {
		if err = mongoClient.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	app := Config{
		Models: data.New(mongoClient),
	}

	err = rpc.Register(new(RPCServer))
	go app.rpcListen()

	log.Printf("Starting admin server on port %s", webPort)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", webPort),
		Handler: app.routes(),
	}

	err = srv.ListenAndServe()
	if err != nil {
		log.Panic()
	}
}

func connectToMongo() (*mongo.Client, error) {
	clientOptions := options.Client().ApplyURI(mongoURL)
	clientOptions.SetAuth(options.Credential{
		Username: "admin",
		Password: "password",
	})

	c, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Println("Error connecting to mongo", err)
		return nil, err
	}

	return c, nil
}

func (app *Config) rpcListen() error {

	log.Println("Starting RPC server on port", rpcPort)
	listen, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%s", rpcPort))
	if err != nil {
		log.Printf("Error listening on port %s: %s", rpcPort, err)
		return err
	}
	defer listen.Close()

	for {
		rpcConn, err := listen.Accept()
		if err != nil {
			continue
		}

		go rpc.ServeConn(rpcConn)
	}
}