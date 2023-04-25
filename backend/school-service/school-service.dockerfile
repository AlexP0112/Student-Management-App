FROM alpine:latest

RUN mkdir /app

COPY schoolServiceApp /app

CMD ["/app/schoolServiceApp"]