import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'publishTime',
  standalone: true
})
export class PublishTimePipe implements PipeTransform {

  transform(dateString:string): unknown {
      const currentDate = new Date();
      const providedDate = new Date(dateString);
      const yearDifference = currentDate.getFullYear() - providedDate.getFullYear();
  
      if (yearDifference === 0) {
          const monthDifference = currentDate.getMonth() - providedDate.getMonth();
          return `${monthDifference} months ago`;
      } else if (yearDifference === 1) {
          return `1 year ago`;
      } else if (yearDifference > 1 && yearDifference < 2) {
          const months = (currentDate.getMonth() + 12) - providedDate.getMonth();
          return `1 year and ${months} months ago`;
      } else if (yearDifference >= 2 && yearDifference < 3) {
          return `${yearDifference} years ago`;
      } else {
          const years = Math.floor(yearDifference);
          return `${years} years ago`;
      }

    return null;
  }

}
