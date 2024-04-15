import { Module } from '@nestjs/common';
import { AssignmentProgressController } from 'src/controller/assignment-progress/assignment-progress.controller';
import { PairController } from 'src/controller/pair/pair.controller';
import { ParticipantController } from 'src/controller/participant/participant.controller';

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [AssignmentProgressController, PairController, ParticipantController],
  providers: [],
})
export class AppModule { }
