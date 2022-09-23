from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_paginate import Pagination, get_page_parameter
# from flask_paginate import Pagination
from sqlalchemy.orm import joinedload, Load, subqueryload
from app.models import db, Restaurant
# from app.forms import SearchForm
from datetime import datetime, date
import time
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET'])
@search_routes.route('', methods=['GET'])
def home_search():
    restaurants = db.session.query(Restaurant).all()
    # page = request.args.get(get_page_parameter(), type= int, default=1)
    # pagination = Pagination(page=page, total= restaurant.count(), search=False)
    return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
    # http://localhost:3000/api/search?dateTime=2022-09-17T12%3A00%3A00&covers=2&term=san%20mateo
    # return {'url is': request.args.get('dateTime')} #returns '2022-09-17T12:00:00'
    # return {'url is': request.args.get('covers')}  # returns '2'
    # return {'url is': request.args.get('term')} # returns 'san mateo'
    # return {'url is': request.full_path}

    # restaurants = db.session.query(Restaurant).all()
    # return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
