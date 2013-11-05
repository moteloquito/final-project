from django.db.models import CharField, DateField, DecimalField, ForeignKey, Model
from final.apps.fondo.models import Fondo

TICKET_STATUS_CHOICES = (
    ('OPEN', 'Open'),
    ('SUBM', 'Submited'),
    ('APRV', 'Aproved'),
    ('REJE', 'Rejected'),
    ('CLOS', 'Closed'),
)


class Ticket(Model):
    value = DecimalField(max_digits=10, decimal_places=2)
    description = CharField(max_length=64)
    date = DateField()
    fondo = ForeignKey(Fondo)
    status = CharField(max_length=4, choices=TICKET_STATUS_CHOICES, default='OPEN')

    def __unicode__(self):
        return "%s - %s: %0.2f" % (self.fondo.name, self.description, self.value)

    class Meta:
        db_table = 'ticket'
        app_label = 'fondo'
