import { SequenceCrossAppConnector } from './index.js';
import { createSequenceCrossAppConnector } from './helpers.js';

describe('index exports', () => {
  it('should export SequenceCrossAppConnector', () => {
    expect(SequenceCrossAppConnector).toBe(createSequenceCrossAppConnector);
  });
});
