from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    points = db.Column(db.Integer,default=0)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    restaurants = db.relationship('Restaurant',back_populates='user',cascade='all,delete')
    reservations = db.relationship('Reservation',back_populates='user',cascade='all,delete')
    reviews = db.relationship('Review',back_populates='user',cascade='all,delete')
    favorite = db.relationship('Favorite',back_populates='user',cascade='all,delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            # 'email': self.email,
            'first_name': self.first_name,
            'last_name':self.last_name
        }
