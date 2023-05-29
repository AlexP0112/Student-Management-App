package main

import (
	"context"
	"log"
	"mail-service/data"
	"net/rpc"
	"time"

	"go.mongodb.org/mongo-driver/mongo"

	"manouser.com/shared"
)

const (
	webPort  = "80"
	rpcPort  = "5001"
	mongoURL = "mongodb://mongo-mail-service:27021"
)

var mongoClient *mongo.Client

func main() {
	client, err := shared.ConnectToMongo(mongoURL)
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

	data.New(mongoClient)

	err = rpc.Register(new(RPCServer))
	go shared.RPCListen(rpcPort)

	shared.HttpServerListen(webPort, routes)
}
