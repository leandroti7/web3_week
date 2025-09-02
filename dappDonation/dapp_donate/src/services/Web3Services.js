import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x0f596E0106ddc53A1f9f9633817B3462404f9576";

export async function doLogin() {
    if(!window.ethereum) throw new Error("Wallet não encontrada!");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Carteira não encontrada/autorizada");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

function getContract() {
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCampaign(campaign) {
    const contract = getContract();
    return contract.methods.addCampaigns(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}

export async function getLastCampaignId()  {
    const contract = getContract();
    return contract.methods.nextId().call();
}

export async function getCampaign(id) {
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

export async function donate(id, donation) {
    await doLogin();
    const contract = getContract();
    return contract.methods.donate(id).send({
        value: Web3.utils.toWei(donation, "ether")
    })
}