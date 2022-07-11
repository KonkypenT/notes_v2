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
  public id: number;

  @ViewColumn()
  public userId: number;

  @ViewColumn()
  public ownerId: number;

  @ViewColumn()
  public title: string;

  @ViewColumn()
  public photo: string;

  @ViewColumn()
  public description: string;
}
