# Deployment Guide

This document covers local Docker development and production deployment options for the Industrial Corporate Portfolio Platform.

---

## Table of Contents

1. [Local Development (Recommended)](#local-development-recommended)
2. [Local Development (Full Docker Stack)](#local-development-full-docker-stack)
3. [Database Migrations](#database-migrations)
4. [Production — Hostinger VPS](#production--hostinger-vps)
5. [Production — Vercel](#production--vercel)
6. [Environment Checklist](#environment-checklist)

---

## Local Development (Recommended)

Run **PostgreSQL in Docker** and the **Next.js app on your host** for the fastest hot-reload experience.

### Prerequisites

- Node.js 20+ and npm 10+
- Docker Desktop 24+ (or Docker Engine on Linux)

### Quick start

```bash
# 1. Install dependencies
npm ci

# 2. Configure environment
cp .env.example .env
# Defaults in .env.example match Docker Compose credentials

# 3. Start PostgreSQL + run migrations
npm run setup:local

# 4. Start the dev server
npm run dev
```

| URL                         | Description       |
| --------------------------- | ----------------- |
| http://localhost:3000       | Public website    |
| http://localhost:3000/admin | Payload CMS admin |

On first visit to `/admin`, create your Super Admin account.

### Database commands

| Command               | Description                                         |
| --------------------- | --------------------------------------------------- |
| `npm run db:up`       | Start PostgreSQL container                          |
| `npm run db:down`     | Stop PostgreSQL container                           |
| `npm run db:logs`     | Tail PostgreSQL logs                                |
| `npm run db:migrate`  | Run Payload database migrations                     |
| `npm run db:reset`    | **Destructive** — stop Postgres and delete all data |
| `npm run setup:local` | `db:up` + `db:migrate`                              |

### Default PostgreSQL credentials (local only)

| Variable | Default               |
| -------- | --------------------- |
| Host     | `localhost`           |
| Port     | `5432`                |
| User     | `postgres`            |
| Password | `postgres`            |
| Database | `industrial_platform` |

Connection string (already in `.env.example`):

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/industrial_platform
```

Override via `docker/.env` (copy from `docker/.env.example`) if port `5432` is already in use.

---

## Local Development (Full Docker Stack)

Run both PostgreSQL and the app inside Docker. Useful for testing containerized setups; slower hot reload than host dev.

```bash
cp .env.example .env
docker compose -f docker/docker-compose.full.yml up --build
```

The app container overrides `DATABASE_URL` to use the internal `postgres` hostname.

---

## Database Migrations

Payload manages PostgreSQL schema via migrations.

```bash
# After schema changes in Payload collections:
npm run db:migrate
```

### Production migrations

Run migrations **before** starting the production container:

```bash
# On VPS or CI, with production DATABASE_URL in .env:
npm run db:migrate
```

Do not rely on the app container to auto-migrate in production — migrations are an explicit deployment step.

---

## Production — Hostinger VPS

### Architecture

```
Internet → Nginx (SSL) → Docker app container (port 3000)
                      → PostgreSQL container (internal network)
                      → media volume (local storage)
```

### 1. Server requirements

| Resource | Minimum       | Recommended      |
| -------- | ------------- | ---------------- |
| RAM      | 2 GB          | 4 GB             |
| CPU      | 1 vCPU        | 2 vCPU           |
| OS       | Ubuntu 22.04+ | Ubuntu 24.04 LTS |
| Docker   | 24+           | Latest stable    |

### 2. Initial setup

```bash
# Clone repository
git clone <repository-url> /var/www/industrial-platform
cd /var/www/industrial-platform

# Configure production environment
cp .env.example .env
nano .env   # Set production values (see checklist below)

# Start PostgreSQL
docker compose -f docker/docker-compose.yml up -d

# Run migrations
npm ci
npm run db:migrate

# Build and run production image
docker build -f docker/Dockerfile -t industrial-platform:latest .
docker run -d \
  --name industrial-platform \
  --env-file .env \
  -p 3000:3000 \
  -v $(pwd)/media:/app/media \
  --restart unless-stopped \
  industrial-platform:latest
```

### 3. Nginx reverse proxy

Example `/etc/nginx/sites-available/industrial-platform`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    client_max_body_size 25M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Obtain SSL with Certbot:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 4. Updates

```bash
git pull
npm ci
npm run db:migrate
docker build -f docker/Dockerfile -t industrial-platform:latest .
docker stop industrial-platform && docker rm industrial-platform
docker run -d ... # same run command as above
```

---

## Production — Vercel

Vercel does not run Docker containers. Use managed services for database and media.

| Component | Service                               |
| --------- | ------------------------------------- |
| App       | Vercel (Next.js)                      |
| Database  | Neon, Supabase, or Railway PostgreSQL |
| Media     | Cloudinary or AWS S3                  |

### Steps

1. Connect GitHub repository to Vercel.
2. Set all environment variables in the Vercel dashboard (see checklist).
3. Set `STORAGE_PROVIDER=cloudinary` or `s3` (local storage is not available).
4. Set `DATABASE_URL` to your managed Postgres connection string.
5. Run migrations against production DB from CI or locally:
   ```bash
   DATABASE_URL=<production-url> npm run db:migrate
   ```
6. Deploy — Vercel builds automatically on push to `main`.

---

## Environment Checklist

### Required for all environments

| Variable               | Local                   | Production               |
| ---------------------- | ----------------------- | ------------------------ |
| `DATABASE_URL`         | Docker default          | Managed Postgres URL     |
| `PAYLOAD_SECRET`       | 32+ char dev string     | `openssl rand -hex 32`   |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://yourdomain.com` |

### Required for production only

| Variable                                                  | Notes                              |
| --------------------------------------------------------- | ---------------------------------- |
| `REVALIDATE_SECRET`                                       | 32+ chars — `openssl rand -hex 32` |
| `RESEND_API_KEY` or SMTP credentials                      | Form email notifications           |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Spam protection on forms           |
| `STORAGE_PROVIDER` + credentials                          | `cloudinary` or `s3` on Vercel     |

See [`.env.example`](../.env.example) for the complete list.

---

## Backup (VPS)

See [`BACKUP.md`](BACKUP.md) for database and media backup procedures.
