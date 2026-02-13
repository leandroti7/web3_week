import { useConnect, useConnection, useConnectors, useDisconnect } from 'wagmi'

function Login() {
  const { connect, error } = useConnect()
  const connectors = useConnectors()

  return (
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-6">
          <img src="../public/assets/bbb1.jpg" alt="BBB" className='d-block mx-lg-auto img-fluid' width="700" height="500" />
        </div>
        <div className="col-6">
          <h1 className="display-5 fw-bold text-emphasis lh-1 mb-3">Welcome to BBB</h1>
          <p className="lead">Votação online</p>
          <p className="lead mb-3">Autentique-se com a sua carteira e deixe o seu voto para o próximo participante</p>
          <div>
            <button 
              type="button" onClick={() => connect({ connector: connectors[0] })}
              className="btn btn-primary btn-lg px-4 me-2">
                <img src="../public/assets/rabby.png" alt="Wallet" className="me-2" width="45" height="45" />
                Conectar com a wallet !
            </button>
          </div>
          <p className="message">{ error ? error?.message : ""}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
