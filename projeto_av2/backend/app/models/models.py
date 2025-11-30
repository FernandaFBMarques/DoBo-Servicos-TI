from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date


class Cliente(SQLModel, table=True):
    __tablename__ = "cliente"

    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    login: str = Field(unique=True)
    senha: str
    cpf: str
    nascimento: date
    telefone: str | None = None
    escolaridade: str
    estadoCivil: str

    solicitacoes: List["Solicitacao"] = Relationship(back_populates="cliente")


class ServicoTI(SQLModel, table=True):
    __tablename__ = "servicoti"   

    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    preco: float
    prazo: int

    solicitacoes: List["Solicitacao"] = Relationship(back_populates="servico")


class Solicitacao(SQLModel, table=True):
    __tablename__ = "solicitacao"

    id: Optional[int] = Field(default=None, primary_key=True)

    cliente_id: int = Field(foreign_key="cliente.id")
    servico_id: int = Field(foreign_key="servicoti.id") 

    status: str
    dataPedido: str
    dataPrevista: str

    cliente: Cliente = Relationship(back_populates="solicitacoes")
    servico: ServicoTI = Relationship(back_populates="solicitacoes")
