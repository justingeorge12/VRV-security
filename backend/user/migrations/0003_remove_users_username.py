# Generated by Django 5.1.4 on 2024-12-08 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_users_managers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='username',
        ),
    ]
