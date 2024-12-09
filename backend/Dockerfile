FROM openjdk:17-jdk-alpine
RUN mkdir -p /app/uploads
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]