import { Module } from '@nestjs/common';
import { AssignmentProgressController } from 'src/controller/assignment-progress/assignment-progress.controller';

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [AssignmentProgressController],
  providers: [],
})
export class AppModule { }
