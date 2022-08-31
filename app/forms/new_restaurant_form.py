from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, DateTimeField, TimeField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange,Length, URL, StopValidation
from app.models import Restaurant
from datetime import datetime, date, timedelta

# today = date.today()
# present = datetime.now()

class RestaurantForm(FlaskForm):

    def validate_time(form,field):
        if field.data and field.data is None or not isinstance(field.data, datetime):
            raise ValidationError('Please specify your business hours.')
    
    def validate_string(form,field):
        if field.data and field.data != str(field.data):
            raise StopValidation('This input must be a string.')

    def validate_integer(form,field):
        if field.data and field.data != int(field.data):
            raise StopValidation('This input must be an integer.')

    name =StringField('name',validators=[validate_string,DataRequired(),Length(min=3,max=50)])
    price_range = IntegerField('price_range',validators=[validate_integer,DataRequired()])
    address = StringField('address',validators=[validate_string,DataRequired(),Length(min=3,max=50)])
    city = StringField('city',validators=[validate_string,DataRequired(),Length(min=3,max=30)])
    state = StringField('state',validators=[validate_string,DataRequired(),Length(min=2,max=20)])
    zip_code = IntegerField('zip_code',validators=[validate_integer,DataRequired(),NumberRange(min=10000,max=99999)])
    description = TextAreaField('description',validators=[Length(max=50)])
    capacity = IntegerField('capacity',validators=[validate_integer,DataRequired(),NumberRange(min=1,max=300)])
    # open_time = TimeField('open_time',validators=[validate_time, DataRequired()])
    # close_time = TimeField('close_time',validators=[validate_time, DataRequired()])
    cuisine = StringField('cuisine',validators=[validate_string,DataRequired(),Length(min=1,max=20)])
