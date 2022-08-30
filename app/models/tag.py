from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date, Time
from flask_login import UserMixin
# from app.models import Review

class Tag(db.Model, UserMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    category=db.Column(db.String(20))

    review_id= db.Column(db.Integer, db.ForeignKey('reviews.id'))

    review = db.relationship('Review',back_populates='tags',foreign_keys=[review_id])

    @property
    def image_details(self):
        return self.to_dict()

    def to_dict(self):
        return{
            'id':self.id,
            'img':self.img,
            'restaurant_id':self.restaurant_id,
        }
