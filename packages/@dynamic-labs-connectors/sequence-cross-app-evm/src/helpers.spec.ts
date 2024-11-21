import { type WalletMetadata } from '@dynamic-labs/wallet-connector-core';
import { findWalletBookWallet } from '@dynamic-labs/wallet-book';
import { createSequenceCrossAppConnector } from './helpers.js';
import { SequenceCrossAppConnector } from './SequenceCrossAppConnector.js';
import { SequenceWaasTransportProvider } from './SequenceWaasTransportProvider.js';

jest.mock('./SequenceWaasTransportProvider.js');
jest.mock('@dynamic-labs/wallet-book', () => ({
  findWalletBookWallet: jest.fn(),
}));

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

  const mockWalletInfo = {
    name: 'Test Wallet',
    id: 'testwallet',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the SequenceWaasTransportProvider constructor
    (SequenceWaasTransportProvider as jest.Mock).mockImplementation(() => ({
      disconnect: jest.fn(),
    }));
    (findWalletBookWallet as jest.Mock).mockReturnValue(mockWalletInfo);
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

  it('should set up wallet property using findWalletBookWallet', () => {
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

    expect(findWalletBookWallet).toHaveBeenCalledWith(
      mockProps.walletBook,
      'testwallet',
    );
    expect((connector as any).wallet).toBe(mockWalletInfo);
  });
});
