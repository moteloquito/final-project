from django.db.models import CharField, DateField, DecimalField, ForeignKey, Model
from final.apps.fondo.models import Fondo

class Ticket(Model):
    value = DecimalField(max_digits=10, decimal_places=2)
    description = CharField(max_length=64)
    date = DateField()
    fondo = ForeignKey(Fondo)

    class Meta:
        db_table = 'ticket'
        app_label = 'fondo'
