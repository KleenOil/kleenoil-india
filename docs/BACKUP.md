# Backup & Disaster Recovery

Procedures for backing up PostgreSQL and media files on VPS deployments.

---

## PostgreSQL backups

### Manual backup

```bash
# Create backup directory
mkdir -p backups

# Dump database (run while Postgres container is running)
docker compose -f docker/docker-compose.yml exec -T postgres \
  pg_dump -U postgres -d industrial_platform --format=custom \
  > backups/industrial_platform_$(date +%Y%m%d_%H%M%S).dump
```

### Restore from backup

```bash
# Stop the app first to prevent writes
docker stop industrial-platform 2>/dev/null || true

# Restore (destructive — overwrites current data)
docker compose -f docker/docker-compose.yml exec -T postgres \
  pg_restore -U postgres -d industrial_platform --clean --if-exists \
  < backups/your_backup.dump

# Restart the app
docker start industrial-platform
```

### Automated daily backup (cron)

Add to crontab on the VPS (`crontab -e`):

```cron
0 2 * * * cd /var/www/industrial-platform && docker compose -f docker/docker-compose.yml exec -T postgres pg_dump -U postgres -d industrial_platform --format=custom > /var/backups/industrial_platform_$(date +\%Y\%m\%d).dump
```

Rotate backups — keep 30 days:

```cron
0 3 * * * find /var/backups -name "industrial_platform_*.dump" -mtime +30 -delete
```

---

## Media backups

When using `STORAGE_PROVIDER=local`, media files live in `./media`.

```bash
# Sync to remote storage (example with rsync)
rsync -avz ./media/ user@backup-server:/backups/industrial-platform/media/
```

For Cloudinary or S3, use provider-native backup/versioning features.

---

## Recovery targets

| Metric                         | Target   |
| ------------------------------ | -------- |
| RPO (Recovery Point Objective) | 24 hours |
| RTO (Recovery Time Objective)  | 4 hours  |

---

## Verification

Test restore to a staging environment monthly:

1. Restore latest dump to a staging database.
2. Verify Payload admin login and content integrity.
3. Confirm media files are accessible.
