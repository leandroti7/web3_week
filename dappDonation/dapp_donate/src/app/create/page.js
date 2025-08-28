"use client"
import { useState } from "react";
import { addCampaign, getLastCampaignId } from "@/services/Web3Services";

export default function Create() {

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({
        title: "",
        description:"",
        imageUrl: "",
        videoUrl: ""
    });

    function onInputChange(evt) {
        setCampaign(prevState => ({...prevState, [evt.target.id]: evt.target.value }))
    }

    function btnSaveClick() {
        setMessage("Salvando a campanha...aguarde...");
        addCampaign(campaign)
            .then(tx => getLastCampaignId())
            .then(id => setMessage(`Campanha foi salve com o ID ${id}. Em alguns instantes ela estará pronta para receber doações, use esse link divulgala http://localhost:3000/donate/${id}`))
            .catch(err => {
                console.error(err);
                setMessage(err.message);                
            })
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