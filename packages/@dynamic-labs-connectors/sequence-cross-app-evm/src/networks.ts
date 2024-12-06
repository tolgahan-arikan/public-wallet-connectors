export enum ChainId {
  // Ethereum
  MAINNET = 1,
  SEPOLIA = 11155111,

  // Polygon
  POLYGON = 137,
  POLYGON_ZKEVM = 1101,
  POLYGON_AMOY = 80002,

  // BSC
  BSC = 56,
  BSC_TESTNET = 97,

  // Optimism
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,

  // Arbitrum One
  ARBITRUM = 42161,
  ARBITRUM_SEPOLIA = 421614,

  // Arbitrum Nova
  ARBITRUM_NOVA = 42170,

  // Avalanche
  AVALANCHE = 43114,
  AVALANCHE_TESTNET = 43113,

  // Gnosis Chain (XDAI)
  GNOSIS = 100,

  // BASE
  BASE = 8453,
  BASE_SEPOLIA = 84532,

  // HOMEVERSE
  HOMEVERSE_TESTNET = 40875,
  HOMEVERSE = 19011,

  // Xai
  XAI = 660279,
  XAI_SEPOLIA = 37714555429,

  // XR
  XR_SEPOLIA = 2730,

  // TELOS
  TELOS = 40,
  TELOS_TESTNET = 41,

  // B3 Sepolia
  B3 = 8333,
  B3_SEPOLIA = 1993,

  // APE Chain
  APECHAIN = 33139,
  APECHAIN_TESTNET = 33111,

  // Blast
  BLAST = 81457,
  BLAST_SEPOLIA = 168587773,

  // Borne
  BORNE_TESTNET = 94984,

  // SKALE Nebula
  SKALE_NEBULA = 1482601649,
  SKALE_NEBULA_TESTNET = 37084624,

  // Soneium Minato
  SONEIUM_MINATO = 1946,

  // TOY Testnet
  TOY_TESTNET = 21000000,

  // Immutable zkEVM
  IMMUTABLE_ZKEVM = 13371,
  IMMUTABLE_ZKEVM_TESTNET = 13473,

  // The Root Network
  ROOT_NETWORK = 7668,
  ROOT_NETWORK_PORCINI = 7672,

  // LAOS
  LAOS = 6283,
  LAOS_SIGMA_TESTNET = 62850,
}

