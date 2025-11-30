import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlmodel import Session
from datetime import date

from app.database.database import engine
from app.models.models import Cliente

def seed():
    cliente = Cliente(
        nome="Cliente Teste",
        login="criismnaga@gmail.com",
        senha="#Teste123",
        cpf="39053344705",
        nascimento=date(1998, 5, 12),
        telefone="81997551234",
        escolaridade="Superior completo",
        estadoCivil="Solteiro"
    )

    with Session(engine) as session:
        session.add(cliente)
        session.commit()
        session.refresh(cliente)
        print("Cliente criado:", cliente)

if __name__ == "__main__":
    seed()
