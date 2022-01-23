from flask import Flask
import json
import pandas as pd

app = Flask(__name__)

@app.route('/movies',methods=['GET','POST'])
def movies():
    print("Loading movies_dict")
    movies_dict = json.load(open("api_data/movies4.json",'r'))

    return movies_dict


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