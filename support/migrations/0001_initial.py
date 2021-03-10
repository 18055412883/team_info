# Generated by Django 2.2.2 on 2021-03-06 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='support',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spType', models.IntegerField()),
                ('spname', models.CharField(max_length=255)),
                ('spurl', models.URLField()),
                ('mainBody', models.TextField()),
                ('status', models.IntegerField()),
            ],
        ),
    ]
