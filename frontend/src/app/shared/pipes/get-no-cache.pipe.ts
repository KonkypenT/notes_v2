import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noCache' })
export class GetNoCachePipe implements PipeTransform {
  public transform(): number {
    return Math.random();
  }
}
