package main

import (
	"manouser.com/shared"
)

const webPort = "80"

func main() {
	shared.HttpServerListen(webPort, routes)
}
