"use client"

import Head from "next/head";
import NewTweet from "../../components/NewTweet";
import Tweet from "../../components/Tweet";
import { getLastTweets } from "../../services/Web3Service";

import { useState, useEffect } from "react";

export default function Timeline() {

    const [tweets, setTweets] = useState([]);
    const [page, setPage] = useState(1);

    async function loadTweets(page = 1) {
        try {
            const results = await getLastTweets(page);
            if(page > 1) {
                tweets.push(...results);
                setTweets(tweets.reverse());
            }
            else
                setTweets(results);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    // run once on mount
    useEffect(() => {
        loadTweets(page);
    }, [page])

    function btnLoadMoreClick() {
        setPage(page + 1);
    }

    return (
        <>
            <Head>
                <title>CrypTwitter | Timeline</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            </Head>
            <div className="container">
                <div className="row">
                    <div className="layout">
                        <NewTweet></NewTweet>
                        {
                            tweets && tweets.length
                            ? tweets.map(t => <Tweet key={Number(t.timestamp)} data={t} />)
                            :<p>Nada pra ver aqui. Faça o primeiro Tweet.</p>

                        }
                        {
                            tweets.length > 0 && tweets.length % 10 === 0
                                ? (
                                    <div className="center">
                                        <input type="button" value="More Tweets" className="mt-3 btn btn-primary" onClick={btnLoadMoreClick} />
                                    </div>
                                )
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}