from django.db import models
from django.utils.translation import ugettext as _

from final.apps.users.models import CustomUser


class PettyCash(models.Model):

    name = models.CharField(verbose_name=_('name'), max_length=64)
    description = models.CharField(verbose_name=_('description'),
                                   max_length=64)
    owner = models.ForeignKey(CustomUser, related_name=_('owner'))
    administrator = models.ForeignKey(CustomUser,
                                      related_name=_('administrator'))
    max_ammount = models.DecimalField(verbose_name=_('ammount'), max_digits=8,
                                      decimal_places=2)

    def __unicode__(self):
        return self.name

    class Meta():
        app_label = 'fondo'
        verbose_name = _('petty_cash')
        verbose_name_plural = _('petty_cash_plural')
