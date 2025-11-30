import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlmodel import Session, select
from datetime import date

from app.database.database import engine
from app.models.models import Cliente, Solicitacao


def seed_solicitacoes():
    with Session(engine) as session:

        cliente = session.exec(
            select(Cliente).where(Cliente.login == "criismnaga@gmail.com")
        ).first()

        if not cliente:
            print("❌ Cliente não encontrado!")
            return

        cliente_id = cliente.id

        solicitacoes = [
            Solicitacao(
                cliente_id=cliente_id,
                servico_id=1,
                status="Concluído",
                dataPedido="2025-12-01",
                dataPrevista="2025-12-03"
            ),
            Solicitacao(
                cliente_id=cliente_id,
                servico_id=2,
                status="Em andamento",
                dataPedido="2025-12-02",
                dataPrevista="2025-12-04"
            ),
            Solicitacao(
                cliente_id=cliente_id,
                servico_id=3,
                status="Em elaboração",
                dataPedido="2025-12-03",
                dataPrevista="2025-12-06"
            ),
        ]

        for s in solicitacoes:
            session.add(s)

        session.commit()
        print("✔ Seed de solicitações criado com sucesso!")


if __name__ == "__main__":
    seed_solicitacoes()
