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
    nginx \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer globally by copying from Composer's official Docker image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the application code
COPY backend /var/www/html

# Install PHP dependencies from composer
RUN /usr/bin/composer install --optimize-autoloader --no-dev

# Copy the environment file
COPY backend/.env.example /var/www/html/.env

# Set appropriate permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy Nginx configuration
COPY backend/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Copy the entrypoint script
COPY backend/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

# Change the CMD to use the entrypoint script
ENTRYPOINT ["docker-entrypoint"]
