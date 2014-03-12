from django.db import models
from django.utils.translation import ugettext as _

NONE = 'NO'
REGULAR = 'RE'
ADMIN = 'AD'

USER_TYPE_CHOICES = (
    (NONE, _('None')_),
    (REGULAR, _('Regular')_),
    (ADMIN, _('Admin')_,
)

class CustomUser(models.Model):

    user = models.ForeignKey(User)
    user_type = modles.CharField(verbose_name=_('user_type'), max_length=2, choices=USER_TYPE_CHOICES, default=NONE)

    class Meta():
        verbose_name = _('custom_user')
        verbose_name_plural = _('custom_user_plural')_

