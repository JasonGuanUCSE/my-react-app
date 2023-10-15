from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


@app.route('/upload', methods=['POST'])
def upload_file():

    #file = the file from the frontend
    file = request.files['file']

    if file:
        # Read the file
        file_content = file.read().decode('utf-8') 
        if file_content:
            # Split the content into lines
            lines = file_content.strip().split('\n') 
            # Print the lines 
            for line in lines:
                print(line)
            return {'message': 'File uploaded and processed successfully'}
        else:
            return {'message': 'No file received'}, 400


if __name__ == '__main__':
    app.run(debug=True, port=8000) 

    
