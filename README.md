# News Aggregator

This project is a News Aggregator application with a Laravel backend and a React frontend, containerized using Docker.

## Project Structure

news-aggregator/
- backend/           (Laravel backend)
- frontend/          (React frontend)
- docker-compose.yml
- README.md

## Prerequisites

- Git
- Docker
- Docker Compose

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/mobeen7asif/news_app.git
cd news-aggregator

### 2. Environment Configuration

The project uses Docker for both backend and frontend, with most of the environment setup handled automatically. However, you need to set up your API keys:

1. Open `backend/.env.example` and update the following variables with your API keys:
   ```
   NEWS_API=your_news_api_key
   THE_GUARDIAN_API=your_guardian_api_key
   NYTIMES=your_nytimes_api_key
   ```

2. If needed, update any other environment variables in `backend/.env.example` to match your specific requirements.

### 3. Docker Setup and Running the Application

1. Ensure you're in the root directory of the project.

2. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

   This command will build the Docker images, start the containers, and automatically set up the Laravel application (including database migrations and seeding).

3. Wait for the setup to complete. You should see log messages indicating that the setup is finished.

## Accessing the Application

Once the setup is complete and containers are running, you can access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## Development Workflow

1. Make changes in the `backend/` or `frontend/` directories.
2. If you modify Dockerfiles or `docker-compose.yml`, rebuild the containers:
   ```bash
   docker-compose up --build
   ```
3. For frontend changes, the app should hot-reload.
4. For backend changes, you may need to restart the PHP-FPM process:
   ```bash
   docker-compose exec backend php artisan optimize:clear
   ```

## Features

- Aggregates news from multiple sources (NewsAPI, The Guardian, New York Times)
- Displays news articles in a user-friendly interface
- Allows filtering and searching of news articles
- Responsive design for mobile and desktop viewing
- Allow Filtered news based on the user preferences selected by user

## Technologies Used

- Backend: Laravel (PHP)
- Frontend: React (JavaScript)
- Database: MySQL
- Containerization: Docker

## Known Issues and Future Improvements

While the current version of the News Aggregator is functional, there are some known issues and areas for improvement which could be addressed but due my full time job and other commitments I was not able to spend more time on it:

1. **Caching**: Add caching mechanisms to reduce the number of API calls for news listings and improve performance.

2. **Test Coverage**: Increase unit and integration test coverage for both frontend and backend.

3. **Dockerization Refinement**: Fine-tune Docker configurations for production deployment. For example creds are reading from .env.example files which is not best practice in a production environment.

4. **Repository pattern Refinement**: Implement the repository pattern with interfaces for better organization and testability.

5. **Frontend**: A strange bug in loader component that causes the the weired character in the news article content.

## Design Principles

This project adheres to the following design principles:

### DRY (Don't Repeat Yourself)
- Utilizes base classes and repositories to avoid code duplication.
- Implements reusable components in the frontend.

### KISS (Keep It Simple, Stupid)
- Maintains simple, focused components in the frontend.
- Uses clear and straightforward logic in API endpoints.

### SOLID
- **Single Responsibility**: Each class and component has a single, well-defined purpose.
- **Open-Closed**: The architecture allows for extending functionality without modifying existing code.
- **Dependency Inversion**: The project uses dependency injection to decouple high-level modules from low-level modules.

These principles contribute to the maintainability, scalability, and robustness of the codebase.
