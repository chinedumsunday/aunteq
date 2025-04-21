import { ethers } from "ethers"
import Web3Modal from "web3modal"

let web3Modal: Web3Modal
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
  })
}

export async function connectWallet() {
  try {
    const instance = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(instance)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    return { provider, signer, address }
  } catch (error) {
    console.error("Failed to connect wallet:", error)
    return null
  }
}

export async function disconnectWallet() {
  if (web3Modal) {
    web3Modal.clearCachedProvider()
  }
}

