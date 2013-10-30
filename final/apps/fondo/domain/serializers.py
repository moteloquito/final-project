from final.apps.fondo.models import Fondo, Ticket
from rest_framework import serializers

class FondoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta():
        model = Fondo
        fields = ('id', 'name', 'description')

class TicketSerializer(serializers.HyperlinkedModelSerializer):

    class Meta():
        model = Ticket
        fields = ('id', 'description', 'value', 'date')
