from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload, Load, subqueryload
from app.models import db, Review
from app.forms import ReviewForm
from datetime import datetime, date
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews',__name__)
today = date.today()

@review_routes.route('/myreviews/',methods=['GET'])
@review_routes.route('/myreviews',methods=['GET'])
@login_required
def my_reviews():
    uid = current_user.id
    reviews = db.session.query(Review).filter(Review.user_id == uid).all()
    reviews_list=[]
    # if restaurants is not None:
    if reviews is not None and len(reviews) > 0:
        for each in reviews:
            review_dict = each.to_dict()
            reviews_list.append(review_dict)
        return {'reviews': reviews_list}
    else:
        return {'reviews': []}

@review_routes.route('/',methods=['POST'])
@review_routes.route('',methods=['POST'])
@login_required
def review_create():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            food=form.data['food'],
            service=form.data['service'],
            ambience=form.data['ambience'],
            overall=form.data['overall'],
            review_body=form.data['review_body'],
            created_at=today,
            updated_at=today,
            user_id=current_user.id,
            restaurant_id=form.data['restaurant_id'],
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)},400
    
@review_routes.route('/myreviews/<int:id>/',methods=['PUT'])
@review_routes.route('/myreviews/<int:id>',methods=['PUT'])
@login_required
def review_edit(id):
    editreview = Review.query.get(id)
    if editreview is not None:
        editreview_todict = editreview.to_dict()
        if editreview_todict['user_id'] != current_user.id:
            return {'errors':["You cannot edit the review that doesn't belong to you."]},403
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            for i in form.data:
                if i != 'csrf_token' and i != 'created_at' and i != 'restaurant_id':
                    setattr(editreview,i,form.data[i])
            db.session.commit()
            return editreview.to_dict()
        return {'errors':validation_errors_to_error_messages(form.errors)},400
    else:
        return {'errors': ['Review is not found.']},404


@review_routes.route('/myreviews/<int:id>/',methods=['DELETE'])
@review_routes.route('/myreviews/<int:id>',methods=['DELETE'])
@login_required
def review_delete(id):
    # review = db.session.query(Review).get(id)
    review = Review.query.get(id)
    review_todict = review.to_dict()
    if current_user.id != review_todict['user_id']:
        return {'errors':["You could not delete a review that doesn't belong to you."]},403
    if review is not None:
        db.session.delete(review)
        db.session.commit()
        return {'deleted review':review_todict}
    else:
        return {'errors':['Review not found.']},404
