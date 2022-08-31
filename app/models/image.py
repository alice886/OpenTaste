from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date, Time
from flask_login import UserMixin
# from app.models import Restaurant

class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    img=db.Column(db.String(300))

    restaurant_id= db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)

    restaurant = db.relationship('Restaurant',back_populates='images',foreign_keys=[restaurant_id])

    @property
    def image_details(self):
        return self.to_dict()

    def to_dict(self):
        return{
            'id':self.id,
            'img':self.img,
            'restaurant_id':self.restaurant_id,
        }
