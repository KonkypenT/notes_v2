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
  public photo: string;
}
