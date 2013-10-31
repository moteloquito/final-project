from final.apps.fondo.models import Fondo, Ticket
from rest_framework import serializers
from django.core import serializers as sers
from django.utils.encoding import smart_text

class FondoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta():
        model = Fondo
        fields = ('id', 'name', 'description')

class TicketSerializer(serializers.HyperlinkedModelSerializer):

    class Meta():
        model = Ticket
        fields = ('id', 'description', 'value', 'date')


class QuerySetSerializer(sers.get_serializer('json')):
    
    def get_dump_object(self, obj):

        self._current["id"] = smart_text(obj._get_pk_val(), strings_only=True)
        return self._current
