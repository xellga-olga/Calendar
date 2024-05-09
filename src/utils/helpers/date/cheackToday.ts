import { cheackDateEqual } from "./cheackDateEqual";

export const cheackToday = (date: Date) => {
   
   const today = new Date()

   return cheackDateEqual(today, date);
}

