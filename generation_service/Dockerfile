FROM python:3.11.4-slim-buster
MAINTAINER sssemion
RUN apt-get update -y
COPY . /app/generation_service
COPY ../requirements.txt /app/requirements.txt
WORKDIR /app

RUN pip3 install -r requirements.txt

RUN export PYTHONPATH=/app/
ENTRYPOINT python3 -m flask --app generation_service/app run --host 0.0.0.0 --port $PORT
