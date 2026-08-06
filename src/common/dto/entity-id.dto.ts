import { IsInt, IsPositive } from 'class-validator';

export class EntityIdDto {
  @IsInt()
  @IsPositive()
  id!: number;
}
