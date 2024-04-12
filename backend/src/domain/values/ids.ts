import { createRandomIdString } from "src/domain/util/random";
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

  get isAdministratorId(): boolean {
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

  get isAssignmentProgressId(): boolean {
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

  get isAssignmentId(): boolean {
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

  get isCategoryId(): boolean {
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

  get isPairId(): boolean {
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

  get isParticipantId(): boolean {
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

  get isParticipantsId(): boolean {
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

  get isTeamId(): boolean {
    return true;
  }
}

export class AdminEmailId extends Id {
  static create(): AdminEmailId {
    let id = createRandomIdString();
    return new AdminEmailId(id);
  }

  static restore(id: string): AdminEmailId {
    return new AdminEmailId(id);
  }

  get isAdminEmailId(): boolean {
    return true;
  }
}

export class GenerationId extends Id {
  static create(): GenerationId {
    let id = createRandomIdString();
    return new GenerationId(id);
  }

  static restore(id: string): GenerationId {
    return new GenerationId(id);
  }

  get isGenerationId(): boolean {
    return true;
  }
}