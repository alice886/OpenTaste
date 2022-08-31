from app.models import db, Restaurant
from datetime import datetime, date, timedelta


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    rest1 = Restaurant(
        name='Tomatina', 
        owner_id=1,
        price_range=2, 
        address='401 B St', 
        city='San Mateo', 
        state='CA',
        zip_code=94401,
        description=" You’re always welcome at San Mateo Tomatina, our family-friendly Italian restaurant at the corner of 4th and B Streets in the heart of downtown San Mateo just off Highway 101. ",
        open_time=datetime.strptime('12:00',"%H:%M"),
        close_time=datetime.strptime('20:00',"%H:%M"),
        cuisine='Italian',
        capacity=80,
        )

    rest2 = Restaurant(
        name='Avenida', 
        owner_id=3,
        price_range=2, 
        address='201 E 3rd Avenue', 
        city='San Mateo', 
        state='CA',
        zip_code=94401,
        description='Avenida Modern Filipino Restaurant and Bar was inspired by the dynamic lifestyle of Avenida Rizal, one of the main thoroughfares in the Old Manila during the pre and post World War II era. It was named after the Philippine National Hero, Jose Rizal.',
        open_time=datetime.strptime('12:00',"%H:%M"),
        close_time=datetime.strptime('22:00',"%H:%M"),
        cuisine='Filipino',
        capacity=80,
        )

    rest3 = Restaurant(
        name='Kokko', 
        owner_id=4,
        price_range=2, 
        address='509 2nd Ave', 
        city='San Mateo', 
        state='CA',
        zip_code=94401,
        description="Yakitori & other casual Japanese eats are provided along with house sake at this cozy urban hangout.",
        open_time=datetime.strptime('17:30',"%H:%M"),
        close_time=datetime.strptime('22:30',"%H:%M"),
        cuisine='Japanese',
        capacity=60,
        )
        
    rest4 = Restaurant(
        name="Selby's", 
        owner_id=5,
        price_range=3, 
        address='3001 El Camino Real', 
        city='Redwood City', 
        state='CA',
        zip_code=94061,
        description="Located on the corners of Selby Lane and El Camino Real in the town of Atherton, Selby's celebrates classic American continental cuisine with a menu that showcases the restaurant’s unique relationship with SMIP Ranch. Please visit our website for updates.",
        open_time=datetime.strptime('17:00',"%H:%M"),
        close_time=datetime.strptime('21:00',"%H:%M"),
        cuisine='Continental',
        capacity=80,
        )

    rest5 = Restaurant(
        name="O' by Claude Le Tohic", 
        owner_id=6,
        price_range=4, 
        address='165 Ofarrell St', 
        city='San Francisco', 
        state='CA',
        zip_code=94102,
        description="Located on the 5th floor of ONE65 San Francisco, O' is Chef Claude Le Tohic's inaugural solo venture after earning Meilleur Ouvrier de France, winning the James Beard Award for Best Chef in America and carrying the coveted 3-Michelin star rating at Joël Robuchon Las Vegas. Luxurious but not pretentious, O offers modern French cuisine with elegant and attentive service.",
        open_time=datetime.strptime('17:30',"%H:%M"),
        close_time=datetime.strptime('20:30',"%H:%M"),
        cuisine='French',
        capacity=60,
        )

    db.session.add(rest1)
    db.session.add(rest2)
    db.session.add(rest3)
    db.session.add(rest4)
    db.session.add(rest5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
