import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
        select "applications_friend"."id", "applications_friend"."userId", "applications_friend"."friendId", 
        "user"."firstName", "user"."surname", "user"."username", "user"."email", "user"."photo"
        from "applications_friend" "applications_friend"
        left join "user" "user" on "applications_friend"."friendId" = "user"."id"
    `,
})
export class ApplicationsView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  userId: number;

  @ViewColumn()
  friendId: number;

  @ViewColumn()
  firstName: string;

  @ViewColumn()
  surname: string;

  @ViewColumn()
  username: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  photo: string;
}
