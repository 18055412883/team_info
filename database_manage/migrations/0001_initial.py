# Generated by Django 2.2.2 on 2021-03-19 12:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='operate_log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operate_user_id', models.CharField(max_length=255)),
                ('operate_user_name', models.CharField(max_length=255)),
                ('operate_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('operate_type', models.IntegerField(null=True)),
                ('operate_remark', models.TextField(null=True)),
                ('operate_details', models.TextField(null=True)),
                ('ready', models.CharField(default='这是一个备用字段', max_length=255)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]