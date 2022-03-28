import warnings
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from tqdm import tqdm
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from operator import itemgetter

# ------------------------------------------------------------------------------------------------
# -----------------------------------##Read CSV##-------------------------------------------------
# ------------------------------------------------------------------------------------------------


def readCSVSongs():
    data = pd.read_csv('api_data/data3_8010.csv')
    return data

# -------------------------------------------------------

def getDataframeFromIDList(data, id_list):
    return data[data['id'].isin(id_list)].values.tolist()

# -------------------------------------------------------

def addFeaturesColumn(data):
    datatypes        = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']
    normalization    = data.select_dtypes(include=datatypes)
    kmeans           = KMeans(n_clusters=10)
    features         = kmeans.fit_predict(normalization)
    data['features'] = features
    return data
# --------------------------------------------------------

def getNamesfromID(songs_list, id_names_list):
    output = list()
    for i in songs_list:
        for j in id_names_list:
            if j[0]==i:
                output.append(j[1])
    return output

# --------------------------------------------------------

def recommendOneSong(data, input_song_id, no_of_recommendations=10):
    
    distance = list()
    print("Input song ID for recommendOneSong Function = ",input_song_id)
    song = data[data['id'] == input_song_id].head(1).values[0]
    recommendations = data[data['id'] != input_song_id]
    
    for input_song_id in tqdm(recommendations.values):
        distance_temp = 0
        for col in np.arange(len(recommendations.columns)):
            if not col in [0,1,2,3,4,5,18]:
                distance_temp = distance_temp + np.absolute(float(song[col]) - float(input_song_id[col]))
        distance.append(distance_temp)
    recommendations['distance'] = distance
    recommendations = recommendations.sort_values(by = 'distance').drop_duplicates(subset = 'url')
    
    return recommendations.head(no_of_recommendations).values.tolist()

# --------------------------------------------------------

def ratedListExtractor(rated_songs_dict):
    high_rated_list = []
    
    for i in rated_songs_dict:
        dict_value = list(i.values())
        print(dict_value)
        if dict_value[1] >= 3:
            high_rated_list.append(dict_value[0])
            print("-> selected = ", dict_value[0])
    return high_rated_list
# --------------------------------------------------------

def recommendSongs(data, rated_songs_dict, no_of_recommendations):
    
    high_rated_list = ratedListExtractor(rated_songs_dict)
    print("\nHIGH RATED LIST", high_rated_list)
    recommendations = []
    for i in high_rated_list:
        recommendations = recommendations + recommendOneSong(data, i, no_of_recommendations)
        
    print("\n\nRECOMMEND LISTS of LISTS executed")
    # print(recommendations)
    # recommend_all_songs = sorted(recommendations, key = itemgetter(20))
    # print("\n\nRECOMMEND ALL SONGS")
    # print(recommend_all_songs)
    
    recommend_final_id_list = []
    for i in recommendations[:no_of_recommendations]:
        recommend_final_id_list.append(i[0])
    
    # recommend_final_id_list = []
    # for i in recommend_all_songs[:no_of_recommendations]:
    #     recommend_final_id_list.append(i[0])
    
    return recommend_final_id_list


# data = addFeaturesColumn(readCSVSongs())
# id_names_list = data[['id','name']].values.tolist()

# random_songs_list = data.sample(5).id.values.tolist()
# ratings_list = [5,3,2,1,5]

# rated_songs_dict = {random_songs_list[i]: ratings_list[i] for i in range(len(ratings_list))}
  
#no_of_recommendations = 20


#recommendations_id_list = recommendSongs(data, rated_songs_dict, no_of_recommendations)
#recommendations_export = getDataframeFromIDList(data, recommendations_id_list)
