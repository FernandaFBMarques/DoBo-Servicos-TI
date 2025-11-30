from sqlmodel import SQLModel

class RecuperarSenhaSchema(SQLModel):
    login: str
    nova_senha: str