export enum NetworkType {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type BlockExplorerConfig = {
  name?: string;
  rootUrl: string;
  addressUrl?: string;
  txnHashUrl?: string;
};

export interface NetworkMetadata {
  chainId: ChainId;
  type?: NetworkType;
  name: string;
  title?: string;
  logoURI?: string;
  blockExplorer?: BlockExplorerConfig;
  ensAddress?: string;
  testnet?: boolean; // Deprecated field, use type instead
  deprecated?: boolean; // The actual network is deprecated
  nativeToken: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

export const networks: Record<ChainId, NetworkMetadata> = {
  [ChainId.MAINNET]: {
    chainId: ChainId.MAINNET,
    type: NetworkType.MAINNET,
    name: 'mainnet',
    title: 'Ethereum',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.MAINNET}.webp`,
    blockExplorer: {
      name: 'Etherscan',
      rootUrl: 'https://etherscan.io/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  [ChainId.SEPOLIA]: {
    chainId: ChainId.SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'sepolia',
    title: 'Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Etherscan (Sepolia)',
      rootUrl: 'https://sepolia.etherscan.io/',
    },
    nativeToken: {
      symbol: 'sETH',
      name: 'Sepolia Ether',
      decimals: 18,
    },
  },
  [ChainId.POLYGON]: {
    chainId: ChainId.POLYGON,
    type: NetworkType.MAINNET,
    name: 'polygon',
    title: 'Polygon',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.POLYGON}.webp`,
    blockExplorer: {
      name: 'Polygonscan',
      rootUrl: 'https://polygonscan.com/',
    },
    nativeToken: {
      symbol: 'POL',
      name: 'POL',
      decimals: 18,
    },
  },
  [ChainId.POLYGON_AMOY]: {
    chainId: ChainId.POLYGON_AMOY,
    type: NetworkType.TESTNET,
    name: 'amoy',
    title: 'Polygon Amoy',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.POLYGON_AMOY}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'OKLink (Amoy)',
      rootUrl: 'https://www.oklink.com/amoy/',
    },
    nativeToken: {
      symbol: 'aPOL',
      name: 'Amoy POL',
      decimals: 18,
    },
  },
  [ChainId.POLYGON_ZKEVM]: {
    chainId: ChainId.POLYGON_ZKEVM,
    type: NetworkType.MAINNET,
    name: 'polygon-zkevm',
    title: 'Polygon zkEVM',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.POLYGON_ZKEVM}.webp`,
    blockExplorer: {
      name: 'Polygonscan (zkEVM)',
      rootUrl: 'https://zkevm.polygonscan.com/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.BSC]: {
    chainId: ChainId.BSC,
    type: NetworkType.MAINNET,
    name: 'bsc',
    title: 'BNB Smart Chain',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BSC}.webp`,
    blockExplorer: {
      name: 'BSCScan',
      rootUrl: 'https://bscscan.com/',
    },
    nativeToken: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18,
    },
  },
  [ChainId.BSC_TESTNET]: {
    chainId: ChainId.BSC_TESTNET,
    type: NetworkType.TESTNET,
    name: 'bsc-testnet',
    title: 'BNB Smart Chain Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BSC_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'BSCScan (Testnet)',
      rootUrl: 'https://testnet.bscscan.com/',
    },
    nativeToken: {
      symbol: 'tBNB',
      name: 'Testnet BNB',
      decimals: 18,
    },
  },
  [ChainId.OPTIMISM]: {
    chainId: ChainId.OPTIMISM,
    type: NetworkType.MAINNET,
    name: 'optimism',
    title: 'Optimism',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.OPTIMISM}.webp`,
    blockExplorer: {
      name: 'Etherscan (Optimism)',
      rootUrl: 'https://optimistic.etherscan.io/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.OPTIMISM_SEPOLIA]: {
    chainId: ChainId.OPTIMISM_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'optimism-sepolia',
    title: 'Optimism Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.OPTIMISM_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Etherscan (Optimism Sepolia)',
      rootUrl: 'https://sepolia-optimistic.etherscan.io/',
    },
    nativeToken: {
      symbol: 'sETH',
      name: 'Sepolia Ether',
      decimals: 18,
    },
  },
  [ChainId.ARBITRUM]: {
    chainId: ChainId.ARBITRUM,
    type: NetworkType.MAINNET,
    name: 'arbitrum',
    title: 'Arbitrum One',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.ARBITRUM}.webp`,
    blockExplorer: {
      name: 'Arbiscan',
      rootUrl: 'https://arbiscan.io/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    chainId: ChainId.ARBITRUM_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'arbitrum-sepolia',
    title: 'Arbitrum Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.ARBITRUM_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Arbiscan (Sepolia Testnet)',
      rootUrl: 'https://sepolia.arbiscan.io/',
    },
    nativeToken: {
      symbol: 'sETH',
      name: 'Sepolia Ether',
      decimals: 18,
    },
  },
  [ChainId.ARBITRUM_NOVA]: {
    chainId: ChainId.ARBITRUM_NOVA,
    type: NetworkType.MAINNET,
    name: 'arbitrum-nova',
    title: 'Arbitrum Nova',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.ARBITRUM_NOVA}.webp`,
    blockExplorer: {
      name: 'Arbiscan Nova',
      rootUrl: 'https://nova.arbiscan.io/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.AVALANCHE]: {
    chainId: ChainId.AVALANCHE,
    type: NetworkType.MAINNET,
    name: 'avalanche',
    title: 'Avalanche',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.AVALANCHE}.webp`,
    blockExplorer: {
      name: 'Snowtrace',
      rootUrl: 'https://subnets.avax.network/c-chain/',
    },
    nativeToken: {
      symbol: 'AVAX',
      name: 'AVAX',
      decimals: 18,
    },
  },
  [ChainId.AVALANCHE_TESTNET]: {
    chainId: ChainId.AVALANCHE_TESTNET,
    type: NetworkType.TESTNET,
    name: 'avalanche-testnet',
    title: 'Avalanche Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.AVALANCHE_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Snowtrace (Testnet)',
      rootUrl: 'https://subnets-test.avax.network/c-chain/',
    },
    nativeToken: {
      symbol: 'tAVAX',
      name: 'Testnet AVAX',
      decimals: 18,
    },
  },
  [ChainId.GNOSIS]: {
    chainId: ChainId.GNOSIS,
    type: NetworkType.MAINNET,
    name: 'gnosis',
    title: 'Gnosis Chain',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.GNOSIS}.webp`,
    blockExplorer: {
      name: 'Gnosis Chain Explorer',
      rootUrl: 'https://blockscout.com/xdai/mainnet/',
    },
    nativeToken: {
      symbol: 'XDAI',
      name: 'XDAI',
      decimals: 18,
    },
  },
  [ChainId.BASE]: {
    chainId: ChainId.BASE,
    type: NetworkType.MAINNET,
    name: 'base',
    title: 'Base (Coinbase)',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BASE}.webp`,
    blockExplorer: {
      name: 'Base Explorer',
      rootUrl: 'https://basescan.org/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.BASE_SEPOLIA]: {
    chainId: ChainId.BASE_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'base-sepolia',
    title: 'Base Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BASE_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Base Sepolia Explorer',
      rootUrl: 'https://base-sepolia.blockscout.com/',
    },
    nativeToken: {
      symbol: 'sETH',
      name: 'Sepolia Ether',
      decimals: 18,
    },
  },
  [ChainId.HOMEVERSE]: {
    chainId: ChainId.HOMEVERSE,
    type: NetworkType.MAINNET,
    name: 'homeverse',
    title: 'Oasys Homeverse',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.HOMEVERSE}.webp`,
    blockExplorer: {
      name: 'Oasys Homeverse Explorer',
      rootUrl: 'https://explorer.oasys.homeverse.games/',
    },
    nativeToken: {
      symbol: 'OAS',
      name: 'OAS',
      decimals: 18,
    },
  },
  [ChainId.HOMEVERSE_TESTNET]: {
    chainId: ChainId.HOMEVERSE_TESTNET,
    type: NetworkType.TESTNET,
    name: 'homeverse-testnet',
    title: 'Oasys Homeverse Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.HOMEVERSE_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Oasys Homeverse Explorer (Testnet)',
      rootUrl: 'https://explorer.testnet.oasys.homeverse.games/',
    },
    nativeToken: {
      symbol: 'tOAS',
      name: 'Testnet OAS',
      decimals: 18,
    },
  },
  [ChainId.XAI]: {
    chainId: ChainId.XAI,
    type: NetworkType.MAINNET,
    name: 'xai',
    title: 'Xai',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.XAI}.webp`,
    blockExplorer: {
      name: 'Xai Explorer',
      rootUrl: 'https://explorer.xai-chain.net/',
    },
    nativeToken: {
      symbol: 'XAI',
      name: 'XAI',
      decimals: 18,
    },
  },
  [ChainId.XAI_SEPOLIA]: {
    chainId: ChainId.XAI_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'xai-sepolia',
    title: 'Xai Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.XAI_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Xai Sepolia Explorer',
      rootUrl: 'https://testnet-explorer-v2.xai-chain.net/',
    },
    nativeToken: {
      symbol: 'sXAI',
      name: 'Sepolia XAI',
      decimals: 18,
    },
  },
  [ChainId.XR_SEPOLIA]: {
    chainId: ChainId.XR_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'xr-sepolia',
    title: 'XR Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.XR_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'XR Sepolia Explorer',
      rootUrl: 'https://xr-sepolia-testnet.explorer.caldera.xyz/',
    },
    nativeToken: {
      symbol: 'tXR',
      name: 'Sepolia XR',
      decimals: 18,
    },
  },
  [ChainId.B3]: {
    chainId: ChainId.B3,
    type: NetworkType.MAINNET,
    name: 'b3',
    title: 'B3',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.B3}.webp`,
    testnet: false,
    blockExplorer: {
      name: 'B3 Explorer',
      rootUrl: 'https://explorer.b3.fun/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.B3_SEPOLIA]: {
    chainId: ChainId.B3_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'b3-sepolia',
    title: 'B3 Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.B3_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'B3 Sepolia Explorer',
      rootUrl: 'https://sepolia.explorer.b3.fun/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.APECHAIN]: {
    chainId: ChainId.APECHAIN,
    type: NetworkType.MAINNET,
    name: 'apechain',
    title: 'APE Chain',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.APECHAIN}.webp`,
    testnet: false,
    blockExplorer: {
      name: 'APE Chain Explorer',
      rootUrl: 'https://apechain.calderaexplorer.xyz/',
    },
    nativeToken: {
      symbol: 'APE',
      name: 'ApeCoin',
      decimals: 18,
    },
  },
  [ChainId.APECHAIN_TESTNET]: {
    chainId: ChainId.APECHAIN_TESTNET,
    type: NetworkType.TESTNET,
    name: 'apechain-testnet',
    title: 'APE Chain Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.APECHAIN_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'APE Chain Explorer',
      rootUrl: 'https://curtis.explorer.caldera.xyz/',
    },
    nativeToken: {
      symbol: 'APE',
      name: 'ApeCoin',
      decimals: 18,
    },
  },
  [ChainId.BLAST]: {
    chainId: ChainId.BLAST,
    type: NetworkType.MAINNET,
    name: 'blast',
    title: 'Blast',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BLAST}.webp`,
    blockExplorer: {
      name: 'Blast Explorer',
      rootUrl: 'https://blastscan.io/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.BLAST_SEPOLIA]: {
    chainId: ChainId.BLAST_SEPOLIA,
    type: NetworkType.TESTNET,
    name: 'blast-sepolia',
    title: 'Blast Sepolia',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BLAST_SEPOLIA}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Blast Sepolia Explorer',
      rootUrl: 'https://sepolia.blastexplorer.io/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.TELOS]: {
    chainId: ChainId.TELOS,
    type: NetworkType.MAINNET,
    name: 'telos',
    title: 'Telos',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.TELOS}.webp`,
    blockExplorer: {
      name: 'Telos Explorer',
      rootUrl: 'https://www.teloscan.io/',
    },
    nativeToken: {
      symbol: 'TLOS',
      name: 'TLOS',
      decimals: 18,
    },
  },
  [ChainId.TELOS_TESTNET]: {
    chainId: ChainId.TELOS_TESTNET,
    type: NetworkType.TESTNET,
    name: 'telos-testnet',
    title: 'Telos Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.TELOS_TESTNET}.webp`,
    blockExplorer: {
      name: 'Telos Testnet Explorer',
      rootUrl: 'https://testnet.teloscan.io/',
    },
    nativeToken: {
      symbol: 'TLOS',
      name: 'TLOS',
      decimals: 18,
    },
  },
  [ChainId.BORNE_TESTNET]: {
    chainId: ChainId.BORNE_TESTNET,
    type: NetworkType.TESTNET,
    name: 'borne-testnet',
    title: 'Borne Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.BORNE_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Borne Testnet Explorer',
      rootUrl: 'https://subnets-test.avax.network/bornegfdn',
    },
    nativeToken: {
      symbol: 'BORNE',
      name: 'BORNE',
      decimals: 18,
    },
  },
  [ChainId.SKALE_NEBULA]: {
    chainId: ChainId.SKALE_NEBULA,
    type: NetworkType.MAINNET,
    name: 'skale-nebula',
    title: 'SKALE Nebula Gaming Hub',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.SKALE_NEBULA}.webp`,
    testnet: false,
    blockExplorer: {
      name: 'SKALE Nebula Gaming Hub Explorer',
      rootUrl: 'https://green-giddy-denebola.explorer.mainnet.skalenodes.com/',
    },
    nativeToken: {
      symbol: 'sFUEL',
      name: 'SKALE Fuel',
      decimals: 18,
    },
  },
  [ChainId.SKALE_NEBULA_TESTNET]: {
    chainId: ChainId.SKALE_NEBULA_TESTNET,
    type: NetworkType.TESTNET,
    name: 'skale-nebula-testnet',
    title: 'SKALE Nebula Gaming Hub Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.SKALE_NEBULA_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'SKALE Nebula Gaming Hub Testnet Explorer',
      rootUrl:
        'https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com/',
    },
    nativeToken: {
      symbol: 'sFUEL',
      name: 'SKALE Fuel',
      decimals: 18,
    },
  },
  [ChainId.SONEIUM_MINATO]: {
    chainId: ChainId.SONEIUM_MINATO,
    type: NetworkType.TESTNET,
    name: 'soneium-minato',
    title: 'Soneium Minato (Testnet)',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.SONEIUM_MINATO}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Soneium Minato Explorer',
      rootUrl: 'https://explorer-testnet.soneium.org/',
    },
    nativeToken: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
  },
  [ChainId.TOY_TESTNET]: {
    chainId: ChainId.TOY_TESTNET,
    type: NetworkType.TESTNET,
    name: 'toy-testnet',
    title: 'TOY (Testnet)',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.TOY_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'TOY Testnet Explorer',
      rootUrl: 'https://toy-chain-testnet.explorer.caldera.xyz/',
    },
    nativeToken: {
      symbol: 'TOY',
      name: 'TOY',
      decimals: 18,
    },
  },
  [ChainId.IMMUTABLE_ZKEVM]: {
    chainId: ChainId.IMMUTABLE_ZKEVM,
    type: NetworkType.MAINNET,
    name: 'immutable-zkevm',
    title: 'Immutable zkEVM',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.IMMUTABLE_ZKEVM}.webp`,
    testnet: false,
    blockExplorer: {
      name: 'Immutable zkEVM Explorer',
      rootUrl: 'https://explorer.immutable.com/',
    },
    nativeToken: {
      symbol: 'IMX',
      name: 'IMX',
      decimals: 18,
    },
  },
  [ChainId.IMMUTABLE_ZKEVM_TESTNET]: {
    chainId: ChainId.IMMUTABLE_ZKEVM_TESTNET,
    type: NetworkType.TESTNET,
    name: 'immutable-zkevm-testnet',
    title: 'Immutable zkEVM Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.IMMUTABLE_ZKEVM_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'Immutable zkEVM Testnet Explorer',
      rootUrl: 'https://explorer.testnet.immutable.com/',
    },
    nativeToken: {
      symbol: 'IMX',
      name: 'IMX',
      decimals: 18,
    },
  },
  [ChainId.ROOT_NETWORK]: {
    chainId: ChainId.ROOT_NETWORK,
    type: NetworkType.MAINNET,
    name: 'rootnet',
    title: 'The Root Network',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.ROOT_NETWORK}.webp`,
    testnet: false,
    blockExplorer: {
      name: 'The Root Network Explorer',
      rootUrl: 'https://rootscan.io/',
    },
    nativeToken: {
      symbol: 'XRP',
      name: 'XRP',
      decimals: 18,
    },
  },
  [ChainId.ROOT_NETWORK_PORCINI]: {
    chainId: ChainId.ROOT_NETWORK_PORCINI,
    type: NetworkType.TESTNET,
    name: 'rootnet-porcini',
    title: 'The Root Network Porcini Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.ROOT_NETWORK_PORCINI}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'The Root Network Porcini Testnet Explorer',
      rootUrl: 'https://porcini.rootscan.io/',
    },
    nativeToken: {
      symbol: 'XRP',
      name: 'XRP',
      decimals: 18,
    },
  },
  [ChainId.LAOS]: {
    chainId: ChainId.LAOS,
    type: NetworkType.MAINNET,
    name: 'laos',
    title: 'LAOS',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.LAOS}.webp`,
    testnet: false,
    blockExplorer: {
      name: 'LAOS Explorer',
      rootUrl: 'https://blockscout.laos.laosfoundation.io/',
    },
    nativeToken: {
      symbol: 'LAOS',
      name: 'LAOS',
      decimals: 18,
    },
  },
  [ChainId.LAOS_SIGMA_TESTNET]: {
    chainId: ChainId.LAOS_SIGMA_TESTNET,
    type: NetworkType.TESTNET,
    name: 'laos-sigma-testnet',
    title: 'LAOS Sigma Testnet',
    logoURI: `https://assets.sequence.info/images/networks/medium/${ChainId.LAOS_SIGMA_TESTNET}.webp`,
    testnet: true,
    blockExplorer: {
      name: 'LAOS Sigma Testnet Explorer',
      rootUrl: 'https://sigma.explorer.laosnetwork.io/',
    },
    nativeToken: {
      symbol: 'SIGMA',
      name: 'SIGMA',
      decimals: 18,
    },
  },
};