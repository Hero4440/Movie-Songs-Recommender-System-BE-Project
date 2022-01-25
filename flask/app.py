from flask import Flask, jsonify
import json
from flask_jsonpify import jsonpify
import pandas as pd


app = Flask(__name__)

@app.route('/movies',methods=['GET','POST'])
def movies():
    movies4 = pd.read_csv('api_data/implementation - presentation - movies4_1496.csv', index_col=0)
    movies4_list = movies4.values.tolist()
    movies4_JSONP = jsonpify(movies4_list)
    return movies4_JSONP

@app.route('/movies_votes',methods=['GET','POST'])
def moviesSortByVoteAverage():
    movies4 = pd.read_csv('api_data/implementation - presentation - movies4_1496.csv', index_col=0)
    voteAverage_idList = movies4.sort_values(by='vote_average', ascending=False).values.tolist()
    voteAverage_idList_JSONP = jsonpify(voteAverage_idList)
    return voteAverage_idList_JSONP

@app.route('/books',methods=['GET','POST'])
def books():
    return {'userid':2,
            'title': 'books '}

@app.route('/songs',methods=['GET','POST'])
def songs():
    return {'userid':3,
            'title': 'songs '}
if __name__ == "__main__":
    # movies4 = pd.read_csv('api_data/implementation - presentation - movies4_1496.csv', index_col=0)
    app.run(debug=True) 