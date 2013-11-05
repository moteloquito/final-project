from django.db.models import CharField, DateTimeField, ForeignKey, Model, TextField
from final.apps.iturns.models import Calendar


class Event(Model):

    start = DateTimeField()
    end = DateTimeField()
    title = CharField(max_length=64)
    description = TextField(max_length=64, null=True, blank=True)
    calendar = ForeignKey(Calendar)

    def __unicode__(self):
        return self.description

    class Meta:
        db_table = 'event'
        app_label = 'iturns'
        
