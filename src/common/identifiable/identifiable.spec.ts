import { Identifiable } from '../identifiable.dto';

describe('Identifiable', () => {
  it('should be defined', () => {
    expect(new Identifiable()).toBeDefined();
  });
});
