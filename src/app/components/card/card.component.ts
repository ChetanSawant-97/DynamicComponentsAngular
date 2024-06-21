import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublishTimePipe } from '../../pipes/publish-time.pipe';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [PublishTimePipe, NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data:any;
  @Input() templateRef:any;
  @Output() removeCard = new EventEmitter<number>(); 

  emitCardEvent() {
    this.removeCard.emit(this.data.refId); 
  }

}
