from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, DateTimeField, TimeField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange,Length, URL, StopValidation
from app.models import Restaurant
from datetime import datetime, date, timedelta

# today = date.today()
# present = datetime.now()

class ReservationForm(FlaskForm):

    def validate_time(form,field):
        if field.data and field.data is None or not isinstance(field.data, datetime):
            raise ValidationError('Please specify your business hours.')
    
    def validate_string(form,field):
        if field.data and field.data != str(field.data):
            raise StopValidation('This input must be a string.')

    def validate_integer(form,field):
        if field.data and field.data != int(field.data):
            raise StopValidation('This input must be an integer.')

    def validate_length(form,field):
        if len(field.data) != 6:
            raise StopValidation('This confirmation number should be 6 digit.')

    party_size = IntegerField('party_size',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=100)])
    reserve_date = DateField('reserve_date',validators=[DataRequired()])
    reserve_time = TimeField('reserve_time',validators=[DataRequired()])
    occasion = StringField('occasion',validators=[validate_string,Length(min=1,max=30)])
    special_request = StringField('state',validators=[validate_string,Length(min=1,max=200)])
    user_id = IntegerField('user_id',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=100)])
    restaurant_id = IntegerField('restaurant_id',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=100)])
    # confirmation_number = StringField('description',validators=[DataRequired()])
