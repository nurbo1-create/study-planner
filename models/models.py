from sqlalchemy import Column, Integer, String
from database.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, default="")
    status = Column(String, default="todo", index=True)
    priority = Column(String, default="medium", index=True)
    deadline = Column(String, nullable=True)
