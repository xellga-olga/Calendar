import React, { useState } from 'react';
import './static/css/global.css'
import { Calendar } from './components/Calendar/Calendar';
import { formateDate } from './utils/helpers/date';



export const App: React.FC = () => {
   const [selectedDate, selectDate] = useState(new Date());

   return (
      <div className='app-container'> 
         <div className='date-container'>{formateDate(selectedDate, 'DD MM YYYY')}</div>
         <Calendar selectDate={selectDate} selectedDate={selectedDate}/>
      </div>
   )
}

export default App;
