from final.apps.fondo.models import Fondo
from rest_framework import serializers

class FondoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta():
        model = Fondo
        fields = ('id', 'name', 'description')
