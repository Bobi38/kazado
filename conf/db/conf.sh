#! /bin/bash
set -e

ROOT_PASSWORD=$(cat "$MYSQL_ROOT_PASSWORD_FILE")
BOBI_PASSWORD =$(cat "$MYSQL_PASSWORD")

if [ -f /run/secrets/data_pswd ]; then
    ROOT_PASSWORD=$(cat /run/secrets/data_pswd)
else
    echo "Erreur : Le fichier secret /run/secrets/data_pswd est introuvable !"
    exit 1
fi

# Donne tous les droits à bobi
mysql -u root -p"$ROOT_PASSWORD" <<EOF
CREATE USER IF NOT EXISTS 'bobi'@'%' IDENTIFIED BY '$BOBI_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'bobi'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF