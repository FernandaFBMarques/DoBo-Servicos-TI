import React from "react";
import "./FooterDobo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApplePay, faCcMastercard, faCcVisa, faPix } from "@fortawesome/free-brands-svg-icons";

export default function FooterDobo() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-bloco">
          <h3>Contatos</h3>
          <ul>
            <li><i className="fa-solid fa-phone"></i> (81) 3333-4455</li>
            <li><i className="fa-brands fa-whatsapp"></i> (81) 99999-1122</li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:contato@dobo.com.br">email: contato@dobo.com.br</a>
            </li>
          </ul>
        </div>

        <div className="footer-bloco">
          <h3>Endereço</h3>
          <p>
            <i className="fa-solid fa-location-dot"></i> 
            Rua dos Pets Trabalhadores, 42 - Recife/PE - CEP 45643-345
          </p>
        </div>

        <div className="footer-bloco">
          <h3>Formas de Pagamento</h3>
          <ul>
            
            <li><FontAwesomeIcon icon={faCcVisa}/> Visa</li>
            <li><FontAwesomeIcon icon={faCcMastercard}/>  Mastercard</li>
            <li><FontAwesomeIcon icon={faApplePay}/> Apple Pay</li>
            <li><FontAwesomeIcon icon={faPix}/>  Pix</li>
          </ul>
        </div>

      </div>

      <div className="footer-copyrights">
        <p>© 2025 Dobo Serviços de TI. Todos os direitos reservados. 🐾</p>
      </div>
    </footer>
  );
}
