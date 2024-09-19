FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies and required PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer globally by copying from Composer's official Docker image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer.json and composer.lock before running composer install
# This ensures that dependencies are installed before copying the rest of the app files
COPY backend/composer.json backend/composer.lock /var/www/html/

# Install PHP dependencies from composer
RUN composer install --no-dev --prefer-dist --no-scripts --no-progress --no-interaction

# Copy the rest of the application to the container
COPY backend /var/www/html

# Copy the environment file
COPY backend/.env.example /var/www/html/.env

# Set appropriate permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Add Nginx
RUN apt-get update && apt-get install -y nginx

# Copy Nginx configuration
COPY backend/nginx.conf /etc/nginx/sites-available/default

# Expose port 80 for Nginx
EXPOSE 80

# Copy the entrypoint script
COPY backend/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

# Change the CMD to use the entrypoint script
CMD ["docker-entrypoint"]
