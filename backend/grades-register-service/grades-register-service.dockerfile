FROM alpine:latest

RUN mkdir /app

COPY gradesRegisterServiceApp /app

CMD ["/app/gradesRegisterServiceApp"]