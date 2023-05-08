FROM alpine:latest

RUN mkdir /app

COPY personalDataServiceApp /app

CMD ["/app/personalDataServiceApp"]