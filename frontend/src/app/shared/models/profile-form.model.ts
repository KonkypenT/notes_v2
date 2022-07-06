import { FormControl } from '@angular/forms';

export interface ProfileFormModel {
  id: FormControl<number>;
  username: FormControl<string>;
  firstName: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
}
