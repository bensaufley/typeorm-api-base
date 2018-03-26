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
      let qBuilder = await Klass.createQueryBuilder();
      qBuilder = qBuilder.where({ [args.property]: value });
      const id = (args.object as any).id;
      if (id) qBuilder = qBuilder.where('id != :id', { id });
      const existingRecord = await qBuilder.getOne();
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
