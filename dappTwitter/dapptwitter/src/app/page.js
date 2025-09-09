"use client";

import Head from "next/head";
import { doLogin } from "../services/Web3Service";
import { useState } from "react";

export default function Home() {

  const [message, setMessage] = useState("");

  function btnLoginClick() {
    setMessage("Conectando com a Rabby...")
    doLogin()
      .then(wallet => setMessage(wallet))
      .catch(err => {
        setMessage('Erro detalhado:', {
          message: err.message,
          status: err.status,
          stack: err.stack
        });
      });
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://academy-public.coinmarketcap.com/optimized-uploads/560e2f722ecc4e7daf73c760c9839c51.png" className="d-block mx-lg-auto img-fluid" width={700} height={500} alt="" />
          </div>
          <div className="col-6">
            <h1 className="displayt-5 fw-bold text-body-emphasis lh-1 mb-3">CrypTwitter</h1>
            <p className="lead">Sua rede social descentralizada.</p>
            <p className="lead mb-3">Autentique-se com a sua carteira, escreva suas mensagens e saiba o que está acontecendo no mundo</p>
            <div className="d-grid gap-2 d-md-flex justofy-content-md-start flex-column">
              <button className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick}>
                <img src="/rabby.png" width={64} className="me-3" alt="" />
                Conectar com a Rabby Wallet
              </button>
              {
                message ? <div className="alert alert-success p-3 mt-2 col-12" role="alert">{message}</div> : <></>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
