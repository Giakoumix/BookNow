
from ...models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Create a super user for admin panel'

    def handle(self, *args, **options):
        superuser = User.objects.create_superuser(
            email = 'admin@gmail.com',
            password = 'egoeimai7'
        )
        # return superuser