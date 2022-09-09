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
        cover='https://www.sonomamag.com/wp-content/uploads/2016/03/tomatina_rolls-1024x751.jpg',
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
        cover='https://cdn.vox-cdn.com/thumbor/0ZxhdtAiiq2-5HdY2PWyY6gUTyM=/0x0:2000x1333/1200x900/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/61896849/Abaca_PChang_0869.14.jpg',
        capacity=80,
        availability=80,
        )

    rest3 = Restaurant(
        name='Kokko', 
        owner_id=3,
        price_range=2, 
        address='509 2nd Ave', 
        city='San Mateo', 
        state='CA',
        zip_code=94401,
        description="Yakitori & other casual Japanese eats are provided along with house sake at this cozy urban hangout.",
        open_time='17:30',
        close_time='22:30',
        cuisine='Japanese',
        cover='https://www.restaurant-hospitality.com/sites/restaurant-hospitality.com/files/yardbird-hong-kong-yakitori.jpg',
        capacity=60,
        availability=60,
        )
        
    rest4 = Restaurant(
        name="Selby's", 
        owner_id=1,
        price_range=3, 
        address='3001 El Camino Real', 
        city='Redwood City', 
        state='CA',
        zip_code=94061,
        description="Located on the corners of Selby Lane and El Camino Real in the town of Atherton, Selby's celebrates classic American continental cuisine with a menu that showcases the restaurant’s unique relationship with SMIP Ranch. Please visit our website for updates.",
        open_time='17:00',
        close_time='21:00',
        cuisine='Continental',
        cover='https://cdn.vox-cdn.com/thumbor/WWyhxQ6soLNkhbVTAw_klkl_Rjo=/0x0:2000x1333/1200x0/filters:focal(0x0:2000x1333):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/18332488/Selbys_PChang_3072.jpg',
        capacity=80,
        availability=80,
        )

    rest5 = Restaurant(
        name="O' by Claude Le Tohic", 
        owner_id=2,
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
        owner_id=3,
        price_range=2, 
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
        owner_id=1,
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
        owner_id=2,
        price_range=2, 
        address='3052 Woodside Rd', 
        city='Woodside', 
        state='CA',
        zip_code=94062,
        description="The Village Bakery & Cafe is open! We are offering indoor and outdoor seating, takeout, and delivery daily. The bakery is also open, offering a selection of coffee drinks, freshly baked pastries and breads, sandwiches, and other sweet treats! We hope to see you soon.",
        open_time='09:00',
        close_time='15:00',
        cuisine='Café',
        cover='https://resizer.otstatic.com/v2/photos/wide-huge/1/25760295.jpg',
        capacity=60,
        availability=60,
        )

    rest9 = Restaurant(
        name="St. Francis Winery & Vineyards", 
        owner_id=3,
        price_range=3, 
        address='100 Pythian Rd', 
        city='Santa Rosa', 
        state='CA',
        zip_code=95409,
        description="Enjoy a nationally acclaimed, epicurean wine experience, surrounded by panoramic mountain and vineyard views. Executive Chef Peter Janiak presents an assortment of masterfully crafted, culinary wine pairings that highlight our award-winning wine collections and the bounty of Sonoma County.",
        open_time='10:00',
        close_time='17:00',
        cuisine='Winery',
        cover='https://www.worldclassweddingvenues.com/Images/worldclassweddingvenues/User_2159907/Venue_10217/8.jpg',
        capacity=800,
        availability=800,
        )

    rest10 = Restaurant(
        name="Sterling Vineyards", 
        owner_id=1,
        price_range=3, 
        address='1111 W Dunaweal Ln', 
        city='Calistoga', 
        state='CA',
        zip_code=94515,
        description="Sterling Vineyards is a winery near Calistoga, California, owned by Treasury Wine Estates. The winery achieved international recognition when its wine won first place in the Ottawa Wine Tasting of 1981.",
        open_time='10:00',
        close_time='17:00',
        cuisine='Winery',
        cover='https://3oly5t3jec7npg6my2x2pb41-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/250_Sterling-Vineyards_Featured.jpg',
        capacity=900,
        availability=900,
        )

    rest11 = Restaurant(
        name="Reposado Restaurant", 
        owner_id=2,
        price_range=3, 
        address='236 Hamilton Ave', 
        city='Palo Alto', 
        state='CA',
        zip_code=94301,
        description="Reposado offers a unique experience with exceptional Mexican cuisine which will challenge the imagination and seduce the palate.",
        open_time='16:00',
        close_time='20:00',
        cuisine='Mexican',
        cover='https://northwooddp.com/wp-content/uploads/Portfolio/Reposado/1-1024x689.jpg',
        capacity=100,
        availability=100,
        )

    rest12 = Restaurant(
        name="Broadway Masala", 
        owner_id=3,
        price_range=2, 
        address='2397 Broadway', 
        city='Redwood City', 
        state='CA',
        zip_code=94063,
        description="Broadway Masala invites you try our ever evolving Indian cuisine along with personalized service and beautiful ambiance. Our menu is carefully crafted with fresh seasonal and local produce and offering the diversity of regional Indian fare.",
        open_time='12:00',
        close_time='20:00',
        cuisine='Indian',
        cover='https://duyt4h9nfnj50.cloudfront.net/resized/22bf9fec1d37813856f1d8e7151ac189-w2880-42.jpg',
        capacity=90,
        availability=90,
        )

    db.session.add(rest1)
    db.session.add(rest2)
    db.session.add(rest3)
    db.session.add(rest4)
    db.session.add(rest5)
    db.session.add(rest6)
    db.session.add(rest7)
    db.session.add(rest8)
    db.session.add(rest9)
    db.session.add(rest10)
    db.session.add(rest11)
    db.session.add(rest12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
