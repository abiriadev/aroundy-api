import { Validate, validate, validateOrReject } from 'class-validator';
import { Coordinate, IsCoordinate } from './coordinate.dto';
import { plainToClass } from 'class-transformer';

describe('Coordinate DTO', () => {
  class TestSchema {
    @Validate(IsCoordinate)
    coordinate: Coordinate;
  }

  it('should fail to validate when the given value is not array', async () => {
    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: null })),
    ).rejects.toBeDefined();

    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: 123 })),
    ).rejects.toBeDefined();

    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: '123,456' })),
    ).rejects.toBeDefined();
  });

  it('should fail to validate when the given array length is not exactly 2', async () => {
    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [] })),
    ).rejects.toBeDefined();

    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [123, 456] })),
    ).rejects.toBeDefined();

    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [1, 2, 3, 4] })),
    ).rejects.toBeDefined();
  });

  it('should fail to validate when the latitude is our of range', async () => {
    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [-100, 0] })),
    ).rejects.toBeDefined();

    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [100, 0] })),
    ).rejects.toBeDefined();
  });

  it('should fail to validate when the longitude is our of range', async () => {
    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [0, -200] })),
    ).rejects.toBeDefined();

    expect(
      validateOrReject(plainToClass(TestSchema, { coordinate: [0, 200] })),
    ).rejects.toBeDefined();
  });

  it('should should be valid coordinate', async () => {
    expect(
      validateOrReject(
        plainToClass(TestSchema, {
          coordinate: [37.51264278891025, 127.10246789395465],
        }),
      ),
    ).resolves.toBeUndefined();

    expect(
      validateOrReject(
        plainToClass(TestSchema, {
          coordinate: [43.67730422148132, -79.63339959034144],
        }),
      ),
    ).resolves.toBeUndefined();
  });
});
