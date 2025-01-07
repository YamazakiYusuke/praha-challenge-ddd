import { Module } from '@nestjs/common';
import { AssignmentProgressController } from 'src/controller/assignment-progress/assignment-progress.controller';
import { PairController } from 'src/controller/pair/pair.controller';
import { ParticipantController } from 'src/controller/participant/participant.controller';
import { TeamController } from 'src/controller/team/team-controller';

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [
    AssignmentProgressController, 
    PairController, 
    ParticipantController, 
    TeamController,
  ],
  providers: [],
})
export class AppModule { }
