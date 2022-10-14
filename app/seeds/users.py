from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo',last_name='Lition',email='demo@aa.io', password='password')
    bobbie = User(
        username='Bobbie',first_name='Bobbie',last_name='Axelrod', email='bobbie@aa.io', password='password')
    alice = User(
        username='Alice',first_name='Alice',last_name='Li', email='alice@aa.io', password='password')
    grace = User(
        username='Grace',first_name='Grace',last_name='Cn', email='grace@aa.io', password='password')
    lucas = User(
        username='Lucas', first_name='Lucas',last_name='Hg',email='lucas@aa.io', password='password')
    remi = User(
        username='Remi', first_name='Remi',last_name='Hg',email='remi@aa.io', password='password')

    db.session.add(demo)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(grace)
    db.session.add(lucas)
    db.session.add(remi)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
