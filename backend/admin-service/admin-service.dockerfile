FROM alpine:latest

RUN mkdir /app

COPY adminServiceApp /app

CMD ["/app/adminServiceApp"]