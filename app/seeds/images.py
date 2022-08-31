from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    t1 = Image(restaurant_id=1, img='https://opentastebucket.s3.us-west-1.amazonaws.com/tomatina-01.png')
    t2 = Image(restaurant_id=1, img='https://opentastebucket.s3.us-west-1.amazonaws.com/tomatina-02.jpeg')
    t3 = Image(restaurant_id=1, img='https://opentastebucket.s3.us-west-1.amazonaws.com/tomatina-03.jpeg')
    t4 = Image(restaurant_id=1, img='https://opentastebucket.s3.us-west-1.amazonaws.com/tomatina-04.jpeg')
    t5 = Image(restaurant_id=1, img='https://opentastebucket.s3.us-west-1.amazonaws.com/tomatina-05.jpeg')
    s1 = Image(restaurant_id=4, img='https://opentastebucket.s3.us-west-1.amazonaws.com/selbys-01.png')
    s2 = Image(restaurant_id=4, img='https://opentastebucket.s3.us-west-1.amazonaws.com/selbys-02.jpeg')
    s3 = Image(restaurant_id=4, img='https://opentastebucket.s3.us-west-1.amazonaws.com/selbys-03.jpeg')
    s4 = Image(restaurant_id=4, img='https://opentastebucket.s3.us-west-1.amazonaws.com/selbys-04.jpg')
    

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
