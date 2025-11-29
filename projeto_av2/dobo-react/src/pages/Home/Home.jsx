import React from "react";
import "./Home.css";
import Menu from "../../components/Menu/Menu";
import FooterDobo from "../../components/FooterDobo/FooterDobo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import { faChartLine, faCloud, faHeadset, faServer, faShieldDog } from "@fortawesome/free-solid-svg-icons";


export default function Home() {
  return (
    <>

    <Menu />
    <main className="home-main">
    <section className="hero">
        <div className="hero-content">
          <img 
            src="/assets/dobo_logo_completa.png" 
            alt="Logo completa Dobo" 
            className="hero-logo"
          />

          <div className="hero-text">
            <h1>Bem-vindo à Dobo Serviços de TI 🐾</h1>
            <p>
            Aqui quem cuida dos seus sistemas são pets especialistas! 🐾  
            A Dobo oferece soluções em TI com a inteligência de um Schnauzer e o carisma de um Pitbull caramelo.
            </p>
          </div>
        </div>
      </section>

      <section className="historia">
      <h2>Nossa História</h2>
        <div className="historia-content">
          <div className="historia-texto">
            <p>
              A Dobo nasceu quando dois amigos de quatro patas — <strong>Doce de Leite</strong> e <strong>Bono</strong> —
              decidiram transformar o mundo da tecnologia.  
              Hoje somos uma equipe de pets e humanos dedicados a oferecer serviços de TI cheios de alegria, segurança e eficiência!
              Acreditamos que tecnologia não precisa ser fria e complicada — ela pode ser acolhedora, leve e feita com carinho.
            </p>
            <br></br>
            <p>
              Cada projeto é tratado com atenção e aquele toque especial de empatia que só quem ama o que faz consegue oferecer.
              Nossos serviços vão desde o suporte técnico e segurança de redes até soluções personalizadas para empresas que buscam 
              inovação sem perder o bom humor — porque aqui, tecnologia e afeto caminham juntos. 🐾💻
            </p>
          </div>
          <div className="video-container">
            <iframe 
            title="Vídeo Institucional Dobo"
            width="560" height="315" src="https://www.youtube.com/embed/6N54BkvAxhA?si=A9gLIMTSTAtvaAG_" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
            </iframe>
           
          </div>
        </div>
    </section>

    <section className="galeria">
        <h2>Nossa Matilha em Ação</h2>
        <div className="fotos">
            <img src="../assets/espaco/dobo-hall.png" alt="Hall da empresa Dobo"/>
            <img src="../assets/espaco/dobo-reuniao.png" alt="Saça de reunião da dobo"/>
            <img src="../assets/espaco/dobo-auditorio.png" alt="Doce de Leite e Bono no auditório"/>
            <img src="../assets/espaco/dobo-dev.png" alt="Centro de operações de desenvolvimento da Dobo"/>
            <img src="../assets/espaco/dobo-dados.png" alt="Centro de operações de dados Dobo"/>
            <img src="../assets/espaco/dobo-refeitorio.png" alt="Refeitório Data Dobo"/>
        </div>
    </section>

    <section className="servicos">
    <h2>Serviços de TI</h2>
    <div className="cards-servicos">
      <div className="card">
        <FontAwesomeIcon icon={faShieldDog} className="servico-icon"/>
        <h3>Segurança de Rede</h3>
        <p>Protegemos seus sistemas contra ameaças com o faro afiado da Doce de Leite.</p>
      </div>
    
      <div className="card">
        <i className="fa-solid fa-cloud"></i>
        <FontAwesomeIcon icon={faCloud} className="servico-icon"/>
        <h3>Backup na Nuvem</h3>
        <p>Guardamos seus dados com cuidado, como um osso precioso enterrado no quintal digital.</p>
      </div>
    
      <div className="card">
        <i className="fa-solid fa-headset"></i>
        <FontAwesomeIcon icon={faHeadset} className="servico-icon"/>
        <h3>Suporte Técnico</h3>
        <p>Atendimento rápido e amigo, sem latidos desnecessários — só boas soluções.</p>
      </div>
    
      <div className="card">
        <FontAwesomeIcon icon={faChartLine} className="servico-icon"/>
        <h3>Data Analytics</h3>
        <p>Transformamos dados em insights valiosos — farejando oportunidades para o seu negócio crescer.</p>
      </div>
    
      <div className="card">
        <FontAwesomeIcon icon={faCode} className="servico-icon"/>
        <h3>Desenvolvimento Web</h3>
        <p>Criamos sites e sistemas com design moderno, código limpo e a elegância de um Schnauzer bem penteado.</p>
      </div>
    
      <div className="card">
        <i className="fa-solid fa-server"></i>
        <FontAwesomeIcon icon={faServer} className="servico-icon"/>
        <h3>Monitoramento de Sistemas</h3>
        <p>Vigiamos seus servidores 24h por dia — sempre alertas, como bons guardiões digitais.</p>
      </div>
    </div>

    </section>

    <section className="fundadores">
      <h2>Nossos Fundadores</h2>
      <div className="fundadores-container">
        
        <div className="fundador-card">
          <img src="../assets/fundadores/doce.png" alt="Doce de Leite - CEO da Dobo" className="foto-fundador"/>
          <h3>Doce de Leite</h3>
          <p className="cargo">CEO</p>
          <table className="cv-tabela">
            <thead>
              <tr>
                <th>Ano</th>
                <th>Experiência</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2019</td>
                <td>Iniciou carreira como guardiã de rede, farejando vulnerabilidades com precisão.</td>
              </tr>
              <tr>
                <td>2021</td>
                <td>Liderou a implementação do sistema de segurança “DogDefender 2.0”.</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>Fundou a Dobo Serviços de TI com foco em proteção digital, eficiência e empatia tecnológica.</td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <div className="fundador-card">
          <img src="../assets/fundadores/bono.png" alt="Bono - CTO da Dobo" className="foto-fundador"/>
          <h3>Bono</h3>
          <p className="cargo">CTO</p>
    
          <table className="cv-tabela">
            <thead>
              <tr>
                <th>Ano</th>
                <th>Experiência</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2018</td>
                <td>Desenvolveu soluções em nuvem focadas em automação e desempenho.</td>
              </tr>
              <tr>
                <td>2020</td>
                <td>Implementou o framework “CloudBone”, otimizando servidores da Dobo.</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>Co-fundou a Dobo, trazendo a visão técnica e o espírito Schnauzer de eficiência.</td>
              </tr>
            </tbody>
          </table>
        </div>
    
      </div>
    </section>
    </main>
    <FooterDobo/>
   
    </>
  );
}
