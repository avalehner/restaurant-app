import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuArray = [
  {
      name: "Pizza",
      ingredients: ["pepperoni", "mushrom", "mozarella"],
      price: 14,
      emoji: "🍕",
      id: 0,
      image: 'images/pizza-img.png',
      uuid: uuidv4()
  },
  {
      name: "Hamburger",
      ingredients: ["beef", "cheese", "lettuce"],
      price: 12,
      emoji: "🍔",
      id: 1, 
      image: 'images/hamburger-img.png', 
      uuid: uuidv4()
  },
      {
      name: "Beer",
      ingredients: ["grain, hops, yeast, water"],
      price: 12,
      emoji: "🍺",
      id: 2,
      image: 'images/beer-img.png', 
      uuid: uuidv4()
  }
]
