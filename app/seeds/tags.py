from app.models import db, Tag


# Adds a demo user, you can add other users here if you want
def seed_tags():
    v1 = Image(review_id=1, category='Great for Groups')
    v2 = Image(review_id=1, category='Great for Family')
    v3 = Image(review_id=1, category='Special Occasion')
    v4 = Image(review_id=1, category='Business')
    v5 = Image(review_id=1, category='Casual')
    v6 = Image(review_id=1, category='Authentic')
    v7 = Image(review_id=1, category='Happy Hour')
    v8 = Image(review_id=1, category='Live Music')
    v9 = Image(review_id=1, category='Good Vegetarian Options')
    v10 = Image(review_id=1, category='Gluten Free Options')

    

    db.session.add(v1)
    db.session.add(v2)
    db.session.add(v3)
    db.session.add(v4)
    db.session.add(v5)
    db.session.add(v6)
    db.session.add(v7)
    db.session.add(v8)
    db.session.add(v9)
    db.session.add(v10)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
