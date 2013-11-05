from django.db.models import CharField, ForeignKey, Model, SlugField
from django.contrib.auth.models import User


class Calendar(Model):

    name = CharField(max_length=64)
    slug = SlugField(max_length=32)
    owner = ForeignKey(User)

    def __unicode__(self):
        return self.name

    class Meta:
        db_table = 'calendar'
        app_label = 'iturns'
