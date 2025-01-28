import {
  type WalletConnectorsMethod,
  type WalletMetadata,
} from '@dynamic-labs/wallet-connector-core';
import { type EthereumWalletConnectorOpts } from '@dynamic-labs/ethereum-core';

import {
  CrossAppTransportConfig,
  SequenceCrossAppConnector,
} from './SequenceCrossAppConnector.js';

export const createSequenceCrossAppConnector = (
  metadata: WalletMetadata,
  transportConfig: CrossAppTransportConfig,
): WalletConnectorsMethod => {
  return () => [
    class extends SequenceCrossAppConnector {
      constructor(props: EthereumWalletConnectorOpts) {
        super({
          ...props,
          metadata,
          transportConfig,
        });
      }
    },
  ];
};
