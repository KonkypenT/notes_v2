import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
        select
        "group"."id", "group"."title", "group"."ownerId", "group"."photo", "group"."description", "members"."userId", "user"."firstName", "user"."surname", "user"."username", "user"."email", "user"."photo" as "userPhoto"
        from
        "group" "group"
        left join
        "members" "members"
        on
        "group"."id" = "members"."groupId"
        left join 
        "user" "user"
        on
        "members"."userId" = "user"."id"
    `,
})
export class FullInfoAboutGroupView {
  @ViewColumn()
  public id: number;

  @ViewColumn()
  public title: string;

  @ViewColumn()
  public ownerId: number;

  @ViewColumn()
  public photo: string;

  @ViewColumn()
  public description: string;

  @ViewColumn()
  public userId: number;

  @ViewColumn()
  public firstName: string;

  @ViewColumn()
  public surname: string;

  @ViewColumn()
  public username: string;

  @ViewColumn()
  public email: string;

  @ViewColumn()
  public userPhoto: string;
}
