from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from database.database import Base, engine
from routers import tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Study Planner")
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
app.mount("/", StaticFiles(directory="static", html=True), name="static")
