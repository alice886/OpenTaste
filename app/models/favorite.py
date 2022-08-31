from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date, Time
from flask_login import UserMixin
# from app.models import User, Restaurant

class Favorite(db.Model, UserMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)

    owner_id= db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    restaurant_id= db.Column(db.Integer, db.ForeignKey('restaurants.id'),nullable=False)

    user = db.relationship('User',back_populates='reviews',foreign_keys=[owner_id])
    restaurant = db.relationship('Restaurant',back_populates='reviews',foreign_keys=[restaurant_id])

    @property
    def favorite_details(self):
        return self.to_dict()

    def to_dict(self):
        return{
            'id':self.id,
            'created_at':self.created_at,
            'owner_id':self.owner_id,
            'restaurant_id':self.restaurant_id,
        }
