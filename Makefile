export DATABASE_URL=mysql://bobi:123@localhost:3306/Cal

all: secrets compose update_prisma

compose:
	docker compose up -d

down:
	docker compose down -v
	
prune:
	docker system prune -af --volumes

volumes:
	docker volume rm $$(docker volume ls -q) 2>/dev/null || true
	rm -rf vol

secrets:
	@mkdir -p ./conf/secrets
	openssl rand -hex 2 > ./conf/secrets/data_pswd
	openssl rand -hex 2 > ./conf/secrets/cle_pswd
	openssl rand -hex 2 > ./conf/secrets/cle_chat
	openssl rand -hex 2 > ./conf/secrets/bobi_pswd
# 	openssl rand -hex 4 > ./conf/secrets/wordpress_admin_password
# 	openssl rand -hex 4 > ./conf/secrets/wordpress_user_password
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./conf/secrets/nginx.key -out ./conf/secrets/nginx.crt -subj "/CN=tvoisin.42.fr"

update_prisma:
	@echo "🚀 Synchronisation du schéma Prisma avec la base de données..."
	cd web/back && npx prisma@6.19.3 db push --schema=./prisma
	@echo "📦 Régénération du client Prisma dans les conteneurs Docker..."
	docker compose exec gateway npx prisma generate --schema=./prisma
	docker compose exec resa npx prisma generate --schema=./prisma
	docker compose exec user npx prisma generate --schema=./prisma
	@echo "✅ Tout est à jour !"

delete_secret:
	rm -r conf/secrets

rmi:
	docker container rm -f $$(docker ps -aq) 2>/dev/null || true
	docker rmi -f $$(docker images -q) 2>/dev/null || true

clean:	down
	$(MAKE) prune
	$(MAKE) rmi


fclean: clean
	docker volume prune -f
	docker network prune -f
	$(MAKE) volumes
	$(MAKE) delete_secret



.PHONY: all down prune creat rmi volumes  clean  fclean delete_secret compose update_prisma