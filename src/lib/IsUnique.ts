import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { BaseEntity } from 'typeorm';

export const IsUniqueConstraintForClass = (Klass: typeof BaseEntity) => {
  @ValidatorConstraint({ async: true })
  class IsUniqueConstraint implements ValidatorConstraintInterface {
    defaultMessage() {
      return `${Klass.name} already exists with $property of $value`;
    }

    async validate(value: any, args: ValidationArguments) {
      const existingRecord = await Klass.findOne({ [args.property]: value });
      return !Boolean(existingRecord);
    }
  }
  return IsUniqueConstraint;
};

const IsUnique = (Klass: typeof BaseEntity, validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraintForClass(Klass),
    });
  };
};

export default IsUnique;
