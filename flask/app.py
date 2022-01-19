from flask import Flask

app = Flask(__name__)

@app.route('/movies',methods=['GET','POST'])
def movies():
    return {'userid':1,
            'title': 'movies '}


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