import sqlite3
from datetime import datetime

class TodoModel:
    def __init__(self):
        self.db_path = 'todo.db'
        self.init_db()
    
    def init_db(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
    
    def get_all_todos(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM todos ORDER BY created_at DESC')
        todos = cursor.fetchall()
        conn.close()
        
        return [
            {
                'id': todo[0],
                'title': todo[1],
                'completed': bool(todo[2]),
                'created_at': todo[3],
                'updated_at': todo[4]
            }
            for todo in todos
        ]
    
    def add_todo(self, title):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO todos (title) VALUES (?)',
            (title,)
        )
        todo_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return todo_id
    
    def update_todo(self, todo_id, completed=None, title=None):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if completed is not None:
            cursor.execute(
                'UPDATE todos SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                (completed, todo_id)
            )
        
        if title is not None:
            cursor.execute(
                'UPDATE todos SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                (title, todo_id)
            )
        
        conn.commit()
        conn.close()
    
    def delete_todo(self, todo_id):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
        conn.commit()
        conn.close()