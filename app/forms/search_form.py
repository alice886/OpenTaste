from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, DateTimeField, TimeField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange,Length, URL, StopValidation
from app.models import Restaurant
from datetime import datetime, date, timedelta

class SearchForm(FlaskForm):
    
    # def validateValidInput(form, field):
    #     if

    search_date = DateField('search_date',validators=[])
    search_time = TimeField('search_time',validators=[])
    key_word = StringField('key_word', validators=[Length(max=100)])
