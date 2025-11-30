from pydantic import BaseModel
from typing import List

class SolicitacaoUpdateSchema(BaseModel):
    servico_id: int
    status: str
    dataPedido: str
    dataPrevista: str

class SolicitacaoReadSchema(BaseModel):
    id: int
    servico_id: int
    status: str
    dataPedido: str
    dataPrevista: str

    model_config = {
        "from_attributes": True
    }

class SolicitacaoListSchema(BaseModel):
    success: bool
    mensagem: str
    solicitacoes: List[SolicitacaoReadSchema]