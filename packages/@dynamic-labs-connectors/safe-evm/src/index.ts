import { WalletConnectorConstructor } from '@dynamic-labs/wallet-connector-core';
import { isInIframe } from '@dynamic-labs/utils';

import { SafeEvmWalletConnector } from './SafeEvmWalletConnector';

export * from './SafeEvmWalletConnector';

export const SafeEvmWalletConnectors = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: any
): WalletConnectorConstructor[] =>
  isInIframe() ? [SafeEvmWalletConnector] : [];
