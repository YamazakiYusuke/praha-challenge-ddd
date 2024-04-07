import { Body, Controller, Put } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PostSomeDataRequest } from './request/post-assignment-request'
import { container } from 'tsyringe'
import { ChangeAssignmentProgressUsecase } from 'src/app/assignment_progress/change-assignment-progress-usecase';

@Controller({
  path: '/assignment_progress',
})
export class SampleController {

  @Put()
  async putAssignmentProgress(
    @Body() postSomeDataDto: PostSomeDataRequest,
  ): Promise<void> {
    const usecase = container.resolve(ChangeAssignmentProgressUsecase);
    await usecase.execute({
      assignmentProgressId: postSomeDataDto.required,
      newState: postSomeDataDto.number,
    })
  }
}
