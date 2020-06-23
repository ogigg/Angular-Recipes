import { Ingredient } from './ingredient.model';


export class Recipe {

  id: Number;
  name: string;
  preparationTime: string;
  preparingSteps: string[];
  imageUrl: string;
  description: string;
  ingredients: Ingredient[];

}
