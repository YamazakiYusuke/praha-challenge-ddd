import { Participant } from "src/domain/entities/participant";
import { Value } from "./base/value";

export interface AdminEmailContentProps {
  title: string;
  body: string;
}

export class AdminEmailContent extends Value<AdminEmailContentProps> {
  private constructor(props: AdminEmailContentProps) {
    super(props);
  }

  /**
   * 参加可能なペアー見つかりません
   * - 新規参加
   * - 休会からの復帰
   */
  static join(participant: Participant): AdminEmailContent {
    return new AdminEmailContent({
      title: "[重要]プラハチャレンジ",
      body: `プラハチャレンジに新規参加・復帰を希望する参加者がいますが、参加可能なペアー見つかりませんでした。
      参加者: ${participant.name.value}
      `
    });
  }

  /**
   * 合流可能なペアーが見つかりません
   * - ペアー減少による移動
   */
  static relocate(leavingParticipant: Participant, seekingParticipant: Participant): AdminEmailContent {
    return new AdminEmailContent({
      title: "[重要]プラハチャレンジ",
      body: `ペアーメンバー数減少によるメンバーの移動が必要ですが、合流可能なペアー見つかりませんでした。
      休会・退会した参加者: ${leavingParticipant.name.value}
      合流先を探している参加者: ${seekingParticipant.name.value}
      `
    });
  }

  /**
 * チームのメンバーが2名以下になりました
 */
  static teamMemberAlert(leavingParticipant: Participant, remainingParticipants: Participant[]): AdminEmailContent {
    const names = remainingParticipants.map((participant) => participant.name.value).join('/');
    return new AdminEmailContent({
      title: "[重要]プラハチャレンジ",
      body: `チームのメンバーが2名以下になりました。
        休会・退会した参加者: ${leavingParticipant.name.value}
        現状のチームの参加者: ${names}
        `
    });
  }

  static restore(props: AdminEmailContentProps): AdminEmailContent {
    return new AdminEmailContent(props);
  }

  public get title(): string {
    return this.props.title;
  }

  public get body(): string {
    return this.props.body;
  }
}