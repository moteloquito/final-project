from django.db.models import CharField, ForeignKey, Model
from django.contrib.auth.models import User

class Fondo(Model):
    name = CharField(max_length=64)
    description = CharField(max_length=64)
    owner = ForeignKey(User)

    def __unicode__(self):
        return self.name

    class Meta:
        db_table = 'fondo'
        app_label = 'fondo'
