#!/bin/sh
set -e

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Seeding database..."
python manage.py seed

echo "Starting Gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 --workers 4 --access-logfile - --error-logfile - config.wsgi:application
