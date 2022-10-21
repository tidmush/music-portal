import { Component,EventEmitter, Input, Output } from '@angular/core';
import { ListItem } from '../models/list-item';
const itemSize: number = 188;

@Component({
  selector: 'general-list',
  templateUrl: './general-list.template.html',
  styleUrls: ['./general-list.style.css']
})
export class GeneralListComponent {
  constructor() {
    this.listTransition = 0;
  }

  @Input() title: string;
  @Input() items: ListItem[];
  @Output() onItemSelected = new EventEmitter<ListItem>();
  private listTransition: number;


selectItem(listItem:ListItem){
  console.info("item selected", listItem);
  this.onItemSelected.emit(listItem);
}




  scrollList(direction: string): void {
    let itemsCount = this.items.length;
    if (direction === 'right' && this.listTransition < itemsCount * itemSize - itemSize) {
      this.listTransition += itemSize;
    }
    else if (direction === 'left' && this.listTransition > 0) {
      this.listTransition -= itemSize;
    }

  }

}
