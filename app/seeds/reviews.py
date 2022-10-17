from app.models import db, Review
from datetime import datetime, date, timedelta
import string
import random

today = date.today()
# confirmationN = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6)) #==> same code for all entries 

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        food=4,
        service=3,
        ambience=5,
        overall=3,
        review_body='Sunday brunch was excellent.',
        created_at=today,
        updated_at=today,
        user_id=1,
        restaurant_id=8,
        reservation_id=1,
        )
    review2 = Review(
        food=4,
        service=3,
        ambience=5,
        overall=4,
        review_body='Spoke to the manager and he was very personable. Nice ambiance.',
        created_at=today,
        updated_at=today,
        user_id=1,
        restaurant_id=2,
        reservation_id=5,
        )
    review3 = Review(
        food=4,
        service=4,
        ambience=4,
        overall=4,
        review_body='We had wonderful servers! They were a joy !',
        created_at=today,
        updated_at=today,
        user_id=2,
        restaurant_id=2,
        reservation_id=2,
        )
    review4 = Review(
        food=4,
        service=3,
        ambience=3,
        overall=3,
        review_body='Reserved and arrived on time but then waited another 35 minutes before being seated. Thought it must be busy… it’s not… lots of empty tables. Apparently, they specifically want to wait for a round table of 5 for us. And the people at that table simply wasn’t leaving after their meal. They finally then decided to put together a 5 people seating using 3 rectangular tables. Terrible. Food was ok…the fried chicken on top of waffle made waffle very soggy.',
        created_at=today,
        updated_at=today,
        user_id=3,
        restaurant_id=2,
        reservation_id=3,
        )
    review5 = Review(
        food=5,
        service=5,
        ambience=5,
        overall=5,
        review_body='Great food, great services. Nothing to complain. Kids friendly as well.',
        created_at=today,
        updated_at=today,
        user_id=4,
        restaurant_id=4,
        reservation_id=4,
        )
    


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reservations RESTART IDENTITY CASCADE;')
    db.session.commit()
