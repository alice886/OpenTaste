from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date, Time
from flask_login import UserMixin
# from app.models import User, Reservation, Review

class Restaurant(db.Model, UserMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500))
    capacity = db.Column(db.Integer,nullable=False)
    open_time = db.Column(db.DateTime, nullable=False)
    close_time = db.Column(db.DateTime, nullable=False)
    cuisine = db.Column(db.String(20), nullable=False)

    owner_id= db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)

    user = db.relationship('User',back_populates='restaurants',foreign_keys=[owner_id])
    reservations = db.relationship('Reservation',back_populates='restaurant')
    reviews = db.relationship('Review',back_populates='restaurant',cascade='all,delete')
    favorite = db.relationship('Favorite',back_populates='restaurants')
    images = db.relationship('Image',back_populates='restaurant',cascade='all,delete')

    @property
    def restaurant_details(self):
        return self.to_dict()

    def to_dict(self):
        return{
            'id':self.id,
            'name':self.name,
            'price_range':self.price_range,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'zip_code':self.zip_code,
            'description':self.description,
            'open_time':self.open_time,
            'close_time':self.close_time,
            'cuisine':self.cuisine,
            'owner_id': self.owner_id,
        }
