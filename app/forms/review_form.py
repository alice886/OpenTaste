from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, DateTimeField, TimeField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange,Length, URL, StopValidation
from app.models import Review

class ReviewForm(FlaskForm):
    
    def validate_string(form,field):
        if field.data and field.data != str(field.data):
            raise StopValidation('This input must be a string.')

    def validate_integer(form,field):
        if field.data and field.data != int(field.data):
            raise StopValidation('This input must be an integer.')

    # def validate_length(form,field):
    #     if len(field.data) != 6:
    #         raise StopValidation('This confirmation number should be 6 digit.')

    food = IntegerField('food',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=5)])
    service = IntegerField('service',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=5)])
    ambience = IntegerField('ambience',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=5)])
    overall = IntegerField('value',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=5)])
    review_body = StringField('state',validators=[validate_string,Length(min=0,max=500)])
    restaurant_id = IntegerField('restaurant_id',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=100)])
