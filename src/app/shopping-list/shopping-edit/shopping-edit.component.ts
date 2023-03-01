import {
  Component, OnDestroy,
  OnInit, ViewChild,

} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {Form, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode: boolean ;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription =this.slService.startedEditing.subscribe(
      (i:number)=>{
        this.editedItemIndex=i;
        this.editMode = true;
        this.editedItem =this.slService.getIngredient(i);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount:this.editedItem.amount,
        })
      }
    );
  }

  onAddItem(form: NgForm) {
     const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredients(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode =false;
  }

  onDelete() {
    this.slService.deleteIngredients(this.editedItemIndex);
   this.onClear();
  }
}
