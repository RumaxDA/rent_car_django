from django.contrib import admin
from .models.rental import Rental

@admin.register(Rental)
class AdminRental(admin.ModelAdmin):
    list_display = ("user", "car", "start_date", "end_date", "total_price", "status")

    list_editable = ('status',)

    list_filter = ('status', 'start_date')

    search_fields = ('user__email', 'car__brand', 'car__model')

    fieldsets = (
        ('General informations', {
        'fields':('user', 'car', 'status')
    }),
    ('Terminy',{
        'fields':('start_date', 'end_date','actual_return_date')
    }),
    ('Dane techniczne i koszty', {
        'fields':('start_mileage', 'end_mileage', 'total_price'),
        'classes': ('collapse',),
    }),
    )