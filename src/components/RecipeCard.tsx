import React, { useState } from "react";
import { Recipe } from "./ui/types";
import { motion } from "framer-motion";
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [unit, setUnit] = useState("US");
  const [scale, setScale] = useState("1x");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-center px-4">{recipe.title}</h2>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-8 h-8 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-3 text-lg">
            {recipe.rating} from {recipe.reviews} reviews
          </span>
        </div>
        <div className="flex justify-between mb-6 text-lg">
          <span>Total Time: {recipe.totalTime}</span>
          <span>Yield: {recipe.yield}</span>
        </div>
        <div className="flex space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-800 px-6 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-purple-100"
          >
            PRINT RECIPE
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-800 px-6 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-purple-100"
          >
            PIN RECIPE
          </motion.button>
        </div>
        <p className="mb-8 text-lg leading-relaxed">{recipe.description}</p>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">INGREDIENTS</h3>
          <div className="flex space-x-4 mb-6">
            {['US', 'M'].map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${unit === u ? "bg-white text-purple-800" : "bg-purple-600 hover:bg-purple-500"
                  }`}
              >
                {u}
              </button>
            ))}
            {['1x', '2x'].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${scale === s ? "bg-white text-purple-800" : "bg-purple-600 hover:bg-purple-500"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
          {Object.entries(recipe.ingredients).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h4 className="font-bold text-xl mb-3 capitalize">{category}:</h4>
              {items.map((ing, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">
                    {ing.amount} {ing.item}
                    {ing.note && <span className="text-purple-300">, {ing.note}</span>}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6">INSTRUCTIONS</h3>
          {recipe.instructions.map((instruction) => (
            <div
              key={instruction.step}
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-bold text-xl mb-2">
                {instruction.step}. {instruction.description.split(":")[0]}:
              </h4>
              <p className="text-lg leading-relaxed">{instruction.description.split(":")[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeCard;
