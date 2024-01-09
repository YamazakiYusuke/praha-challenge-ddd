import { AdministratorId, AssignmentId, AssignmentProgressId, CategoryId, PairId, ParticipantId, ParticipantsId, TeamId } from "src/domain/values/id";

describe('# AdministratorId Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      // 準備
      const id = AdministratorId.create() as AdministratorId;
      // 実行・確認
      expect(id).toBeInstanceOf(AdministratorId);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      // 準備
      const id = AdministratorId.restore('testId');
      // 実行・確認
      expect(id).toBeInstanceOf(AdministratorId);
      expect(id.value).toEqual('testId');
    });
  });
  describe('## isAdministratorId \n', () => {
    it('- Success get bool \n', () => {
      // 準備
      const id = AdministratorId.restore('testId');
      // 実行・確認
      expect(id.isAdministratorId).toEqual(true);
    });
  });
});

describe('# AssignmentProgressId Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      const id = AssignmentProgressId.create() as AssignmentProgressId;
      expect(id).toBeInstanceOf(AssignmentProgressId);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      const id = AssignmentProgressId.restore('testId');
      expect(id).toBeInstanceOf(AssignmentProgressId);
      expect(id.value).toEqual('testId');
    });
  });
  describe('## isAssignmentProgressId \n', () => {
    it('- Success get bool \n', () => {
      // 準備
      const id = AssignmentProgressId.restore('testId');
      // 実行・確認
      expect(id.isAssignmentProgressId).toEqual(true);
    });
  });
});

describe('# AssignmentId Value UnitTest \n', () => {
  describe('## create \n', () => {
    it('- Success create instance \n', () => {
      const id = AssignmentId.create() as AssignmentId;
      expect(id).toBeInstanceOf(AssignmentId);
    });
  });
  describe('## restore \n', () => {
    it('- Success restore instance \n', () => {
      const id = AssignmentId.restore('testId');
      expect(id).toBeInstanceOf(AssignmentId);
      expect(id.value).toEqual('testId');
    });
  });
  describe('## isAssignmentId \n', () => {
    it('- Success get bool \n', () => {
      // 準備
      const id = AssignmentId.restore('testId');
      // 実行・確認
      expect(id.isAssignmentId).toEqual(true);
    });
  });

  describe('# CategoryId Value UnitTest \n', () => {
    describe('## create \n', () => {
      it('- Success create instance \n', () => {
        const id = CategoryId.create() as CategoryId;
        expect(id).toBeInstanceOf(CategoryId);
      });
    });
    describe('## restore \n', () => {
      it('- Success restore instance \n', () => {
        const id = CategoryId.restore('testId');
        expect(id).toBeInstanceOf(CategoryId);
        expect(id.value).toEqual('testId');
      });
    });
    describe('## isCategoryId \n', () => {
      it('- Success get bool \n', () => {
        // 準備
        const id = CategoryId.restore('testId');
        // 実行・確認
        expect(id.isCategoryId).toEqual(true);
      });
    });
  });

  describe('# PairId Value UnitTest \n', () => {
    describe('## create \n', () => {
      it('- Success create instance \n', () => {
        const id = PairId.create() as PairId;
        expect(id).toBeInstanceOf(PairId);
      });
    });
    describe('## restore \n', () => {
      it('- Success restore instance \n', () => {
        const id = PairId.restore('testId');
        expect(id).toBeInstanceOf(PairId);
        expect(id.value).toEqual('testId');
      });
    });
    describe('## isPairId \n', () => {
      it('- Success get bool \n', () => {
        // 準備
        const id = PairId.restore('testId');
        // 実行・確認
        expect(id.isPairId).toEqual(true);
      });
    });
  });

  describe('# ParticipantId Value UnitTest \n', () => {
    describe('## create \n', () => {
      it('- Success create instance \n', () => {
        const id = ParticipantId.create() as ParticipantId;
        expect(id).toBeInstanceOf(ParticipantId);
      });
    });
    describe('## restore \n', () => {
      it('- Success restore instance \n', () => {
        const id = ParticipantId.restore('testId');
        expect(id).toBeInstanceOf(ParticipantId);
        expect(id.value).toEqual('testId');
      });
    });
    describe('## isParticipantId \n', () => {
      it('- Success get bool \n', () => {
        // 準備
        const id = ParticipantId.restore('testId');
        // 実行・確認
        expect(id.isParticipantId).toEqual(true);
      });
    });
  });

  describe('# ParticipantsId Value UnitTest \n', () => {
    describe('## create \n', () => {
      it('- Success create instance \n', () => {
        const id = ParticipantsId.create() as ParticipantsId;
        expect(id).toBeInstanceOf(ParticipantsId);
      });
    });
    describe('## restore \n', () => {
      it('- Success restore instance \n', () => {
        const id = ParticipantsId.restore('testId');
        expect(id).toBeInstanceOf(ParticipantsId);
        expect(id.value).toEqual('testId');
      });
    });
    describe('## isParticipantsId \n', () => {
      it('- Success get bool \n', () => {
        // 準備
        const id = ParticipantsId.restore('testId');
        // 実行・確認
        expect(id.isParticipantsId).toEqual(true);
      });
    });
  });

  describe('# TeamId Value UnitTest \n', () => {
    describe('## create \n', () => {
      it('- Success create instance \n', () => {
        const id = TeamId.create() as TeamId;
        expect(id).toBeInstanceOf(TeamId);
      });
    });
    describe('## restore \n', () => {
      it('- Success restore instance \n', () => {
        const id = TeamId.restore('testId');
        expect(id).toBeInstanceOf(TeamId);
        expect(id.value).toEqual('testId');
      });
    });
    describe('## isTeamId \n', () => {
      it('- Success get bool \n', () => {
        // 準備
        const id = TeamId.restore('testId');
        // 実行・確認
        expect(id.isTeamId).toEqual(true);
      });
    });
  });
});

