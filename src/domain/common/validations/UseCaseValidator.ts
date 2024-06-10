import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

function transformValidationErrorsToJSON(errors: ValidationError[]) {
  return errors.reduce((p, c: ValidationError) => {
    if (!c.children || !c.children.length) {
      p[c.property] = Object.keys(c.constraints).map(
        (key) => c.constraints[key]
      );
    } else {
      p[c.property] = transformValidationErrorsToJSON(c.children);
    }
    return p;
  }, {});
}

export function ValidateBeforeExecution() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const models = Reflect.getMetadata(
      "design:paramtypes",
      target,
      propertyName
    );
    const method = descriptor.value;

    descriptor.value = async function () {
      if (arguments.length >= 1) {
        const requestType = arguments[0];

        const errors = await validate(plainToInstance(models[0], requestType));
        if (errors.length > 0) {
          throw new Error(
            JSON.stringify(transformValidationErrorsToJSON(errors))
          );
        }
      }
      return method.apply(this, arguments);
    };
  };
}
