from flask import Flask, make_response,request , jsonify
from flask_jsonpify import jsonpify
import json
import pandas as pd
import Movie
import Book
import Song

movies_recommend_final = []
books_recommend_final = []
songs_recommend_final = []
filtered_movies = []

def recommendMovieFunction(Rated_data):

    movies_list = Movie.ratedListExtractor(Rated_data)
    user_recommendations = 12
    
    movies = Movie.readCSVMoviesBackend()
    corrMatrix = Movie.readCSVCorr()
    
    collab = Movie.recommendCollab(movies_list, user_recommendations, corrMatrix)
    content = Movie.recommendContent(movies_list, user_recommendations, movies)
    
    movies_recommend_final_id_list = collab + content
    global movies_recommend_final 
    movies_recommend_final = movies[movies['id'].isin(movies_recommend_final_id_list)].sort_values(by='vote_average', ascending=False).values.tolist()

    return None

def recommendBookFunction(Rated_data):

    books_list = Book.ratedListExtractor(Rated_data)
    user_recommendations = 12
    
    books = Book.readCSVBooks()
    countries_combine_pivot = Book.readCSVPivotTable()
    
    collab = Book.recommendCollab(books, countries_combine_pivot, books_list, user_recommendations)
    
    books_recommend_final_names_list = collab
    global books_recommend_final 
    books_recommend_final = Book.getBooksDataframeFromNames(books, books_recommend_final_names_list).values.tolist()

    return None

def recommendSongFunction(Rated_data):

    # songs_list = Song.ratedListExtractor(Rated_data)
    no_of_recommendations = 21
    
    songs = Song.readCSVSongs()
    
    recommendations_id_list = Song.recommendSongs(songs, Rated_data, no_of_recommendations)
    
    songs_recommend_final_names_list = recommendations_id_list
    global songs_recommend_final
    songs_recommend_final = Song.getDataframeFromIDList(songs, songs_recommend_final_names_list)
    
    
    return None



app = Flask(__name__)
# GET METHODS
# movies get
@app.route('/movies',methods=['GET'])
def movies():
    # For movies Dataframe
    movies = Movie.readCSVMoviesFrontend()
    return jsonpify(movies.values.tolist())

@app.route('/movies_votes',methods=['GET'])
def moviesSortByVoteAverage():
    movies = Movie.readCSVMoviesFrontend()
    movies_sort_by_votes = movies.sort_values(by='vote_average', ascending=False).head(50).sample(16)
    return jsonpify(movies_sort_by_votes.values.tolist())

# filtered list return
@app.route('/filtered',methods=['GET'])
def filtered():
    print(filtered_movies.values.tolist())
    return jsonpify(filtered_movies.values.tolist())

# POST METHODS
@app.route('/filter',methods=['POST'])
def filter():
    filter = request.get_json()    
    filtered_genres_list = []

    for keys, values in filter['filter'].items():
        if values==True:
            filtered_genres_list.append(keys)
    
    print(filtered_genres_list)

    movies = Movie.readCSVMoviesFrontend()
    filtered_movies = Movie.getDataframeFromIDList(movies, Movie.findMovieIDbyGenre(movies, filtered_genres_list)).head(30).sample(16)

    
    return "Done", 201

@app.route('/recommendmovie',methods=['POST'])
def recommendmovie():
    Rated_data = request.get_json()    
    recommendMovieFunction(Rated_data)
    return "Done", 201

@app.route('/movie_result',methods=['GET'])
def moviesresult():
#    get final data
    # print(movies_recommend_final)
    return jsonpify(movies_recommend_final)

@app.route('/books',methods=['GET','POST'])
def books():
    # For Books Dataframe
    books = Book.readCSVBooks()
    return jsonpify(books.values.tolist())

@app.route('/books_votes',methods=['GET'])
def booksSortByVoteAverage():
    books = Book.readCSVBooks()
    books_sort_by_votes = books.sort_values(by='Avg-Rating', ascending=False).head(50).sample(16)
    return jsonpify(books_sort_by_votes.values.tolist())

@app.route('/recommendbook',methods=['POST'])
def recommendbook():
    Rated_data = request.get_json()
    print("/recommendbook started")
    recommendBookFunction(Rated_data)
    print(books_recommend_final)

    return "Done", 201

@app.route('/book_result',methods=['GET'])
def booksresult():
#    get final data
    # print(books_recommend_final)
    return jsonpify(books_recommend_final)


@app.route('/songs',methods=['GET','POST'])
def songs():
    # For Songss Dataframe
    songs = Song.readCSVSongs()
    return jsonpify(songs.values.tolist())

@app.route('/songs_popularity',methods=['GET'])
def songsSortByPopularity():
    songs = Song.readCSVSongs()
    songs_sort_by_votes = songs.sort_values(by='popularity', ascending=False).head(100).sample(16)
    return jsonpify(songs_sort_by_votes.values.tolist())

@app.route('/recommendsong',methods=['POST'])
def recommendsong():
    Rated_data = request.get_json()
    print("/recommendsong started")
    recommendSongFunction(Rated_data)
    print(songs_recommend_final)

    return "Done", 201

@app.route('/song_result',methods=['GET'])
def songsresult():
#    get final data
    # print(books_recommend_final)
    return jsonpify(songs_recommend_final)
    
    
    

    
if __name__ == "__main__":
    
    app.run(debug=True) 