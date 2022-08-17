# EFISHERY BACKEND TEST

# Doc API
- Please click this link https://documenter.getpostman.com/view/8144274/VUjSGPrX

# Requirment
- Docker

# Set up with docker
- Create file .env in /nodejs
  `touch .env`
- Copy env variable needed, example : <br>
  `PORT = <your port app>`<br>
  `SECRET_JWT=<your stein jwt secret>`<br>
  `SECRET_ENCRYPT_PASSWORD_PROFILE = <your secret encrypt password>`<br>
  `STEIN_HQ_URL = <your stein hq url>`<br>
  `STEIN_HQ_USERNAME = <your stein hq username>`<br>
  `STEIN_HQ_PASSWORD = <your stein hq password>`<br>
  `CURRENCY_API_KEY = <your currency api key>`
- Build image and run container
  `docker-compose up -d`

# Stop service
- Run command
  `docker-compose down`