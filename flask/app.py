from flask import Flask, make_response,request , jsonify
from flask_jsonpify import jsonpify
import json
import pandas as pd
import Movie

movies_recommend_final = []

def recommendMovieFunction(Rated_data):

    movies_list = Movie.ratedListExtractor(Rated_data)
    user_recommendations = 10
    
    movies = Movie.readCSVMoviesBackend()
    corrMatrix = Movie.readCSVCorr()
    
    collab = Movie.recommendCollab(movies_list, user_recommendations, corrMatrix)
    content = Movie.recommendContent(movies_list, user_recommendations, movies)
    
    movies_recommend_final_id_list = collab + content
    global movies_recommend_final 
    movies_recommend_final = movies[movies['id'].isin(movies_recommend_final_id_list)].sort_values(by='vote_average', ascending=False).values.tolist()

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
    movies_sort_by_votes = movies.sort_values(by='vote_average', ascending=False)
    return jsonpify(movies_sort_by_votes.values.tolist())

# POST METHODS
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
    return {'userid':2,
            'title': 'books '}

@app.route('/songs',methods=['GET','POST'])
def songs():
    return {'userid':3,
            'title': 'songs '}
    
    

    
if __name__ == "__main__":
    
    app.run(debug=True) 