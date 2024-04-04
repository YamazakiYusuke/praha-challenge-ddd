import { SaveParticipantCommand } from 'src/domain/commands/participant/save-participant-command';
import { Participant } from 'src/domain/entities/participant';
import { IParticipantRepository } from 'src/domain/repositories/participant-repository';
import { Email } from 'src/domain/values/email';
import { PairId, TeamId } from 'src/domain/values/id';
import { PersonName } from 'src/domain/values/name';
import { EnrollmentStatusValue } from 'src/util/enums';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveParticipantCommand UnitTest \n', () => {
  let command: SaveParticipantCommand;
  let participantRepository: IParticipantRepository;

  beforeEach(() => {
    participantRepository = mock<IParticipantRepository>();
    command = new SaveParticipantCommand(instance(participantRepository));
  });

  it('- should save participant \n', async () => {
    // 準備
    const participant = Participant.create({
      name: PersonName.create('John Doe'),
      email: Email.create('johndoe@example.com'),
      teamId: TeamId.create(),
      pairId: PairId.create(),
      enrollmentStatus: EnrollmentStatusValue.Enrolled
    });
    const transaction = {};

    when(participantRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(participant, transaction);

    // 確認
    verify(participantRepository.save(participant, transaction)).once();
  });
});
