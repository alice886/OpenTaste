from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date, Time
from flask_login import UserMixin
# from app.models import User, Restaurant

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    food = db.Column(db.Integer, nullable=False)
    service = db.Column(db.Integer, nullable=False)
    ambience = db.Column(db.Integer, nullable=False)
    overall = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user_id= db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    restaurant_id= db.Column(db.Integer, db.ForeignKey('restaurants.id'),nullable=False)
    reservation_id= db.Column(db.Integer, db.ForeignKey('reservations.id'),nullable=False)

    user = db.relationship('User',back_populates='reviews',foreign_keys=[user_id])
    restaurant = db.relationship('Restaurant',back_populates='reviews',foreign_keys=[restaurant_id])
    tags = db.relationship('Tag',back_populates='review')

    @property
    def review_details(self):
        return self.to_dict()

    def to_dict(self):
        return{
            'id':self.id,
            'food':self.food,
            'service':self.service,
            'ambience':self.ambience,
            'overall':self.overall,
            'review_body':self.review_body,
            'created_at':self.created_at,
            'updated_at':self.updated_at,
            'user_id':self.user_id,
            'restaurant_id':self.restaurant_id,
            'reservation_id':self.reservation_id,
        }
