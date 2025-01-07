import 'reflect-metadata';

import { ParticipantDto } from 'src/app/participant/dto/participant-dto';
import { GetAllParticipantsUsecase } from 'src/app/participant/get-all-participants-usecase';
import { UsecaseSuccessResponse } from 'src/app/responses/usecase-responses';
import { setupDI } from 'src/infra/di/di';
import { container } from 'tsyringe';

describe('ParticipantController', () => {
  beforeAll(async () => {
    setupDI()
  });

  describe('GetAllParticipantsUsecase', () => {
    it('should return an empty array of participants', async () => {
      const usecase = container.resolve(GetAllParticipantsUsecase);
      const response = await usecase.execute()

      const participants: ParticipantDto[] = [];

      const expectedResponse = new UsecaseSuccessResponse(participants);
      expect(response).toEqual(expectedResponse);
    });
  });
});