# Generated by Django 4.1.3 on 2022-11-19 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_remove_movie_episode_remove_movie_is_serie_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movie',
            name='imdb_id',
        ),
        migrations.AddField(
            model_name='movie',
            name='display',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
