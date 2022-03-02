import pandas as pd
import random

# ------------------------------------------------------------------------------------------------
# -----------------------------------##Read CSV##-------------------------------------------------
# ------------------------------------------------------------------------------------------------
def readCSVMoviesFrontend():
    movies_frontend = pd.read_csv('api_data/implementation - presentation - movies4_1496.csv', index_col=0)
    return movies_frontend

def readCSVMoviesBackend():
    movies_backend = pd.read_csv('api_data/implementation - presentation - movies5_1496.csv', index_col=0)
    return movies_backend

def readCSVCorr():
    corrMatrix = pd.read_csv('api_data/implementation - presentation - corrMatrix_1496.csv', index_col=0)
    return corrMatrix

def moviesDict():
    movies = readCSVMoviesBackend()
    movies_dict = pd.Series(movies.title.values,index=movies.id).to_dict()
    return movies_dict

def ratedListExtractor(rated_dict):
    rated_list = []
    for i in rated_dict:
        dict_value = list(i.values())
        if dict_value[1]>0:
            rated_list.append(dict_value)
    return rated_list

def getDataframeFromIDList(id_list, movies):
    return movies[movies['id'].isin(id_list)].sort_values(by='vote_average', ascending=False).values.tolist()

'''
-*-*-*-*-*-*-*-*-*-*-*-*-
        //COLLAB//
-*-*-*-*-*-*-*-*-*-*-*-*-
'''
def getSimilar(movie_id,rating, corrMatrix):
    similar_ratings = corrMatrix[str(movie_id)]*(rating-2.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
    return similar_ratings

def recommendCollab(movies_list, user_recommendations, corrMatrix):
    user_recommendations = user_recommendations + len(movies_list)
    
    similar_movies = pd.DataFrame()
    for movie,rating in movies_list:
        similar_movies = similar_movies.append(getSimilar(movie,rating, corrMatrix),ignore_index = True)
    recommend_list_collab = similar_movies.sum().sort_values(ascending=False).head(user_recommendations).index.tolist()
    
    movies_list_id=[i[0] for i in movies_list]
    recommend_id_collab = list(set(recommend_list_collab)-set(movies_list_id))[:user_recommendations-len(movies_list)]
    
    # returns id list of collaborative recommendations
    return recommend_id_collab
# ------------------------------------------------------------------------------------------------
# ------------------------------------##CONTENT##-------------------------------------------------
# ------------------------------------------------------------------------------------------------

# Cosine Similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def getSimilarity(movies):
    cv = CountVectorizer(max_features=1000, stop_words='english')
    vectors = cv.fit_transform(movies['tags']).toarray()
    similarity = cosine_similarity(vectors)
    return similarity

def recommendCosine(movie_id, number_of_recommendations, movies, similarity):
    recommend_list = []
    movie_index = movies[movies['id'] == movie_id].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)),reverse=True,key = lambda x: x[1])[1:number_of_recommendations+1]
    for i in movies_list:
        recommend_list.append(movies.iloc[i[0]].id)    
    return recommend_list
# ------------------------------------------------------------------------------------------------
# TFIDF Vectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

def getSigIndices(movies):
    tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents='unicode',
                        analyzer='word', token_pattern=r'\w{1,}', stop_words='english')
    tfv_matrix = tfv.fit_transform(movies['tags'])

    sig = sigmoid_kernel(tfv_matrix, tfv_matrix)
    indices = pd.Series(movies.index, index=movies['id']).drop_duplicates()

    return sig, indices
# ------------------------------------------------------------------------------------------------
# TFIDF Function
def recommendTFIDF(movie_id,number_of_recommendations, movies, sig, indices):
    recommend_list2 = []
    idx = indices[movie_id]
    sig_scores = list(enumerate(sig[idx]))
    sig_scores = sorted(sig_scores, key=lambda x:x[1], reverse=True)
    sig_scores = sig_scores[1:number_of_recommendations+1]
    movie_indices = [i[0] for i in sig_scores]
    for i in movie_indices:
        recommend_list2.append(movies['id'].iloc[i])
    return recommend_list2
# ------------------------------------------------------------------------------------------------
# NAMES TO ID & ID TO NAMES FUNCTION
def namesToId(movie_name, movies_dict):
    for keys,values in movies_dict.items():
        if values==movie_name:
            return keys

def idToNames(list, movies_dict):
    names_list = []
    for i in list:
        for keys,values in movies_dict.items():
            if keys==i:
                names_list.append(values)
    return names_list
# ------------------------------------------------------------------------------------------------
# Combine Two Recommendations Lists            
def combineLists(list1, list2):
    common_items = list(set(list1)&set(list2))
    full_list = list1+list2
    combinedList = []
    for i in full_list:
        if i not in common_items:
            combinedList.append(i)
    return combinedList
# ------------------------------------------------------------------------------------------------
# Content Recommendation List For One Movie
def recommendContentListOneMovie(common, combined, rec_num):
    recommend_content = []
    if len(common)<rec_num:
        recommend_content = common + combined[:rec_num-len(common)]
    else:
        recommend_content = common[:10]
    return recommend_content
# ------------------------------------------------------------------------------------------------
# Content Recommendation For One Movie
def recommendContentOneMovie(user_movie,user_recommendations, movies):

    similarity_for_cosine = getSimilarity(movies)
    recommend_id_cosine = recommendCosine(user_movie,user_recommendations, movies, similarity_for_cosine)

    sig_for_TFIDF, indices_for_TFIDF = getSigIndices(movies)
    recommend_id_tfidf = recommendTFIDF(user_movie,user_recommendations, movies, sig_for_TFIDF, indices_for_TFIDF)

    recommend_id_content_common = list( set(recommend_id_cosine) & set(recommend_id_tfidf) )
    recommend_id_content_common_sorted = movies[movies['id'].isin(recommend_id_content_common)].sort_values(by=['vote_average'], ascending=False)['id'].to_list()
    recommend_id_content_combined = combineLists(recommend_id_cosine, recommend_id_tfidf)
    recommend_id_content_combined_sorted = movies[movies['id'].isin(recommend_id_content_combined)].sort_values(by=['vote_average'], ascending=False)['id'].to_list()
    
    recommend_id_content_one_movie = []
    if len(recommend_id_content_common_sorted)<user_recommendations:
        recommend_id_content_one_movie = recommend_id_content_common_sorted + recommend_id_content_combined_sorted[:user_recommendations-len(recommend_id_content_common_sorted)]
    else:
        recommend_id_content_one_movie = recommend_id_content_common_sorted[:user_recommendations]
    
    return recommend_id_content_one_movie
# ------------------------------------------------------------------------------------------------
# Content Recommendation
def recommendContent(movies_list, user_recommendations, movies):
    high_rated_list = []
    for i in movies_list:
        if i[1]>=3:
            high_rated_list.append(i[0])

    recommend_id_content = []
    for i in high_rated_list:
        recommend_id_content = recommend_id_content + recommendContentOneMovie(i,user_recommendations, movies)

    recommend_id_content = random.sample(recommend_id_content, user_recommendations)
    return recommend_id_content

# ------------------------------------------------------------------------------------------------
# ------------------------------------####--------------------------------------------------
# ------------------------------------------------------------------------------------------------









