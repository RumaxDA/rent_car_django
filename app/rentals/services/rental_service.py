import datetime

def get_max_date():
    return datetime.date.today()+ datetime.timedelta(days=365*5)