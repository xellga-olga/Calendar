import React, { useState } from 'react';
import './static/css/global.css'
import { Calendar } from './components/Calendar/Calendar';



export const App: React.FC = () => {
   const [selectedDate, selectDate] = useState(new Date());

   return (
      <div className='app-container'> 
         <Calendar selectDate={selectDate} selectedDate={selectedDate}/>
      </div>
   )
}

export default App;
