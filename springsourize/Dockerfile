FROM openjdk:17-jdk-slim AS build

COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw package

FROM openjdk:17-jdk-slim
WORKDIR springsourize
COPY --from=build target/*.jar springsourize.jar
ENTRYPOINT ["java", "-jar", "springsourize.jar"]
