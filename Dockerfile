FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo '#!/bin/sh\n\
echo "Waiting for database to be ready..."\n\
sleep 15\n\
echo "Running migrations from src/migrations..."\n\
npx sequelize-cli db:migrate --migrations-path src/migrations --config src/config/config.json\n\
echo "Migrations completed!"\n\
echo "Running seeders (if any)..."\n\
npx sequelize-cli db:seed:all --seeders-path src/seeders --config src/config/config.json || true\n\
echo "Starting application..."\n\
npm start' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]