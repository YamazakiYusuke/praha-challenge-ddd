import { createRandomIdString } from "src/util/random";
import { Value } from "./base/value";

export class Id extends Value<string> {
  protected constructor(value: string) {
    super(value)
  }

  public get value(): string {
    return this.props
  }
}

export class AdministratorId extends Id {
  static create(): AdministratorId {
    let id = createRandomIdString();
    return new AdministratorId(id);
  }

  static restore(id: string): AdministratorId {
    return new AdministratorId(id);
  }

  isAdministratorId(): boolean {
    return true;
  }
}

export class AssignmentProgressId extends Id {
  static create(): AssignmentProgressId {
    let id = createRandomIdString();
    return new AssignmentProgressId(id);
  }

  static restore(id: string): AssignmentProgressId {
    return new AssignmentProgressId(id);
  }

  isAssignmentProgressId(): boolean {
    return true;
  }
}

export class AssignmentId extends Id {
  static create(): AssignmentId {
    let id = createRandomIdString();
    return new AssignmentId(id);
  }

  static restore(id: string): AssignmentId {
    return new AssignmentId(id);
  }

  isAssignmentId(): boolean {
    return true;
  }
}

export class CategoryId extends Id {
  static create(): CategoryId {
    let id = createRandomIdString();
    return new CategoryId(id);
  }

  static restore(id: string): CategoryId {
    return new CategoryId(id);
  }

  isCategoryId(): boolean {
    return true;
  }
}

export class PairId extends Id {
  static create(): PairId {
    let id = createRandomIdString();
    return new PairId(id);
  }

  static restore(id: string): PairId {
    return new PairId(id);
  }

  isPairId(): boolean {
    return true;
  }
}

export class ParticipantId extends Id {
  static create(): ParticipantId {
    let id = createRandomIdString();
    return new ParticipantId(id);
  }

  static restore(id: string): ParticipantId {
    return new ParticipantId(id);
  }

  isParticipantId(): boolean {
    return true;
  }
}

export class ParticipantsId extends Id {
  static create(): ParticipantsId {
    let id = createRandomIdString();
    return new ParticipantsId(id);
  }

  static restore(id: string): ParticipantsId {
    return new ParticipantsId(id);
  }

  isParticipantsId(): boolean {
    return true;
  }
}

export class TeamId extends Id {
  static create(): TeamId {
    let id = createRandomIdString();
    return new TeamId(id);
  }

  static restore(id: string): TeamId {
    return new TeamId(id);
  }

  isTeamId(): boolean {
    return true;
  }
}
