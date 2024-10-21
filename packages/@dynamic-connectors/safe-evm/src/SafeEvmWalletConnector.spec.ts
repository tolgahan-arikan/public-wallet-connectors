import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';

import { walletConnectorEvents } from '@dynamic-labs/wallet-connector-core';

import { SafeEvmWalletConnector } from './SafeEvmWalletConnector';
import { EthWalletConnectorOpts } from '@dynamic-labs/ethereum-core';

jest.mock('@safe-global/safe-apps-provider');
jest.mock('@safe-global/safe-apps-sdk');
jest.mock('@dynamic-labs/wallet-connector-core', () => ({
  ...jest.requireActual('@dynamic-labs/wallet-connector-core'),
  walletConnectorEvents: {
    emit: jest.fn(),
  },
  logger: {
    debug: jest.fn(),
  },
}));

const walletConnnectorProps: EthWalletConnectorOpts = {
  walletBook: {},
  evmNetworks: [],
};

let initializeSafeSpy: jest.SpyInstance;
const initializeSafeMock = jest.fn();

const createConnector = async () => {
  const connector = new SafeEvmWalletConnector(walletConnnectorProps);

  await initializeSafeMock();

  return connector;
};

describe('SafeEvmWalletConnector', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    initializeSafeMock.mockResolvedValue({
      safeAddress: '0x123',
    });

    initializeSafeSpy = jest.spyOn(SafeEvmWalletConnector.prototype as any, 'initializeSafe');

    initializeSafeSpy.mockImplementation(initializeSafeMock);
  });

  it('should initialize with correct name and overrideKey', async () => {
    const connector = await createConnector();

    expect(connector.name).toBe('Safe Wallet');
    expect(connector.overrideKey).toBe('safe');
  });

  describe('initProvider', () => {
    it('should initialize provider and emit events if in Safe app', async () => {
      const connector = await createConnector();

      expect(walletConnectorEvents.emit).toHaveBeenCalledWith('providerReady', {
        connector,
      });
      expect(walletConnectorEvents.emit).toHaveBeenCalledWith('autoConnect', {
        connector,
      });
    });

    it('should not initialize provider if not in Safe app', async () => {
      initializeSafeMock.mockResolvedValue(undefined);

      await createConnector();

      expect(SafeAppProvider).not.toHaveBeenCalled();
      expect(walletConnectorEvents.emit).not.toHaveBeenCalled();
    });
  });

  describe('initializeSafe', () => {
    it('should initialize safe', async () => {
      initializeSafeSpy.mockRestore();

      (SafeAppsSDK.prototype as any).safe = {
        getInfo: jest.fn().mockResolvedValue({ safeAddress: '0x123' }),
      };

      const connector = await createConnector();

      const safe = await connector.initializeSafe();

      expect(safe).toEqual({ safeAddress: '0x123' });
      expect(connector.triedToConnect).toBe(true);
    });
  });

  describe('supportsNetworkSwitching', () => {
    it('should return false', async () => {
      const connector = await createConnector();

      expect(connector.supportsNetworkSwitching()).toBe(false);
    });
  });

  describe('findProvider', () => {
    it('should return the provider if initialized', async () => {
      const connector = await createConnector();

      expect(connector.findProvider()).toBeDefined();
    });

    it('should return undefined if provider is not initialized', async () => {
      initializeSafeMock.mockImplementation(() => undefined);

      const connector = await createConnector();

      expect(connector.findProvider()).toBeUndefined();
    });
  });

  describe('getAddress', () => {
    it('should return the safe address if available', async () => {
      const connector = await createConnector();

      expect(await connector.getAddress()).toBe('0x123');
    });

    it('should return undefined if safe address is not available', async () => {
      initializeSafeMock.mockImplementation(() => ({
        safeAddress: undefined,
      }));

     const connector = await createConnector();

      expect(await connector.getAddress()).toBeUndefined();
    });
  });

  describe('getConnectedAccounts', () => {
    it('should return an empty array if no safe address is available', async () => {
      initializeSafeMock.mockImplementation(() => ({
        safeAddress: undefined,
      }));

      const connector = await createConnector();

      expect(await connector.getConnectedAccounts()).toEqual([]);
    });

    it('should return the connected accounts', async () => {
      const connector = await createConnector();

      const setActiveAccountMock = jest
        .spyOn(connector, 'setActiveAccount')
        .mockImplementation(() => {});

      expect(await connector.getConnectedAccounts()).toEqual(['0x123']);
      expect(setActiveAccountMock).toHaveBeenCalledWith('0x123');
    });
  });

  describe('signMessage', () => {
    it('should return undefined if no client is found', async () => {
      const connector = await createConnector();

      jest.spyOn(connector, 'getWalletClient').mockReturnValue(undefined);

      expect(await connector.signMessage('Hello, world!')).toBeUndefined();
    });

    it('should return the signed message', async () => {
      const connector = await createConnector();

      jest.spyOn(connector, 'getWalletClient').mockReturnValue({
        signMessage: jest.fn().mockResolvedValue('0x123'),
      });

      (connector as any).safe = {
        safeAddress: '0x123',
      };

      expect(await connector.signMessage('Hello, world!')).toBe('0x123');
    });
  });
});