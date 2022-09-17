from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload, Load, subqueryload
from app.models import db, Restaurant
from app.forms import SearchForm
from datetime import datetime, date
import time
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET'])
@search_routes.route('', methods=['GET'])
def home_search():
    return {'url is': request.args.get('keyword')}
    # return {'url is': request.full_path}

    # restaurants = db.session.query(Restaurant).all()
    # return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
