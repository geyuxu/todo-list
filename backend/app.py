from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from models import TodoModel

app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.config['JSON_AS_ASCII'] = False
CORS(app)

todo_model = TodoModel()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = todo_model.get_all_todos()
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    todo_id = todo_model.add_todo(data['title'])
    return jsonify({'id': todo_id, 'message': 'Todo added successfully'}), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    completed = data.get('completed')
    title = data.get('title')
    
    todo_model.update_todo(todo_id, completed=completed, title=title)
    return jsonify({'message': 'Todo updated successfully'})

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo_model.delete_todo(todo_id)
    return jsonify({'message': 'Todo deleted successfully'})

if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Todo List Flask Application')
    parser.add_argument('--port', '-p', type=int, default=5000, 
                       help='Port to run the application on (default: 5000)')
    parser.add_argument('--host', type=str, default='0.0.0.0',
                       help='Host to run the application on (default: 0.0.0.0)')
    parser.add_argument('--debug', action='store_true', default=True,
                       help='Run in debug mode (default: True)')
    
    args = parser.parse_args()
    
    print(f"Starting Todo List application on {args.host}:{args.port}")
    app.run(debug=args.debug, host=args.host, port=args.port)