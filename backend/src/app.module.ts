import { Module } from '@nestjs/common';
import { AssignmentProgressController } from 'src/controller/assignment-progress/assignment-progress.controller';
import { PairController } from 'src/controller/pair/pair.controller';

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [AssignmentProgressController, PairController],
  providers: [],
})
export class AppModule { }
