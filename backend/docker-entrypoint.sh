#!/bin/sh
set -e

# Wait for the database to be ready
echo "Waiting for database connection..."

# Check if the file exists
if [ ! -f /var/www/html/storage/.migration_run ]; then
    echo "Running migrations..."
    php artisan migrate --force --verbose
    
    if [ $? -eq 0 ]; then
        echo "Migrations completed successfully."
        echo "Running seeds..."
        php artisan db:seed --force --verbose
        
        if [ $? -eq 0 ]; then
            echo "Seeds completed successfully."
            touch /var/www/html/storage/.migration_run
        else
            echo "Seeding failed."
        fi
    else
        echo "Migration failed."
    fi
else
    echo "Migrations have already been run."
fi

# Cache configuration and routes
echo "Caching configuration..."
php artisan config:cache
echo "Caching routes..."
php artisan route:cache

# Start Nginx and PHP-FPM

# Start the Laravel scheduler in the background
php artisan schedule:work &
echo "Starting PHP-FPM..."
php-fpm &
echo "Testing Nginx configuration..."
nginx -t
# Start Nginx in the foreground (this keeps the container running)
echo "Starting Nginx..."
nginx -g 'daemon off;'
