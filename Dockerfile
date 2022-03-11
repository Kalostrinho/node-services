FROM    openjdk:alpine
WORKDIR /app
EXPOSE  3000
COPY    launchWiremock.sh /app/
COPY    wiremock-standalone-2.32.0.jar /app/
COPY    . /app/
CMD     ["/app/launchWiremock.sh"]