import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import SafeAppsSDK, { type SafeInfo } from '@safe-global/safe-apps-sdk';
import { SafeSdkClient } from './SafeSdkClient.js';

jest.mock('@safe-global/safe-apps-provider');
jest.mock('@safe-global/safe-apps-sdk');
jest.mock('@dynamic-labs/wallet-connector-core', () => ({
  logger: {
    debug: jest.fn(),
  },
}));

describe('SafeSdkClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset static properties
    SafeSdkClient.isInitialized = false;
    SafeSdkClient.safeInfo = undefined;
    SafeSdkClient.safeSdk = undefined as any;
    SafeSdkClient.provider = undefined as any;
  });

  describe('init', () => {
    it('should only initialize once', async () => {
      const mockGetInfo = jest.fn().mockResolvedValue({
        chainId: 1,
        isReadOnly: false,
        owners: [],
        safeAddress: '0x123',
        threshold: 1,
      });
      (SafeAppsSDK as jest.Mock).mockImplementation(() => ({
        safe: {
          getInfo: mockGetInfo,
        },
      }));

      await SafeSdkClient.init();
      const firstSdk = SafeSdkClient.safeSdk;
      expect(firstSdk).toBeDefined();
      expect(SafeSdkClient.isInitialized).toBe(true);

      await SafeSdkClient.init();
      expect(SafeSdkClient.safeSdk).toBe(firstSdk);
      expect(mockGetInfo).toHaveBeenCalledTimes(1);
    });

    it('should initialize provider when safe info is available', async () => {
      const mockSafeInfo: SafeInfo = {
        chainId: 1,
        isReadOnly: false,
        owners: [],
        safeAddress: '0x123',
        threshold: 1,
      };
      (SafeAppsSDK as jest.Mock).mockImplementation(() => ({
        safe: {
          getInfo: jest.fn().mockResolvedValue(mockSafeInfo),
        },
      }));

      await SafeSdkClient.init();

      expect(SafeSdkClient.safeInfo).toEqual(mockSafeInfo);
      expect(SafeAppProvider).toHaveBeenCalledWith(
        mockSafeInfo,
        SafeSdkClient.safeSdk,
      );
    });

    it('should handle timeout when safe info is not available', async () => {
      (SafeAppsSDK as jest.Mock).mockImplementation(() => ({
        safe: {
          getInfo: jest
            .fn()
            .mockImplementation(
              () => new Promise((resolve) => setTimeout(resolve, 2000)),
            ),
        },
      }));

      await SafeSdkClient.init();

      expect(SafeSdkClient.safeInfo).toBeUndefined();
      expect(SafeAppProvider).not.toHaveBeenCalled();
    });

    it('should handle no safe info', async () => {
      (SafeAppsSDK as jest.Mock).mockImplementation(() => ({
        safe: {
          getInfo: jest.fn().mockResolvedValue(undefined),
        },
      }));

      await SafeSdkClient.init();

      expect(SafeSdkClient.safeInfo).toBeUndefined();
      expect(SafeAppProvider).not.toHaveBeenCalled();
    });
  });

  describe('getAddress', () => {
    it('should return undefined when safe info is not available', () => {
      SafeSdkClient.safeInfo = undefined;
      expect(SafeSdkClient.getAddress()).toBeUndefined();
    });

    it('should return safe address when safe info is available', () => {
      SafeSdkClient.safeInfo = {
        chainId: 1,
        isReadOnly: false,
        owners: [],
        safeAddress: '0x123',
        threshold: 1,
      };
      expect(SafeSdkClient.getAddress()).toBe('0x123');
    });
  });

  describe('getProvider', () => {
    it('should return the provider cast as IEthereum', () => {
      const mockProvider = new SafeAppProvider({} as any, {} as any);
      SafeSdkClient.provider = mockProvider;

      const provider = SafeSdkClient.getProvider();
      expect(provider).toBe(mockProvider);
    });
  });

  describe('constructor', () => {
    it('should not be instantiable', () => {
      // @ts-expect-error testing private constructor
      expect(() => new SafeSdkClient()).toThrow();
    });
  });
});
