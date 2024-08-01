export interface Ingredient {
  item: string;
  amount: string;
  note?: string;
}

export interface Instruction {
  step: number;
  description: string;
}

export interface Recipe {
  title: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  totalTime: string;
  yield: string;
  ingredients: {
    chicken: Ingredient[];
    honeyChipotleMix: Ingredient[];
  };
  instructions: Instruction[];
}

export interface BlogPost extends Recipe {
  author: {
    name: string;
    bio: string;
    image: string;
  };
  content: string;
  inThisPost: string[];
}
