import { v } from "./RegistrationValidator";

export class Validator {
  private steps: Array<ValidationStep>;
  constructor() {
    this.steps = []
  }
  addStep<T>(f: (s: T) => boolean, desc: string, forField: string): Validator {
    this.steps.push(new ValidationStep(f, desc, forField))
    return this;
  }
  validate<T>(value: T): ValidationResult {
    // if (value === null || value === undefined) {
    //   return ValidationResult.fromErrors([new ValidatorError(false, "value cannot be null or undefined", "text")])
    // }
    const fx = this.steps.map(f => {
      const result = f.f(value)
      return new ValidatorError(result, f.reason, f.forField);
    })
    return ValidationResult.fromErrors(fx);
  }
}
class ValidationStep {
  f: Function;
  reason: string;
  forField: string;
  constructor(f: Function, reason: string, forField: string) {
    this.f = f;
    this.reason = reason;
    this.forField = forField;
  }
}

export class ValidatorError {
  success: boolean
  reason: string
  forField: string;
  constructor(success: boolean, reason: string, forField: string) {
    this.success = success;
    this.reason = reason;
    this.forField = forField;
  }
}

class ValidationResult {
  ok: boolean;
  errors: Array<ValidatorError>
  constructor(errors: Array<ValidatorError>) {
    this.ok = errors.every(e => e.success)
    this.errors = errors;
  }

  public static fromErrors(errors: Array<ValidatorError>): ValidationResult {
    const vr = new ValidationResult(errors);
    return vr;
  }
}