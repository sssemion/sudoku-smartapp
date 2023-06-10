import flask
from flask_cors import CORS

from generation_service.handlers import api

app = flask.Flask(__name__)
if app.config.get('DEBUG'):
    CORS(app)

app.register_blueprint(api, url_prefix='/api/v1')
