from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from app.database.database import engine
from app.models.models import ServicoTI
from app.schemas.servico_schema import (
    ServicoCreateSchema,
    ServicoReadSchema,
    ServicoListSchema
)

router = APIRouter(prefix="/servicos", tags=["Serviços de TI"])

@router.post("/", response_model=ServicoReadSchema)
def criar_servico(data: ServicoCreateSchema):
    with Session(engine) as session:

        servico = ServicoTI(
            nome=data.nome,
            preco=data.preco,
            prazo=data.prazo
        )

        session.add(servico)
        session.commit()
        session.refresh(servico)

        return servico

@router.get("/", response_model=ServicoListSchema)
def listar_servicos():
    with Session(engine) as session:
        servicos = session.exec(select(ServicoTI)).all()

        return ServicoListSchema(
            success=True,
            mensagem="Serviços carregados com sucesso!",
            servicos=servicos
        )
