from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
# from flask_paginate import Pagination, get_page_parameter
# from flask_paginate import Pagination
from sqlalchemy import or_
from sqlalchemy.orm import joinedload, Load, subqueryload
from app.models import db, Restaurant
# from app.forms import SearchForm
from datetime import datetime, date
import time
import re
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('search', __name__)

def clean_terms(terms):
    each_term = re.sub(' +', ' ', terms).split(' ')
    return each_term

@search_routes.route('/', methods=['GET'])
@search_routes.route('', methods=['GET'])
def home_search():
    terms = request.args.get('term')
    # term = 'Francisco'
    # cleaned_terms = ['Francisco', 'mymy']
    cleaned_terms = clean_terms(terms)
    result = []
    for term in cleaned_terms:
        restaurants = db.session.query(Restaurant)\
        .filter(or_(Restaurant.name.ilike(f'%{term}%'),\
        Restaurant.address.ilike(f'%{term}%'),\
        Restaurant.city.ilike(f'%{term}%'),\
        Restaurant.state.ilike(f'%{term}%'),\
        Restaurant.zip_code.ilike(f'%{term}%'),\
        Restaurant.description.ilike(f'%{term}%'),\
        Restaurant.cuisine.ilike(f'%{term}%')\
        ))\
        .all()
        if len(restaurants)>0:
            for each in restaurants:
                each = each.to_dict()
                if each not in result:
                    result.append(each) 

    # restaurants = db.session.query(Restaurant).filter(Restaurant.city.ilike(f'%{term}%')).all()
    # for each in restaurants:
    #     each = each.to_dict()
    #     result.append(each)
    
    if len(result) > 0:
        return {'what is the length':len(result),'restaurants': result}
    else:
        return {'errors':['No restaurants met your search.']},404
    # return {'url is': request.full_path}
    # page = request.args.get(get_page_parameter(), type= int, default=1)
    # pagination = Pagination(page=page, total= restaurant.count(), search=False)
