# safe-evm

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build safe-evm` to build the library.

## Running unit tests

Run `nx test safe-evm` to execute the unit tests via [Jest](https://jestjs.io).

## Integrating with the Dynamic SDK

To integrate with the Dynamic SDK, you just need to pass `SafeEvmConnectors` to the `walletConnectors` prop of the `DynamicContextProvider` component.

```tsx
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-score';
import { SafeEvmConnectors } from '@dynamic-labs-connectors/safe-evm';

const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'REPLACE-WITH-YOUR-ENVIRONMENT-ID',
        walletConnectors: [SafeEvmConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
};
```

## Contributing

Please see the [Contributing Guide](../CONTRIBUTING.md) for information on how to develop and contribute to this connector.
