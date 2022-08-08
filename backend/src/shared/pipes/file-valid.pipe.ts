import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata): any | boolean {
    const size = 2_000_000;
    if (value.size < size && this.checkType(value.mimetype)) {
      return value;
    }
    return false;
  }

  private checkType(type: string): boolean {
    return !!type.match(/\/(jpeg|jpg|png)$/);
  }
}
