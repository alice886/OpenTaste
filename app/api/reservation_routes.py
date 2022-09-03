from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload, Load, subqueryload
from app.models import db, Reservation
from app.forms import ReservationForm
from datetime import datetime, date, timedelta
import time
from .auth_routes import validation_errors_to_error_messages

reservation_routes = Blueprint('reservations', __name__)
# user_id = current_user.id

@reservation_routes.route('/',methods=['POST'])
@reservation_routes.route('',methods=['POST'])
@login_required
def reservation_create():
    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reservation = reservation(
            party_size=form.data['party_size'],
            reserve_dattime=form.data['reserve_date'],
            occasion=form.data['occasion'],
            special_request=form.data['special_request'],
            created_at=today,
            user_id=current_user.id,
            restaurant_id=form.data['restaurant_id'],
        )
        db.session.add(reservation)
        db.session.commit()
        return reservation.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)},400


@reservation_routes.route('/<int:id>/',methods=['PUT'])
@reservation_routes.route('/<int:id>',methods=['PUT'])
@login_required
def reservation_edit(id):
    reservation = Reservation.query.get(id)
    if reservation is not None:
        reservation_dict = reservation.to_dict()
        if current_user.id != reservation_dict['owner_id']:
            return {'errors':["You cannot edit the reservation that doesn't belong to you."]},403
        form = ReservationForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        for i in form.data:
            if not form.data[i]:
                form[i].data = reservation_dict[i]
        if form.validate_on_submit():
            for i in form.data:
                if i != 'csrf_token':
                    # reservation_dict[i] = form.data[i] -> doesnot work, not a dict
                    setattr(reservation,i,form.data[i])
            db.session.commit()
            return reservation.to_dict()
        return {'errors':validation_errors_to_error_messages(form.errors)}
    else:
        return {'errors': ['reservation is not found.']},404


@reservation_routes.route('/<int:id>/',methods=['DELETE'])
@reservation_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def reservation_delete(id):
    reservation = db.session.query(Reservation).get(id)
    if reservation is not None:
        reservation_dict = reservation.to_dict()
        if current_user.id != reservation_dict['owner_id']:
            return {'errors':["You cannot delete the reservation that doesn't belong to you."]},403
        db.session.delete(reservation)
        db.session.commit()
        return reservation.to_dict()
    else:
        return {'errors':['reservation not found.']},404
