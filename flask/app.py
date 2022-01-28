from flask import Flask, make_response,request , jsonify
from flask_jsonpify import jsonpify
import json
import pandas as pd
import Movie

app = Flask(__name__)
# GET METHODS
@app.route('/movies',methods=['GET','POST'])
def movies():
    # For movies Dataframe
    movies = Movie.readCSVMoviesFrontend()
    return jsonpify(movies.values.tolist())

@app.route('/movies_votes',methods=['GET','POST'])
def moviesSortByVoteAverage():
    movies = Movie.readCSVMoviesFrontend()
    movies_sort_by_votes = movies.sort_values(by='vote_average', ascending=False)
    return jsonpify(movies_sort_by_votes.values.tolist())

@app.route('/books',methods=['GET','POST'])
def books():
    return {'userid':2,
            'title': 'books '}

@app.route('/songs',methods=['GET','POST'])
def songs():
    return {'userid':3,
            'title': 'songs '}
    
    
# POST METHODS
@app.route('/recommendmovie',methods=['POST'])
def recommendmovie():
    Rated_data = request.get_json()
    movies_list = Movie.ratedListExtractor(Rated_data)
    user_recommendations = 10
    
    movies = Movie.readCSVMoviesBackend()
    corrMatrix = Movie.readCSVCorr()
    
    collab = Movie.recommendCollab(movies_list, user_recommendations, corrMatrix)
    content = Movie.recommendContent(movies_list, user_recommendations, movies)

    # collab_dataframe = jsonpify(Movie.getDataframeFromIDList(collab))
    # content_dataframe = jsonpify(Movie.getDataframeFromIDList(content))

    print(movies[movies['id'].isin(collab)].sort_values(by='vote_average', ascending=False).values.tolist())
    print("\n\n\n")
    print(movies[movies['id'].isin(content)].sort_values(by='vote_average', ascending=False).values.tolist())
    
    return make_response('Done',201)
    
if __name__ == "__main__":
    app.run(debug=True) 