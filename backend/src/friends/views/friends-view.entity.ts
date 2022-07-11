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
  public id: number;

  @ViewColumn()
  public userId: number;

  @ViewColumn()
  public friendId: number;

  @ViewColumn()
  public firstName: string;

  @ViewColumn()
  public surname: string;

  @ViewColumn()
  public username: string;

  @ViewColumn()
  public email: string;

  @ViewColumn()
  public linkId: number;

  @ViewColumn()
  public photo: string;
}
