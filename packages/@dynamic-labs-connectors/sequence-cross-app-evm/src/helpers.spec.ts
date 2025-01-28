import { type WalletMetadata } from '@dynamic-labs/wallet-connector-core';
import { createSequenceCrossAppConnector } from './helpers.js';
import { SequenceCrossAppConnector } from './SequenceCrossAppConnector.js';
import { SequenceWaasTransportProvider } from './SequenceWaasTransportProvider.js';

jest.mock('./SequenceWaasTransportProvider.js');

describe('createSequenceCrossAppConnector', () => {
  const mockMetadata: WalletMetadata = {
    id: 'testwallet',
    name: 'Test Wallet',
    icon: 'test-icon',
  };

  const mockTransportConfig = {
    projectAccessKey: 'test-key',
    walletUrl: 'https://test.url',
    initialChainId: 1,
  };

  const mockProps = {
    walletBook: {},
    evmNetworks: [],
    metadata: mockMetadata,
    transportConfig: mockTransportConfig,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the SequenceWaasTransportProvider constructor
    (SequenceWaasTransportProvider as jest.Mock).mockImplementation(() => ({
      disconnect: jest.fn(),
    }));
  });

  it('should return a function that returns an array with one connector class', () => {
    const connectorFactory = createSequenceCrossAppConnector(
      mockMetadata,
      mockTransportConfig,
    );
    expect(typeof connectorFactory).toBe('function');

    const connectors = connectorFactory();
    expect(Array.isArray(connectors)).toBe(true);
    expect(connectors.length).toBe(1);
  });

  it('should create a connector class that extends SequenceCrossAppConnector', () => {
    const connectorFactory = createSequenceCrossAppConnector(
      mockMetadata,
      mockTransportConfig,
    );
    const [ConnectorClass] = connectorFactory();

    expect(ConnectorClass).toBeDefined();
    if (!ConnectorClass) {
      throw new Error('ConnectorClass is undefined');
    }

    const connector = new ConnectorClass(mockProps);
    expect(connector).toBeInstanceOf(SequenceCrossAppConnector);
  });

  it('should pass metadata and transportConfig to the connector constructor', () => {
    const connectorFactory = createSequenceCrossAppConnector(
      mockMetadata,
      mockTransportConfig,
    );
    const [ConnectorClass] = connectorFactory();

    expect(ConnectorClass).toBeDefined();
    if (!ConnectorClass) {
      throw new Error('ConnectorClass is undefined');
    }

    const connector = new ConnectorClass(mockProps);
    expect(connector.name).toBe(mockMetadata.id);
    expect(
      (connector as SequenceCrossAppConnector).sequenceWaasTransportProvider,
    ).toBeDefined();

    // Verify SequenceWaasTransportProvider was called with correct params
    expect(SequenceWaasTransportProvider).toHaveBeenCalledWith(
      mockTransportConfig.projectAccessKey,
      mockTransportConfig.walletUrl,
      mockTransportConfig.initialChainId,
      'https://nodes.sequence.app',
    );
  });
});
