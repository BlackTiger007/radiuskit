#!/bin/bash
set -e

# --- Konfiguration ---
MYSQL_PASS="radiuspass"
RADIUS_CLIENT_IP="192.168.1.1"
RADIUS_CLIENT_SECRET="3qcmpi3fu939"
PROJECT_DIR="/var/www/radiuskit"

echo "=== RadiusKit Installer ==="

# --- Update & grundlegende Pakete installieren ---
echo "1. Update & grundlegende Pakete installieren"
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential ufw openssl software-properties-common

# --- Node.js 24 installieren ---
echo "1a. Node.js 24 installieren"
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g npm@latest

# Prüfen
echo "Node-Version: $(node -v), NPM-Version: $(npm -v)"

# --- MySQL einrichten ---
echo "2. MySQL konfigurieren"
sudo apt install -y mysql-server
sudo systemctl enable mysql
sudo systemctl start mysql

sudo mysql <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS radius CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'radius_user'@'localhost' IDENTIFIED BY '${MYSQL_PASS}';
GRANT ALL PRIVILEGES ON radius.* TO 'radius_user'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT

# --- FreeRADIUS installieren und konfigurieren ---
echo "3. FreeRADIUS installieren und konfigurieren"
sudo apt install -y freeradius freeradius-mysql
SQL_MOD="/etc/freeradius/3.0/mods-available/sql"
sudo sed -i 's/dialect = "sqlite"/dialect = "mysql"/' $SQL_MOD
sudo sed -i "s/login = .*/login = \"radius_user\"/" $SQL_MOD
sudo sed -i "s/password = .*/password = \"${MYSQL_PASS}\"/" $SQL_MOD
sudo ln -sf /etc/freeradius/3.0/mods-available/sql /etc/freeradius/3.0/mods-enabled/

CLIENT_CONF="/etc/freeradius/3.0/clients.conf"
if ! grep -q "client socket_client" $CLIENT_CONF; then
sudo tee -a $CLIENT_CONF > /dev/null <<EOL
client socket_client {
    ipaddr = ${RADIUS_CLIENT_IP}
    secret = ${RADIUS_CLIENT_SECRET}
}
EOL
fi

sudo systemctl enable freeradius
sudo systemctl restart freeradius

# --- RadiusKit installieren ---
echo "4. RadiusKit installieren"
sudo mkdir -p /var/www
cd /var/www
if [ ! -d "$PROJECT_DIR" ]; then
    sudo git clone https://github.com/BlackTiger007/radiuskit.git
fi
cd radiuskit

# npm Install als normaler Benutzer (nicht root)
sudo chown -R $USER:$USER $PROJECT_DIR
npm install

# .env erstellen
tee .env > /dev/null <<EOL
DATABASE_URL="mysql://radius_user:${MYSQL_PASS}@localhost:3306/radius"
EOL

npx drizzle-kit migrate
npm run build

# --- Nginx + HTTPS ---
echo "5. Nginx konfigurieren"
sudo apt install -y nginx
sudo ufw allow 'Nginx Full'

sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/radiuskit.key \
  -out /etc/nginx/ssl/radiuskit.crt \
  -subj "/C=DE/ST=State/L=City/O=RadiusKit/OU=IT/CN=radiuskit.local"

NGINX_CONF="/etc/nginx/sites-available/radiuskit"
sudo tee $NGINX_CONF > /dev/null <<EOL
server {
    listen 80;
    server_name radiuskit.local;
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl;
    server_name radiuskit.local;

    ssl_certificate /etc/nginx/ssl/radiuskit.crt;
    ssl_certificate_key /etc/nginx/ssl/radiuskit.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

sudo ln -sf /etc/nginx/sites-available/radiuskit /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# --- Systemd-Service ---
echo "6. Systemd-Service erstellen"
SERVICE_FILE="/etc/systemd/system/radiuskit.service"
sudo tee $SERVICE_FILE > /dev/null <<EOL
[Unit]
Description=RadiusKit Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=${PROJECT_DIR}
EnvironmentFile=${PROJECT_DIR}/.env
ExecStart=/usr/bin/node build/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reload
sudo systemctl enable radiuskit
sudo systemctl start radiuskit

echo "=== Installation abgeschlossen ==="
echo "Dashboard erreichbar unter: https://radiuskit.local"
echo "Admin-Zugang: admin / adminadmin (bitte ändern)"
