from app.models import db, Reservation
from datetime import datetime, date, timedelta
import string
import random

today = date.today()
# confirmationN = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6)) #==> same code for all entries 

# Adds a demo user, you can add other users here if you want
def seed_reservations():
    reser1 = Reservation(
        party_size=2, 
        reserve_datetime=datetime.strptime('2022-09-29 17:00:00','%Y-%m-%d %H:%M:%S'), 
        occasion='Anniversary',
        special_request='Will the restaurant be able to provide a peony bouquet?',
        created_at=today,
        # confirmation_number='R1T3KX',
        user_id=2,
        restaurant_id=4,
        )
    reser2 = Reservation(
        party_size=6, 
        reserve_datetime=datetime.strptime('2022-09-29 18:30:00','%Y-%m-%d %H:%M:%S'), 
        occasion='Family/Friend Gathering',
        special_request='Please call me at 888-999-0000 to confirm.',
        created_at=today,
        # confirmation_number='1AF9DI',
        user_id=5,
        restaurant_id=1,
        )
    reser3 = Reservation(
        party_size=2, 
        reserve_datetime=datetime.strptime('2022-09-29 17:00:00','%Y-%m-%d %H:%M:%S'), 
        occasion='Birthday',
        special_request='Can I also place an order for a birthday cake for my mom? She likes red velvet chocolate lava with extra extra cocoa & cinnamon powder sprinkle on top!! And Could it be diary free and gluten free?',
        created_at=today,
        # confirmation_number='XXW7SG',
        user_id=4,
        restaurant_id=6,
        )
    reser4 = Reservation(
        party_size=2, 
        reserve_datetime=datetime.strptime('2022-09-30 18:00:00','%Y-%m-%d %H:%M:%S'), 
        occasion='Business',
        special_request='My client has allergy to tree nuts and peanuts. Please make sure our meal is free the the aforementioned.',
        created_at=today,
        # confirmation_number='TFW9QR',
        user_id=3,
        restaurant_id=5,
        )
    
    reser5 = Reservation(
        party_size=10, 
        reserve_datetime=datetime.strptime('2022-09-30 18:00:00','%Y-%m-%d %H:%M:%S'), 
        occasion='Celebration/Graduation',
        special_request='Can we get a large table for the 10 of us?',
        created_at=today,
        # confirmation_number='K9Y9RY',
        user_id=1,
        restaurant_id=2,
        )


    db.session.add(reser1)
    db.session.add(reser2)
    db.session.add(reser3)
    db.session.add(reser4)
    db.session.add(reser5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reservations():
    db.session.execute('TRUNCATE reservations RESTART IDENTITY CASCADE;')
    db.session.commit()
