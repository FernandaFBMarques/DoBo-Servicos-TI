from sqlmodel import SQLModel, create_engine

DATABASE_URL = "sqlite:///dobo.db"

engine = create_engine(
    DATABASE_URL,
    echo=True,  
)
