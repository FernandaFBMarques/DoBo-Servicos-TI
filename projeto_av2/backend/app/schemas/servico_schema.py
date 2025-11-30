from pydantic import BaseModel
from typing import List


class ServicoCreateSchema(BaseModel):
    nome: str
    preco: float
    prazo: int


class ServicoReadSchema(BaseModel):
    id: int
    nome: str
    preco: float
    prazo: int

    model_config = {
        "from_attributes": True  
    }


class ServicoListSchema(BaseModel):
    success: bool
    mensagem: str
    servicos: List[ServicoReadSchema]
