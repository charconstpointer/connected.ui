import { v } from "./RegistrationValidator";

export class Validator {
  private steps: Array<ValidationStep>;
  constructor() {
    this.steps = []
  }
  addStep<T>(f: (s: T) => boolean, desc: string): Validator {
    this.steps.push(new ValidationStep(f, desc))
    return this;
  }
  validate<T>(value: T): ValidationResult {
    if (value === null || value === undefined) {
      return ValidationResult.fromErrors([new ValidatorError(false, "value cannot be null or undefined")])
    }
    const fx = this.steps.map(f => {
      const result = f.f(value)
      return new ValidatorError(result, f.reason);
    })
    return ValidationResult.fromErrors(fx);
  }
}
class ValidationStep {
  f: Function;
  reason: string;
  constructor(f: Function, reason: string) {
    this.f = f;
    this.reason = reason;
  }
}

class ValidatorError {
  success: boolean
  reason: string
  constructor(success: boolean, reason: string) {
    this.success = success;
    this.reason = reason;
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