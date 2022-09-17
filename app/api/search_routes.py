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
@search_routes.route('/', methods=['GET'])
def home_search():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # search_date = form.data['search_date']
    # search_time = form.data['search_time']
    if form.data['key_word']:
        key_word = set(form.data['key_word'].split(' '))
    else:
        key_word = form.data['key_word']
    print(key_word)
    return {'what would be returned': form.data['key_word']}
    # print(set(key_word.split(' ')))
    # return {each for each in key_word}



    # restaurants = db.session.query(Restaurant).all()
    # return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
