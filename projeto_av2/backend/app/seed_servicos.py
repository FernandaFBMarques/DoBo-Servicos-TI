import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlmodel import Session
from app.database.database import engine
from app.models.models import ServicoTI


def seed_servicos():

    servicos = [
        ServicoTI(nome="Backup na Nuvem", preco=1250.0, prazo=5),
        ServicoTI(nome="Segurança de Rede", preco=4400.0, prazo=13),
        ServicoTI(nome="Suporte Técnico", preco=800.0, prazo=10),
        ServicoTI(nome="Data Analytics", preco=3600.0, prazo=30),
        ServicoTI(nome="Monitoramento de Sistemas", preco=970.0, prazo=10),
    ]

    with Session(engine) as session:
        for s in servicos:
            session.add(s)

        session.commit()

    print("✔ Seed de serviços criado com sucesso!")


if __name__ == "__main__":
    seed_servicos()
