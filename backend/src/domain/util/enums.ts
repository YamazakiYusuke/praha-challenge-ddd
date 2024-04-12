export enum EnrollmentStatusValue {
  Enrolled,
  OnLeave,
  Withdrawn,
}

export enum AssignmentProgressStateValue {
  NotStarted,
  InReview,
  Completed,
}

export enum EmailStatus {
  Pending,
  Sending,
  Sent,
  Error,
}

// restore
export function restoreEnrollmentStatusValue(value: number): EnrollmentStatusValue {
  if (value in EnrollmentStatusValue) {
    return value;
  }
  throw Error(`Unknown EnrollmentStatusValue: ${value}`);
}

export function restoreAssignmentProgressStateValue(value: number): AssignmentProgressStateValue {
  if (value in AssignmentProgressStateValue) {
    return value;
  }
  throw Error(`Unknown AssignmentProgressStateValue: ${value}`);
}

export function restoreEmailStatus(value: number): EmailStatus {
  if (value in EmailStatus) {
    return value;
  }
  throw Error(`Unknown EmailStatus: ${value}`);
}