from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select, delete
from typing import List

from app.database.database import engine
from app.models.models import Cliente, ServicoTI, Solicitacao
from app.schemas.solicitacao_schema import (
    SolicitacaoUpdateSchema,
    SolicitacaoReadSchema,
    SolicitacaoListSchema
)

router = APIRouter(prefix="/solicitacoes", tags=["Solicitações"])

@router.get("/{login}", response_model=SolicitacaoListSchema)
def listar_solicitacoes_por_login(login: str):
    with Session(engine) as session:

        cliente = session.exec(
            select(Cliente).where(Cliente.login == login)
        ).first()

        if not cliente:
            raise HTTPException(
                status_code=400,
                detail={"success": False, "mensagem": "Usuário não encontrado"}
            )

        solicitacoes = session.exec(
            select(Solicitacao).where(Solicitacao.cliente_id == cliente.id)
        ).all()

        return SolicitacaoListSchema(
            success=True,
            mensagem="Solicitações carregadas com sucesso!",
            solicitacoes=[
                SolicitacaoReadSchema.model_validate(s)
                for s in solicitacoes
            ]
        )



# --------------------------------------------------
# PUT /solicitacoes/{login}
# Substitui TODAS as solicitações de um usuário
# --------------------------------------------------
@router.put("/{login}")
def atualizar_solicitacoes(login: str, novas_solicitacoes: List[SolicitacaoUpdateSchema]):
    with Session(engine) as session:

        cliente = session.exec(
            select(Cliente).where(Cliente.login == login)
        ).first()

        if not cliente:
            raise HTTPException(
                status_code=400,
                detail={"success": False, "mensagem": "Usuário não encontrado"}
            )

        # Apaga tudo antes
        session.exec(
            delete(Solicitacao).where(Solicitacao.cliente_id == cliente.id)
        )
        session.commit()

        # Reinsere tudo
        for item in novas_solicitacoes:

            servico = session.exec(
                select(ServicoTI).where(ServicoTI.id == item.servico_id)
            ).first()

            if not servico:
                raise HTTPException(
                    status_code=400,
                    detail={
                        "success": False,
                        "mensagem": f"Serviço com id {item.servico_id} não encontrado"
                    }
                )

            nova = Solicitacao(
                cliente_id=cliente.id,
                servico_id=item.servico_id,
                status=item.status,
                dataPedido=item.dataPedido,
                dataPrevista=item.dataPrevista
            )

            session.add(nova)

        session.commit()

        return {
            "success": True,
            "mensagem": "Solicitações atualizadas com sucesso!"
        }


@router.delete("/{solicitacao_id}")
def deletar_solicitacao(solicitacao_id: int):
    with Session(engine) as session:

        solicitacao = session.exec(
            select(Solicitacao).where(Solicitacao.id == solicitacao_id)
        ).first()

        if not solicitacao:
            raise HTTPException(
                status_code=404,
                detail={"success": False, "mensagem": "Solicitação não encontrada"}
            )

        session.delete(solicitacao)
        session.commit()

        return {"success": True, "mensagem": "Solicitação excluída com sucesso!"}