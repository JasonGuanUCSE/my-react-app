import os
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():

    file = request.files['file']

    if file:
        # Read the file
        file_content = file.read().decode('utf-8')

        # Parse the content
        parsed_content = parse_content(file_content)

        # Save the parsed content to a new file
        new_file_path = os.path.join(os.path.dirname(__file__), file.filename)
        with open(new_file_path, 'w') as new_file:
            new_file.write(parsed_content)

        return {'message': 'File uploaded, parsed, and saved successfully'}

    else:
        return {'message': 'No file received'}, 400

def parse_content(content):
 
    parsed_lines = [f'{line}' for line in content.split('\n')]
    return '\n'.join(parsed_lines)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
