FROM mysql:8.4


COPY conf.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf

COPY conf.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/conf.sh