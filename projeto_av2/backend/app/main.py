from fastapi import FastAPI
from sqlmodel import SQLModel
from app.database.database import engine
from app.models.models import Cliente, ServicoTI, Solicitacao
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import router as auth_router
from app.routes.clientes_routes import router as clientes_router
from app.routes.solicitacoes_routes import router as solicitacoes_router
from app.routes.servicos_routes import router as servicos_router


app = FastAPI()

@app.on_event("startup")
def criar_tabelas():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def raiz():
    return {"status": "backend funcionando"}

app.include_router(auth_router)
app.include_router(clientes_router)
app.include_router(solicitacoes_router)
app.include_router(servicos_router)

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         
    allow_credentials=True,
    allow_methods=["*"],          
    allow_headers=["*"],          
)
