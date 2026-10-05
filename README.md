# Study Planner

A beginner-friendly full-stack study task manager built with Python, FastAPI, SQLite, HTML, CSS and vanilla JavaScript.

## Features
- Create tasks
- View all tasks
- Change task status
- Delete tasks
- Priority and deadline fields
- Filter tasks by status
- REST API with FastAPI
- SQLite persistence

## Run locally
```bash
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Open http://127.0.0.1:8000
API docs: http://127.0.0.1:8000/docs

## Learning goal
This project is adapted from the MIT-licensed `lymanny/FastAPI-CRUD-Todo` backend structure and extended with a custom frontend and additional task fields/features for educational use.
