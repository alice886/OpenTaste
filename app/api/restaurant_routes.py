from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Restaurant
from app.forms import RestaurantForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/',methods=['GET'])
@restaurant_routes.route('',methods=['GET'])
def all_restaurants():
    restaurants = db.session.query(Restaurant).all()
    # restaurants = db.session.query(Restaurant).options(db.joinedloaded(Restaurant.reviews,Restaurant.images)).all()
    if restaurants is not None and len(restaurants) > 0:
        return {'all_restaurants': [restaurant.to_dict() for restaurant in restaurants]}
    else:
        return {'errors':['No restaurants not found.']},404


@restaurant_routes.route('/<int:id>',methods=['GET'])
def restaurant_details(id):
    restaurant = db.session.query(Restaurant).get(id)
    if restaurant is not None:
        return restaurant.to_dict()
    else:
        return {'errors':['Restaurant not found.']},404

@restaurant_routes.route('/',methods=['POST'])
@restaurant_routes.route('',methods=['POST'])
@login_required
def restaurant_create():
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        restaurant = Restaurant(
            name = form.data['name'],
            price_range = form.data['price_range'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            zip_code = form.data['zip_code'],
            description = form.data['description'],
            capacity = form.data['capacity'],
            open_time = datetime.strptime('08:00',"%H:%M").time(),
            close_time = datetime.strptime('12:00',"%H:%M").time(),
            cuisine = form.data['cuisine'],
            owner_id = current_user.id
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)},400

@restaurant_routes.route('/<int:id>',methods=['PUT'])
@login_required
def restaurant_edit(id):
    restaurant = db.session.query(Restaurant).get(id)
    restaurant = restaurant.to_dict()
    if restaurant is not None:
        if current_user.id != restaurant['owner_id']:
            return {'errors':["You cannot edit the restaurant that doesn't belong to you."]},403
        form = RestaurantForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        for i in form.data:
            if not form.data[i]:
                form[i].data = restaurant[i]
        if form.validate_on_submit():
            for i in form.data:
                restaurant[i] = form.data[i]
            # db.session.commit()
            return restaurant
        return {'errors':validation_errors_to_error_messages(form.errors)},400
    else:
        return {'errors': ['Restaurant is not found.']},404
