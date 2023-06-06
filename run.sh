if [ -z $KORP_BACKEND_URL ]; then
    KORP_BACKEND_URL=http://localhost:1234
fi

echo "Running korp-frontend (backend url: $KORP_BACKEND_URL)"
sed -i -e "s|\".*\"|\"$KORP_BACKEND_URL\"|" /var/www/korp-frontend/backend.js
nginx -g 'daemon off;'
