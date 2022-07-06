import { FormControl } from '@angular/forms';

export interface GroupFormModel {
  id?: FormControl<number | null>;
  title: FormControl<string>;
  createDate?: FormControl<Date>;
  ownerId?: FormControl<number | null>;
  isActive?: FormControl<boolean>;
  photo?: FormControl<string>;
  inactiveDate?: FormControl<Date>;
}
