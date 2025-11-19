"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { addTwett } from "../services/Web3Service";

export default function NewTweet(){
    
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const { push } =  useRouter();

    function btnPublishClick() {
        setMessage("Enviando seu tweet para a blockchain...aguarde...");
        addTwett(text)
            .then(result => {
                setText("");
                setMessage("Twett foi enviado. Aguarde um miniuto para atualizar")
            })
            .catch(err => {
                setMessage(err.message);
                console.error(err);
            })
    }

    useEffect(() => {
        const wallet = localStorage.getItem("wallet");
        if(!wallet)
            push("/");
    }, [])

    return (
        <>
            <div className="top">
                <div className="left">
                    <img src="/XXX.png" alt="" className="brand" />
                </div>
                <h1>
                    Bem vindo de volta !
                </h1>
                <p>O que está acontecendo?</p>
                <textarea name="" value={text} onChange={evt => setText(evt.target.value)} className="form-control my-3">
                </textarea>
                <div>
                    <input type="button"  className="btn btn-primary" value="Enviar" onClick={btnPublishClick} />
                    <span className="message ml-4">
                        {message}
                    </span>
                </div>
            </div>
        </>
    )
}