# Generated by Django 3.0.6 on 2020-05-31 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='null', max_length=50, unique=True),
        ),
    ]