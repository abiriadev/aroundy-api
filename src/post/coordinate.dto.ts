import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isArray,
  isLatitude,
  isLongitude,
} from 'class-validator';

export type Coordinate = [number, number];

@ValidatorConstraint({ name: 'coordinate' })
export class IsCoordinate implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return (
      isArray(value) &&
      value.length === 2 &&
      isLatitude(value[0]) &&
      isLongitude(value[1])
    );
  }

  defaultMessage() {
    return 'The coordinate should be a tuple [lat, lng]. Check your float range and whether you swapped lat and lng by mistake.';
  }
}
