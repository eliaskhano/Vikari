import datetime
import json

from App.settings import MOVIE_STARTING_INFO_AP, MOVIE_STARTING_INFO_DP, MOVIE_STARTING_INFO_NF, MOVIE_STARTING_INFO_TN 

from .models import Movie





def populate_db():
    counter = 0 
    files = [MOVIE_STARTING_INFO_NF, MOVIE_STARTING_INFO_TN]

    for data in files:
        with open(data, "r") as f:
            jsondata = json.load(f)

            for entry in jsondata:
                
                if (not (Movie.objects.filter(title = entry.get('title')).exists())) and entry.get('year'):
                    display = f"{entry.get('title')} ({int(float(entry.get('year')))})" 

                    mov = Movie.objects.create(
                        display = display,
                        f_id = entry.get("id"),
                        title = entry.get("title"),
                        o_title = entry.get("otitle"), 

                        directors = entry.get("directors"),
                        actors = entry.get("actors"),
                        banners = entry.get("banners"),
                        posters = entry.get("posters"),
                        genres = entry.get("genres"),
                        provider_name = entry.get("provider"),
                        language = entry.get("language"),

                        year = int(float(entry.get('year'))),
                        date_added = datetime.datetime.strptime(entry.get("added"), "%Y-%m-%d %H:%M:%S"),

                        fsk = int(entry.get("fsk")), 
                    
                    )
            
                    mov.save()
                    counter += 1 

                    print(f"[{counter}] {entry.get('title')}")
                
            

                