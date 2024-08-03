import { Recipe, BlogPost } from "../components/ui/types";

export const recipeData: Recipe = {
  title: "Honey Chipotle Chicken Skewers",
  rating: 4.9,
  reviews: 17,
  description:
    "These chicken skewers are a family favorite! Very easy, deliciously smoky, nice and sweet, with a good amount of spice and bite. Air fryer, grill, and oven-friendly!",
  image: "/Honey-Chipotle-Chicken-Skewers.webp",
  totalTime: "20 minutes",
  yield: "3-4 servings",
  ingredients: {
    chicken: [
      {
        item: "chicken breasts",
        amount: "1 pound",
        note: "cut into bite-sized pieces",
      },
      { item: "wood skewers", amount: "", note: "(optional)" },
    ],
    honeyChipotleMix: [
      { item: "honey", amount: "1 1/2 tablespoon" },
      { item: "chipotle pepper in adobo", amount: "1", note: "minced" },
      // ... rest of the ingredients
    ],
  },
  instructions: [
    {
      step: 1,
      description:
        "Soak: Soak the skewers in water for 15-30 minutes while you prep the chicken.",
    },
    // ... rest of the instructions
  ],
};

export const blogPostData: BlogPost = {
  ...recipeData,
  author: {
    name: "Lindsay",
    bio: "I'm a former 4th grade teacher, now full time blogger. My husband Bjork and I live in Minnesota. Favorite things include my camera, lake days, and dark chocolate.",
    image: "/Honey-Chipotle-Chicken-Skewers.webp",
  },
  content:
    "Bjork is still rocking the protein guy life, and, okay, I'm trying to eat more protein too, so we make chicken A LOT right now. And as much as I love the absolute all-star air fryer chicken (which is to the maximum), lately I've been mixing it up with these honey chipotle chicken skewers.",
  inThisPost: [
    "Jump To The Recipe",
    "Why I Love This Recipe",
    "Visual Walk-Through of the Recipe",
    "Video",
    "Frequently Asked Questions",
    "Ratings",
  ],
};
