# Generated by Django 4.1.3 on 2022-11-19 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_movie_genres'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchingrecord',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='main.movie'),
        ),
    ]
