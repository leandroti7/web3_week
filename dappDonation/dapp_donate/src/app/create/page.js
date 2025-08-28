"use client"
import { useState } from "react";

export default function Create() {

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({});

    function onInputChange(evt) {
        setCampaign(prevState => ({...prevState, [evt.target.id]: evt.target.value }))
    }

    function btnSaveClick() {
        setMessage(JSON.stringify(campaign));
    }

    return (
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Cripto</h1>
                <p>Preencha para campos para oncluir sua campanha na plataforma.</p>
                <p>Ao término do cafastro, você receberá o link para divulga-la e receber as doações.</p>
                <hr className="mb-4" />
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input type="text" name="title" id="title" className="form-control" onChange={onInputChange} value={campaign.title || ""}/>
                        <label htmlFor="title">Título:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea type="text" name="description" id="description" className="form-control" onChange={onInputChange} value={campaign.description || ""}/>
                        <label htmlFor="description">Descrição:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea type="text" name="image" id="imageUrl" className="form-control" onChange={onInputChange} value={campaign.imageUrl || ""}/>
                        <label htmlFor="imageUrl">Url da Imagem:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea type="text" name="videoUrl" id="videoUrl" className="form-control" onChange={onInputChange} value={campaign.videoUrl || ""}/>
                        <label htmlFor="videoUrl">Url da Vídeo:</label>
                    </div>
                    <div className="col-12 mb-3">
                        <button type="button" className="btn btn-primary col-12 p-3" onClick={btnSaveClick}>Salvar</button>
                    </div>
                    {
                        message ? <div className="alert alert-success p-3 mt-2 col-12" role="alert">{message}</div> : <></>
                    }
                </div>
            </div>
        </>
    );
}