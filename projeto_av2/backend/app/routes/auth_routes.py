from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from app.database.database import engine
from app.schemas.login_schema import LoginSchema
from app.schemas.recuperar_senha_schema import RecuperarSenhaSchema
from app.models.models import Cliente

router = APIRouter()

@router.post("/auth/login")
def login(data: LoginSchema):
    with Session(engine) as session:
        query = select(Cliente).where(Cliente.login == data.login)
        cliente = session.exec(query).first()

        if not cliente:
            raise HTTPException(
                status_code=400, 
                detail={"success": False, "mensagem": "Usuário não encontrado"}
            )

        if cliente.senha != data.senha:
            raise HTTPException(
                status_code=400, 
                detail={"success": False, "mensagem": "Senha incorreta"}
            )

        return {
            "success": True,
            "mensagem": "Login realizado com sucesso!",
            "usuario": {
                "id": cliente.id,
                "nome": cliente.nome,
                "login": cliente.login
            }
        }


@router.post("/auth/recuperar-senha")
def recuperar_senha(data: RecuperarSenhaSchema):
    with Session(engine) as session:
        query = select(Cliente).where(Cliente.login == data.login)
        cliente = session.exec(query).first()

        if not cliente:
            raise HTTPException(
                status_code=400,
                detail={"success": False, "mensagem": "Usuário não encontrado"}
            )

        cliente.senha = data.nova_senha
        session.add(cliente)
        session.commit()
        session.refresh(cliente)

        return {
            "success": True,
            "mensagem": "Senha atualizada com sucesso!"
        }