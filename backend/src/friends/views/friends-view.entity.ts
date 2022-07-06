import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
        select "friends"."id", "friends"."userId", "friends"."friendId", "user"."firstName", "user"."surname", 
        "user"."username", "user"."email", "friends"."linkId", "user"."photo"
        from "friends" "friends"
        left join "user" "user" on "friends"."friendId" = "user"."id"
    `,
})
export class FriendsView {
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
  linkId: number;

  @ViewColumn()
  photo: string;
}
