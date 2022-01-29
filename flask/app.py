from flask import Flask,request , jsonify
from flask_jsonpify import jsonpify
import json
import Movie

app = Flask(__name__)
# GET METHODS
@app.route('/movies',methods=['GET','POST'])
def movies():
    # For movies Dataframe
    movies = Movie.readCSVMoviesBackend()
    return jsonpify(movies.values.tolist())

@app.route('/movies_votes',methods=['GET','POST'])
def moviesSortByVoteAverage():
    movies = Movie.readCSVMoviesBackend()
    return jsonpify(movies.sort_values(by='vote_average', ascending=False).values.tolist())

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
    print(Rated_data)

    movies = Movie.readCSVMoviesBackend()
    corrMatrix = Movie.readCSVCorr()
    movies_list = Movie.ratedListExtractor()
    user_recommendations = 10

    collab = Movie.recommendCollab(movies_list, user_recommendations, corrMatrix)
    content = Movie.recommendContent(movies_list, user_recommendations, movies)

    collab_list = jsonpify(collab)
    content_list = jsonpify(content)
    
    return 'Done',201
    
if __name__ == "__main__":
    app.run(debug=True) 