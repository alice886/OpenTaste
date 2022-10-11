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
    sorting = request.args.get('sort')
    cleaned_terms = clean_terms(terms)
    result = []
    onpage = int(request.args.get('page')) -1
    pagesize = 40

    orderby = None

    if sorting == 'default':
        orderby = Restaurant.id
    elif sorting == 'newest':
        orderby = Restaurant.id.desc()
    elif sorting == 'priceasc':
        orderby = Restaurant.price_range
    elif sorting == 'pricedes':
        orderby = Restaurant.price_range.desc()
    else:
        orderby = Restaurant.price_range.desc()

    for term in cleaned_terms:
        if term != None:
            restaurants_total = db.session.query(Restaurant)\
            .filter(or_\
            (Restaurant.name.ilike(f'%{term}%'),\
            Restaurant.address.ilike(f'%{term}%'),\
            Restaurant.city.ilike(f'%{term}%'),\
            Restaurant.state.ilike(f'{term}'),\
            Restaurant.zip_code == f'{term}',\
            Restaurant.description.ilike(f'%{term}%'),\
            Restaurant.cuisine.ilike(f'%{term}%')\
            ))\
            .all()

        # restaurants = restaurants_total.order_by(orderby).limit(pagesize).offset((onpage*pagesize))\
        # .all()

        # if len(restaurants)>0:
        if len(restaurants_total)>0:
            for each in restaurants_total:
                each = each.to_dict()
                if each not in result:
                    result.append(each)

    # if len(result) > 0:
    if len(restaurants_total) > 0:
        # return {'restaurants': result}
        # return {'length':len(restaurants_total.all()),'restaurants': result}
        return {'restaurants': result}
        # if onepage*pagesize > len(restaurants_total):
        #     return {'errors':['No more restaurants to browse.'], 'restaurants':[]}
    else:
        recomment_rest = []
        recommend_total = db.session.query(Restaurant).all()
        # recommend = db.session.query(Restaurant).order_by(orderby).limit(pagesize).offset((onpage*pagesize)).all()
        # if recommend is not None and len(recommend) > 0:
        for each in recommend_total:
            each = each.to_dict()
            recomment_rest.append(each)
        # return {'errors':['No restaurants met your search.'], 'restaurants':recomment_rest}
        # if onpage*pagesize > len(recommend_total):
        #     return {'errors':['No more restaurants to browse.'], 'restaurants':[]}
        # return {'errors':['No restaurants met your search.'], 'restaurants':recomment_rest, 'length':len(recommend_total)}
        return { 'restaurants':recomment_rest}

        

        
    # return {'url is': request.full_path}
    # page = request.args.get(get_page_parameter(), type= int, default=1)
    # pagination = Pagination(page=page, total= restaurant.count(), search=False)
