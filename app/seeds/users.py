from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo',last_name='Lition',email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', first_name='Marnie',last_name='Armani',email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie',first_name='Bobbie',last_name='Axelrod', email='bobbie@aa.io', password='password')
    lucas = User(
        username='lucas', first_name='Lucas',last_name='H',email='lucas@aa.io', password='password')
    remi = User(
        username='remi', first_name='Remi',last_name='H',email='remi@aa.io', password='password')
    jiu = User(
        username='99',first_name='jiujiu',last_name='Z', email='99@aa.io', password='password')
    grace = User(
        username='grace',first_name='grace',last_name='C', email='grace@aa.io', password='password')
    alice = User(
        username='alice',first_name='alice',last_name='L', email='alice@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(lucas)
    db.session.add(remi)
    db.session.add(jiu)
    db.session.add(grace)
    db.session.add(alice)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
