import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import VideoComponents from '../../data/data';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent implements OnInit {

  constructor() {}
  counter: any;

  ngOnInit(): void {
    this.counter = this.createCounter();
  }

  @ViewChild('cardsContainer', { read: ViewContainerRef }) cardsContainer!: ViewContainerRef;
  
  childComponents: { [refId: string]: ComponentRef<CardComponent> } = {};

  addChild = () => {
    this.counter.increment()
    const ref = this.cardsContainer.createComponent(CardComponent);
    ref.setInput('data', VideoComponents[this.counter.getIndex()]);
    ref.setInput('templateRef',  VideoComponents[this.counter.getIndex()].refId)
    this.childComponents[VideoComponents[this.counter.getIndex()].refId] = ref;
    this.bindEvent(ref);
  }

  removeChild=(data:any)=>{
    const componentRef = this.childComponents[data];
    if(componentRef){
      componentRef.destroy();
      delete this.childComponents[data];
    }
  }

  createCounter = () => {
    let index = 0;
    return {
      increment: () => {
        return index++;
      },
      decrement: () => {
        return index--;
      },
      getIndex: () => {
        return index;
      }
    }
  }


  bindEvent(ref: ComponentRef<CardComponent>) {
    ref.instance.removeCard.subscribe((data) => {
      console.log('Button clicked in dynamically created CardComponent' + data);
      this.removeChild(data);
    });
  }
}
