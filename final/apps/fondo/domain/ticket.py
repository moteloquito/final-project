from django.db import models
from django.utils.translation import ugettext as _

from .petty_cash import PettyCash

TICKET_STATUS_CHOICES = (
    ('OPEN', _('Open')),
    ('SUBM', _('Submited')),
    ('APRV', _('Aproved')),
    ('REJE', _('Rejected')),
    ('CLOS', _('Closed')),
)


class Ticket(models.Model):

    ammount = models.DecimalField(verbose_name=_('ammount'), max_digits=10,
                                  decimal_places=2)
    description = models.CharField(verbose_name=_('description'),
                                   max_length=64)
    date = models.DateField(verbose_name=_('fecha'))
    petty_cash = models.ForeignKey(PettyCash)
    status = models.CharField(verbose_name=_('status'), max_length=4,
                              choices=TICKET_STATUS_CHOICES, default='OPEN')

    def __unicode__(self):
        return "%s - %s: %0.2f" % (self.petty_cash.name, self.description,
                                   self.value)

    class Meta:
        app_label = 'fondo'
        verbose_name = _('ticket')
        verbose_name_plural = _('tickets')
