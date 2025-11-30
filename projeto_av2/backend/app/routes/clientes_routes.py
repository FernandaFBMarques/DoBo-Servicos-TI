from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from app.database.database import engine
from app.models.models import Cliente
from app.schemas.cliente_schema import ClienteCreateSchema

router = APIRouter()

@router.post("/clientes")
def criar_cliente(data: ClienteCreateSchema):
    with Session(engine) as session:

        cpf_limpo = data.cpf.replace(".", "").replace("-", "")

        telefone_limpo = None
        if data.telefone:
            telefone_limpo = (
                data.telefone.replace("(", "")
                             .replace(")", "")
                             .replace("-", "")
                             .replace(" ", "")
            )

        query = select(Cliente).where(Cliente.login == data.login)
        cliente_existente = session.exec(query).first()

        if cliente_existente:
            raise HTTPException(
                status_code=400,
                detail={"success": False, "mensagem": "Já existe um usuário com este e-mail (login)."}
            )

        novo = Cliente(
            nome=data.nome,
            login=data.login,
            senha=data.senha,
            cpf=cpf_limpo,
            nascimento=data.nascimento,
            telefone=telefone_limpo,
            escolaridade=data.escolaridade,
            estadoCivil=data.estadoCivil
        )

        session.add(novo)
        session.commit()
        session.refresh(novo)

        return {
            "success": True,
            "mensagem": "Cliente cadastrado com sucesso!",
            "cliente": {
                "id": novo.id,
                "nome": novo.nome,
                "login": novo.login
            }
        }
