# Install dependencies only when needed
FROM node:16-alpine AS deps
ENV PORT 3000


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY next.config.js ./next.config.js
COPY tailwind.config.js ./tailwind.config.js
COPY postcss.config.js ./postcss.config.js

COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY components ./components
COPY services ./services

CMD ["npm","run","build"]
