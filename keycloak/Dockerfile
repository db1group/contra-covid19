FROM jboss/keycloak:7.0.1
USER root
RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

USER jboss

COPY bin/keycloak-health-checks.jar /opt/jboss/keycloak-health-checks.jar
COPY bin/notificasaude.jks /opt/jboss/keystore/notificasaude.jks

RUN /opt/jboss/keycloak/bin/jboss-cli.sh --command="module add --name=de.tdlabs.keycloak.extensions.keycloak-health-checks --resources=/opt/jboss/keycloak-health-checks.jar --dependencies=org.keycloak.keycloak-core,org.keycloak.keycloak-services,org.keycloak.keycloak-server-spi,org.keycloak.keycloak-server-spi-private,javax.api,javax.ws.rs.api,com.fasterxml.jackson.core.jackson-core,com.fasterxml.jackson.core.jackson-databind,com.fasterxml.jackson.core.jackson-annotations"

COPY standalone-ha.xml /opt/jboss/keycloak/standalone/configuration/standalone-ha.xml
COPY config/notificasaude.json /opt/jboss/keycloak/config/notificasaude.json
ENV KEYCLOAK_IMPORT="/opt/jboss/keycloak/config/notificasaude.json"

EXPOSE 8080 8009 9990 7600 8888

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0", "-Djava.net.preferIPv4Stack=true", "-Djava.net.preferIPv4Addresses=true"]