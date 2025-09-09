"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { doLogin } from "@/services/Web3Services";



export default function Home() {
  const { push } = useRouter();
  const [message, setMessage] = useState("");

  function btnClickLogin() {
    setMessage("Concetando na carteira...aguarde...");
    doLogin()
      .then(account => push("/create"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }


  return (
    <>
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-6">
          <img src="https://images.seattleschild.com/wp-content/uploads/2020/05/iStock-166637296-e1642101702674.jpg" alt="Donate" className="d-block mx-lg-auto img-fluid" width={700} height={500} />
        </div>
        <div className="col-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3"> Donate Cripto</h1>
          <p className="lead">Sua plataforma descentralizada de doações.</p>
          <p className="lead">Autentique-se cpm sua carteira e crie sua campanha.</p>
          <p className="lead mb-3">Para doações, use o link da campanha já existente</p>
          <div className="d-flex justify-content-start mt-5">
            <button type="button" className="btn btn-primary btn-lg px-4 col-12 me-2" onClick={btnClickLogin}>
              <img src="/metamask.svg" width={64} className="me-2" alt="Metamask" />
              Conectar com a Metamask
            </button>
          </div>
          {
            message ? <div className="alert alert-success p-3 mt-2 col-12" role="alert">{message}</div> : <></>
          }
        </div>
      </div>
    </div>
    </>
  );
}
