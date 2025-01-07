import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  await deleteAll();
  const generation = await createGeneration('1', '2024年');
  const team1 = await createTeam('1', '1', generation.id);
  const team2 = await createTeam('2', '2', generation.id);
  const team1Pair1 = await createPair('1', 'a', team1.id);
  const team1Pair2 = await createPair('2', 'b', team1.id);
  const team2Pair1 = await createPair('3', 'a', team2.id);
  const team2Pair2 = await createPair('4', 'b', team2.id);
  const category1 = await createCategory('1', 'データベース設計');
  const category2 = await createCategory('2', 'テスト');
  const assignments = [
    await createAssignment('1', 1, 'DBモデリング1', '個人的に、WEBアプリケーションの各要素で最も強く影響を及ぼすのはデータベース設計だと感じます。', '上記の注文表のデータを保存するためのDBスキーマを設計して、簡単なスケッチを作成してください', category1.id),
    await createAssignment('2', 2, 'DBモデリング2', 'DBモデリングは経験の世界です。', 'Slackのようなチャットサービスのメッセージを保存するためのDBを設計してスケッチを作成してください', category1.id),
    await createAssignment('3', 3, 'jestで単体テストを書こう', '品質の高いコードを書く上で、単体テストは非常に重要です', 'functions.tsのテストカバレッジが100%になり、かつ全ての単体テストが通過するよう、テストを書いてください。', category2.id),
    await createAssignment('4', 4, 'storybookを作ろう', '「Storybook」はフロントエンドの開発でよく用いられるツールで、簡単に言うとフロントエンドのコンポーネントを一覧化した、カタログのような物です', 'PrAha ChallengeにはReactを触ったことのない方も参加しているかと思いますので、まずはReactの基礎から始めたいと思います。以下のチュートリアルを実施してください。', category2.id),
  ];
  const participants = [
    await createParticipant('1', 'アントニオ猪木', 'inoki@example.com', 0, team1.id, team1Pair1.id),
    await createParticipant('2', '鈴木宗男', 'muneo@example.com', 0, team1.id, team1Pair1.id),
    await createParticipant('3', '田中角栄', 'kakuei@example.com', 0, team1.id, team1Pair1.id),
    await createParticipant('4', '米津玄師', 'genshi@example.com', 0, team1.id, team1Pair2.id),
    await createParticipant('5', 'エド・シーラン', 'sheeran@example.com', 0, team1.id, team1Pair2.id),
    await createParticipant('6', 'ヨルシカ', 'yorusika@example.com', 0, team1.id, team1Pair2.id),
    await createParticipant('7', '大谷翔平', 'otani@example.com', 0, team2.id, team2Pair1.id),
    await createParticipant('8', '富永啓生', 'eisei@example.com', 0, team2.id, team2Pair1.id),
    await createParticipant('9', '久保建英', 'takefusa@example.com', 0, team2.id, team2Pair1.id),
    await createParticipant('10', 'アイザック・ニュートン', 'newton@example.com', 0, team2.id, team2Pair2.id),
    await createParticipant('11', 'アルベルト・アインシュタイン', 'einstein@example.com', 0, team2.id, team2Pair2.id),
    await createParticipant('12', 'スティーブン・ホーキング', 'hawking@example.com', 0, team2.id, team2Pair2.id),
  ];
  await createAdministrator('1', 'administrator@example.com');
  var assignmentProgressId = 1;
  for (const participant of participants) {
    for (const assignment of assignments) {
      let state = Math.floor(Math.random() * 3);
      await createAssignmentProgress(assignmentProgressId.toString(), state, participant.id, assignment.id);
      assignmentProgressId++;
    }
  }

  console.log('Succeed to create seed data!')
}

async function deleteAll() {
  await prisma.adminEmailSender.deleteMany()
  await prisma.adminEmail.deleteMany()
  await prisma.administrator.deleteMany()
  await prisma.assignmentProgress.deleteMany()
  await prisma.participant.deleteMany()
  await prisma.assignment.deleteMany()
  await prisma.category.deleteMany()
  await prisma.pair.deleteMany()
  await prisma.team.deleteMany()
  await prisma.generation.deleteMany()
}

async function createGeneration(id: string, name: string) {
  return await prisma.generation.create({
    data: {
      id,
      name
    }
  });
}

async function createTeam(id: string, name: string, generationId: string) {
  return await prisma.team.create({
    data: {
      id,
      name,
      generationId
    }
  });
}

async function createPair(id: string, name: string, teamId: string) {
  return await prisma.pair.create({
    data: {
      id,
      name,
      teamId
    }
  });
}

async function createCategory(id: string, name: string) {
  return await prisma.category.create({
    data: {
      id,
      name
    }
  });
}

async function createAssignment(id: string, number: number, title: string, introduction: string, content: string, categoryId: string) {
  return await prisma.assignment.create({
    data: {
      id,
      number,
      title,
      introduction,
      content,
      categoryId
    }
  });
}

async function createParticipant(id: string, name: string, email: string, enrollmentStatus: number, teamId: string, pairId: string) {
  return await prisma.participant.create({
    data: {
      id,
      name,
      email,
      enrollmentStatus,
      teamId,
      pairId
    }
  });
}

async function createAdministrator(id: string, email: string) {
  return await prisma.administrator.create({
    data: {
      id: id,
      email: email
    }
  });
}

async function createAssignmentProgress(id: string, state: number, participantId: string, assignmentId: string) {
  return await prisma.assignmentProgress.create({
    data: {
      id: id,
      state: state,
      participantId: participantId,
      assignmentId: assignmentId
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
