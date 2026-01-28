"use client"
import Head from "next/head";
import { use } from "react";

export default function HomePage() {

  function btnLoginClick() {
    console.log("clicou aqui");
  }

  return (
    <>
      <Head>
        <title>BBB Web3 Application | Login</title>
        <meta name="description" content="Welcome to the BBB Web3 application." />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="/assests/bbb1.jpg" className="d-block mx-lg-auto img-fluid" alt="BBB Logo" width="700" height="500" />
          </div>
        
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BBB Web3</h1>
            <p className="lead">Votação on-chain do BBB</p>
            <p className="lead mb-3">
              Autentique-se com sua carteira Web3 para participar da votação do Big Brother Brasil (BBB) de forma segura e transparente.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" onClick={btnLoginClick} className="btn btn-warning btn-lg px-4 me-md-2">
                <img src="/assests/rabby.png" alt="Rabby wallet" width="60" height="60" className="me-3" />
                Conectar com a Rabby
              </button>
            </div>
          </div>
        </div>
      
      </div>

      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 BBB Web3 Application</p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><a href="" className="nav-link px-2 text-body-secondary">Home</a></li>
          <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
        </ul>
      </footer>
    </>
  );
}