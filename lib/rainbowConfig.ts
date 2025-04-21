import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    // Remove the publicProvider and use a basic configuration
  ],
)

const { connectors } = getDefaultWallets({
  appName: "NFT Merch Store",
  projectId: "YOUR_PROJECT_ID",
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export { chains, wagmiConfig }

