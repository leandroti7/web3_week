import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x673922e4800753Ee68FDb45Ff25135A2d8bbf48b";

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