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
  id: number;

  @ViewColumn()
  title: string;

  @ViewColumn()
  ownerId: number;

  @ViewColumn()
  photo: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  userId: number;

  @ViewColumn()
  firstName: string;

  @ViewColumn()
  surname: string;

  @ViewColumn()
  username: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  userPhoto: string;
}
