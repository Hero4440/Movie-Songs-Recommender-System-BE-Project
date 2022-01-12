from flask import Flask

app = Flask(__name__)

@app.route('/api',methods=['GET'])
def api():
    return {'userid':1,
            'titel': 'sad '}

if __name__ == "__main__":
    app.run(debug=True) 