SHELL=cmd.exe
FRONT_END_BINARY=frontendApp.exe
BACK_END_BINARY=backendApp
SCHOOL_BINARY=schoolServiceApp
PERSONAL_DATA_BINARY=personalDataServiceApp
GRADES_REGISTER_BINARY=gradesRegisterServiceApp

## up: starts all containers in the background without forcing build
up:
	@echo Starting Docker images...
	docker-compose up -d
	@echo Docker images started!

## up_build: stops docker-compose (if running), builds all projects and starts docker compose
up_build: build_back_end build_school_service build_personal_data_service build_grades_register_service
	@echo Stopping docker images (if running...)
	docker-compose down
	@echo Building (when required) and starting docker images...
	docker-compose up --build -d
	@echo Docker images built and started!

## down: stop docker compose
down:
	@echo Stopping docker compose...
	docker-compose down
	@echo Done!

## build_back_end: builds the back-end binary as a linux executable
build_back_end:
	@echo Building back-end binary...
	chdir ..\back-end && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0 && go build -o ${BACK_END_BINARY} ./cmd/api
	@echo Done!

## build_school_service: builds the school service binary as a linux executable
build_school_service:
	@echo Building school service binary...
	chdir ..\school-service && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0 && go build -o ${SCHOOL_BINARY} ./cmd/api
	@echo Done!	

## build_personal_data_service: builds the personal data service binary as a linux executable
build_personal_data_service:
	@echo Building personal data service binary...
	chdir ..\personal-data-service && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0 && go build -o ${PERSONAL_DATA_BINARY} ./cmd/api
	@echo Done!

## build_grades_register_service: builds the grades register service binary as a linux executable
build_grades_register_service:
	@echo Building grades register service binary...
	chdir ..\grades-register-service && set GOOS=linux&& set GOARCH=amd64&& set CGO_ENABLED=0 && go build -o ${GRADES_REGISTER_BINARY} ./cmd/api
	@echo Done!

## build_front: builds the front end binary
build_front:
	@echo Building front end binary...
	chdir ..\mock-front-end && set CGO_ENABLED=0&& set GOOS=windows&& go build -o ${FRONT_END_BINARY} ./cmd/web
	@echo Done!

## start: starts the front end
start: build_front
	@echo Starting front end
	chdir ..\mock-front-end && start /B ${FRONT_END_BINARY} &

## stop_frontend: stops the front end
stop_frontend:
	@echo Stopping front end...
	@taskkill /IM "${FRONT_END_BINARY}" /F
	@echo "Stopped front end!"

## clean
clean:
	@echo Cleaning up...
	chdir ..\mock-front-end && del ${FRONT_END_BINARY}
	chdir ..\back-end && del ${BACK_END_BINARY}
	chdir ..\school-service && del ${SCHOOL_BINARY}
	chdir ..\personal-data-service && del ${PERSONAL_DATA_BINARY}
	chdir ..\grades-register-service && del ${GRADES_REGISTER_BINARY}
	@echo Done!
