#! /usr/bin/env sh 

gunicorn --bind :$PORT backend.wsgi
