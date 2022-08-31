from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date, Time
from flask_login import UserMixin
from app.models import User, Restaurant

class Reservation(db.Model, UserMixin):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    party_size = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    reserve_time = db.Column(db.DateTime, nullable=False)
    occasion = db.Column(db.String(20))
    special_request = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, nullable=False)
    confirmation_number = db.Column(db.Integer, nullable=False)

    user_id= db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    restaurant_id= db.Column(db.Integer, db.ForeignKey('restaurants.id'),nullable=False)

    user = db.relationship('User',back_populates='reservations',foreign_keys=[user_id])
    restaurant = db.relationship('Restaurant',back_populates='reservations',foreign_keys=[restaurant_id])

    @property
    def reservation_details(self):
        return self.to_dict()

    def to_dict(self):
        return{
            'id':self.id,
            'party_size':self.party_size,
            'date':self.date,
            'reserve_time':self.reserve_time,
            'occasion':self.occasion,
            'special_request':self.special_request,
            'created_at':self.created_at,
            'confirmation_number':self.confirmation_number,
            'user_id':self.user_id,
            'restaurant_id':self.restaurant_id,
        }
