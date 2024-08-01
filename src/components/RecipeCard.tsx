import React, { useState } from "react";
import { Recipe } from "./ui/types";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [unit, setUnit] = useState("US");
  const [scale, setScale] = useState("1x");

  return (
    <div className="bg-purple-800 text-white rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-center">{recipe.title}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2">
            {recipe.rating} from {recipe.reviews} reviews
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span>TOTAL TIME: {recipe.totalTime}</span>
          <span>YIELD: {recipe.yield}</span>
        </div>
        <div className="flex space-x-4 mb-6">
          <button className="bg-white text-purple-800 px-4 py-2 rounded">
            PRINT RECIPE
          </button>
          <button className="bg-white text-purple-800 px-4 py-2 rounded">
            PIN RECIPE
          </button>
        </div>
        <p className="mb-6">{recipe.description}</p>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">INGREDIENTS</h3>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setUnit("US")}
              className={`px-2 py-1 rounded ${unit === "US" ? "bg-white text-purple-800" : "bg-purple-700"}`}>
              US
            </button>
            <button
              onClick={() => setUnit("M")}
              className={`px-2 py-1 rounded ${unit === "M" ? "bg-white text-purple-800" : "bg-purple-700"}`}>
              M
            </button>
            <button
              onClick={() => setScale("1x")}
              className={`px-2 py-1 rounded ${scale === "1x" ? "bg-white text-purple-800" : "bg-purple-700"}`}>
              1x
            </button>
            <button
              onClick={() => setScale("2x")}
              className={`px-2 py-1 rounded ${scale === "2x" ? "bg-white text-purple-800" : "bg-purple-700"}`}>
              2x
            </button>
          </div>
          <h4 className="font-bold mb-2">Chicken:</h4>
          {recipe.ingredients.chicken.map((ing, index) => (
            <div
              key={index}
              className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
              />
              <span>
                {ing.amount} {ing.item}
                {ing.note && `, ${ing.note}`}
              </span>
            </div>
          ))}
          <h4 className="font-bold mt-4 mb-2">Honey Chipotle Mix:</h4>
          {recipe.ingredients.honeyChipotleMix.map((ing, index) => (
            <div
              key={index}
              className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
              />
              <span>
                {ing.amount} {ing.item}
                {ing.note && `, ${ing.note}`}
              </span>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">INSTRUCTIONS</h3>
          {recipe.instructions.map((instruction) => (
            <div
              key={instruction.step}
              className="mb-4">
              <h4 className="font-bold">
                {instruction.step}. {instruction.description.split(":")[0]}:
              </h4>
              <p>{instruction.description.split(":")[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
