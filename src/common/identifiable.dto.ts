import { IsUUID } from 'class-validator';

export class Identifiable {
  /**
   * 고유 ID
   *
   * @example "429b20b3-4df8-42da-8e40-e3816504792c"
   */
  @IsUUID()
  id: string;
}
