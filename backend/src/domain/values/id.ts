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
}

export class AssignmentProgressId extends Id {
  static create(): AssignmentProgressId {
    let id = createRandomIdString();
    return new AssignmentProgressId(id);
  }

  static restore(id: string): AssignmentProgressId {
    return new AssignmentProgressId(id);
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
}

export class CategoryId extends Id {
  static create(): CategoryId {
    let id = createRandomIdString();
    return new CategoryId(id);
  }

  static restore(id: string): CategoryId {
    return new CategoryId(id);
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
}

export class ParticipantId extends Id {
  static create(): ParticipantId {
    let id = createRandomIdString();
    return new ParticipantId(id);
  }

  static restore(id: string): ParticipantId {
    return new ParticipantId(id);
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
}

export class TeamId extends Id {
  static create(): TeamId {
    let id = createRandomIdString();
    return new TeamId(id);
  }

  static restore(id: string): TeamId {
    return new TeamId(id);
  }
}
