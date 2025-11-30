from pydantic import BaseModel
from datetime import date

class ClienteCreateSchema(BaseModel):
    nome: str
    login: str
    senha: str
    cpf: str
    nascimento: date
    telefone: str | None = None
    escolaridade: str
    estadoCivil: str

class ClienteRead(BaseModel):
    id: int
    nome: str
    login: str

    class Config:
        from_attributes = True
