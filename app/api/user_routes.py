from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import db,User,Restaurant, Image, Reservation
from sqlalchemy.orm import joinedload, Load, join

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/myrestaurants',methods=['GET'])
@login_required
def my_restaurants():
    uid = current_user.id
    # restaurants = Restaurant.query.options(joinedload(Image,Restaurant.images)).filter(Restaurant.owner_id == uid).all()
    restaurants = Restaurant.query.options(joinedload(Image,Restaurant.images)).filter(Restaurant.owner_id == uid).all()
    restaurants_list=[]
    if restaurants is not None:
        if restaurants is not None and len(restaurants) > 0:
            for restaurant in restaurants:
                restaurant_dict = restaurant.to_dict()
                # restruant_dict['images']= restaurant.images.to_dict()
                restaurants_list.append(restaurant_dict)
            return {'restaurants': restaurants_list}
    else:
        return {'errors':['You have not list a restaurant.']},404

@user_routes.route('/myreservations',methods=['GET'])
@login_required
def my_reservations():
    uid = current_user.id
    print('current user id is', uid)
    # restaurant = db.session.query(Restaurant).get(Reservation.restaurant_id)
    reservations = db.session.query(Reservation).options(db.joinedload(Reservation.restaurant)).filter(Reservation.user_id == uid).all()
    reservations_list=[]
    if reservations is not None and len(reservations) > 0:
        for each in reservations:
            restaurant = each.restaurant.to_dict()
            each = each.to_dict()
            each['restaurant']=restaurant
            reservations_list.append(each)
        return {'reservations':reservations_list}
    else:
        return {'errors':['You have no reservations yet.']},404
