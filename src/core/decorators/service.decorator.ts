import "reflect-metadata";
import { BindingScope } from "../context";
import { ClassDefinition } from "../definitions/class.definition";

export const service = (
  bindingScope: BindingScope = BindingScope.TRANSIENT
) => {
  return (target: Function) => {
    const classDef = {
      bindingScope: bindingScope,
    } as ClassDefinition;

    Reflect.defineMetadata("meta:services", classDef, target);
  };
};
