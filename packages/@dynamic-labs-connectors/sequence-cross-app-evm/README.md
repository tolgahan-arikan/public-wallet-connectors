# sequence-cross-app-evm

## Overview

The Sequence Cross App EVM connector enables integration with Sequence's cross-app wallet functionality in the Dynamic SDK. It provides a seamless way to interact with Sequence's wallet-as-a-service (WaaS) solution, allowing users to connect their wallets and perform transactions across different applications.

## Configuration

The connector requires two configuration objects:

```typescript
// Wallet metadata configuration
type WalletMetadata = {
  id: string; // Unique identifier for the wallet
  name: string; // Display name for the wallet
  icon: string; // URL to the wallet icon
};

// Transport configuration
type CrossAppTransportConfig = {
  projectAccessKey: string; // Your Sequence project access key
  walletUrl: string; // Sequence wallet URL
  initialChainId: number; // Initial blockchain network ID
};
```

## Integrating with the Dynamic SDK

To integrate with the Dynamic SDK:

1. Import SequenceCrossAppConnector
2. Configure it with your metadata and transport config
3. Pass it to the DynamicContextProvider

```tsx
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-score';
import { SequenceCrossAppConnector } from '@dynamic-labs-connectors/sequence-cross-app-evm';

const sequenceCrossAppConnector = SequenceCrossAppConnector(
  {
    id: 'wallet-id',
    name: 'wallet name',
    icon: 'icon-url',
  },
  {
    projectAccessKey: 'YOUR_PROJECT_ACCESS_KEY',
    walletUrl: 'YOUR_WALLET_URL',
    initialChainId: 1, // e.g., 1 for Ethereum mainnet
  },
);

const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'REPLACE-WITH-YOUR-ENVIRONMENT-ID',
        walletConnectors: [sequenceCrossAppConnector],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
};
```

## Contributing

Please see the [Contributing Guide](../CONTRIBUTING.md) for information on how to develop and contribute to this connector.
