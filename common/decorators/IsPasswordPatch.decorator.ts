import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPasswordMatch(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPasswordMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const password = obj.password;
          return password === value;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password and confirm password do not match';
        },
      },
    });
  };
}