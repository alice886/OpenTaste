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
        description=" You're always welcome at San Mateo Tomatina, our family-friendly Italian restaurant at the corner of 4th and B Streets in the heart of downtown San Mateo just off Highway 101. ",
        # open_time=datetime.strptime('12:00',"%H:%M").time(),
        # close_time=datetime.strptime('20:00',"%H:%M").time(),
        open_time='12:00',
        close_time='20:00',
        cuisine='Italian',
        cover='https://secdn.azureedge.net/-/media/tomatina/images/content/locations/location-walnutcreek.ashx',
        capacity=80,
        availability=80,
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
        open_time='12:00',
        close_time='22:00',
        cuisine='Filipino',
        cover='https://images.otstatic.com/prod1/29407152/1/huge.jpg',
        capacity=80,
        availability=80,
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
        open_time='17:30',
        close_time='22:30',
        cuisine='Japanese',
        cover='http://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/034/440/medium/grilled-chicken-yakitori-japan.jpg?2020',
        capacity=60,
        availability=60,
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
        open_time='17:00',
        close_time='21:00',
        cuisine='Continental',
        cover='https://images.squarespace-cdn.com/content/v1/5c775eb2e8ba44133a189651/1563183445551-T5MW50BV4BN6V1NXF87H/DR_Detail.jpg?format=2500w',
        capacity=80,
        availability=80,
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
        open_time='17:30',
        close_time='20:30',
        cuisine='French',
        cover='https://resizer.otstatic.com/v2/photos/wide-huge/1/28411463.jpg',
        capacity=60,
        availability=60,
        )

    rest6 = Restaurant(
        name="Paul Martin's", 
        owner_id=8,
        price_range=3, 
        address='101 Hillsdale Shopping Center', 
        city='San Mateo', 
        state='CA',
        zip_code=94403,
        description="At Paul Martin's American Grill, our passion is simple: elevate America's classic cuisine by using only the highest quality, best tasting ingredients.",
        open_time='11:30',
        close_time='21:00',
        cuisine='American',
        cover='https://paulmartinsamericangrill.com/wp-content/uploads/2017/04/Paul-Martins-American-Grill-San-Mateo-2.jpg',
        capacity=60,
        availability=60,
        )
    rest7 = Restaurant(
        name="The Rotunda at Neiman Marcus", 
        owner_id=4,
        price_range=3, 
        address='150 Stockton St Level Four', 
        city='San Francisco', 
        state='CA',
        zip_code=94108,
        description="THE ROTUNDA located in Neiman Marcus SAN FRANCISCO is open to safe, socially distanced, dine in seating, in accordance with local jurisdiction guidelines.",
        open_time='11:00',
        close_time='16:00',
        cuisine='American',
        cover='https://s3.amazonaws.com/sfc-datebook-wordpress/wp-content/uploads/sites/2/2021/06/MER2016112113283482_bravo0621-1024x683.jpg',
        capacity=60,
        availability=60,
        )

    rest8 = Restaurant(
        name="The Village Bakery and Cafe", 
        owner_id=7,
        price_range=3, 
        address='3052 Woodside Rd', 
        city='Woodside', 
        state='CA',
        zip_code=94062,
        description="The Village Bakery & Cafe is open! We are offering indoor and outdoor seating, takeout, and delivery daily. The bakery is also open, offering a selection of coffee drinks, freshly baked pastries and breads, sandwiches, and other sweet treats! We hope to see you soon.",
        open_time='09:00',
        close_time='15:00',
        cuisine='Café',
        cover='https://images.squarespace-cdn.com/content/v1/59532dc336e5d316f68a77ef/1506572787430-OM63B3SFLTTA4N98P9QN/VillageBakery_001.png?format=2500w',
        capacity=60,
        availability=60,
        )

    db.session.add(rest1)
    db.session.add(rest2)
    db.session.add(rest3)
    db.session.add(rest4)
    db.session.add(rest5)
    db.session.add(rest6)
    db.session.add(rest7)
    db.session.add(rest8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
