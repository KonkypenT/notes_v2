import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
        select
        "group"."id", "group"."title", "group"."ownerId", "group"."photo", "group"."description", "members"."userId"
        from
        "group" "group"
        left join
        "members" "members"
        on
        "group"."id" = "members"."groupId"
    `,
})
export class GroupView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  userId: number;

  @ViewColumn()
  ownerId: number;

  @ViewColumn()
  title: string;

  @ViewColumn()
  photo: string;

  @ViewColumn()
  description: string;
}
