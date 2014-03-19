from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _

NONE = 'NO'
REGULAR = 'RE'
ADMIN = 'AD'

USER_TYPE_CHOICES = (
    (NONE, _('user_type_none')),
    (REGULAR, _('user_type_egular')),
    (ADMIN, _('user_type_admin')),
)


class CustomUser(models.Model):

    user = models.OneToOneField(User)
    user_type = models.CharField(verbose_name=_('user_type'), max_length=2,
                                 choices=USER_TYPE_CHOICES, default=NONE)

    class Meta():
        verbose_name = _('custom_user')
        verbose_name_plural = _('custom_user_plural')

