#!/bin/bash
set -e

echo "=========================================="
echo "--> Début de la configuration MySQL pour bobi..."

if [ -n "$MYSQL_ROOT_PASSWORD" ]; then
    ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD"
elif [ -f /run/secrets/data_pswd ]; then
    ROOT_PASSWORD=$(cat /run/secrets/data_pswd)
fi

BOBI_PASSWORD="$MYSQL_PASSWORD"

echo "--> Application des privilèges globaux pour 'bobi'@'%'..."

mysql -u root -p"$ROOT_PASSWORD" <<EOF
CREATE USER IF NOT EXISTS 'bobi'@'%' IDENTIFIED BY '$BOBI_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'bobi'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

echo "--> SUCCESS: L'utilisateur bobi a reçu tous les privilèges sur *.* !"
echo "=========================================="