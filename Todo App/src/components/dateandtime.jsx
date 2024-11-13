import React from 'react'

const [currentDate, setCurrentDate] = useState('');
useEffect(() => {
    // Create a new Date object
    const date = new Date();

    // Get the day of the week (0 for Sunday, 6 for Saturday)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];

    // Get the date (e.g., 1, 2, 3)
    const dayOfMonth = date.getDate();

    // Get the month (0 is January, so we add 1)
    const month = date.getMonth() + 1;

    // Get the year
    const year = date.getFullYear();

    // Format the date as you like, e.g., "Tuesday, 02/10/2024"
    const formattedDate = `${dayName}, ${dayOfMonth}/${month}/${year}`;

    // Update state with the formatted date
    setCurrentDate(formattedDate);
  }, []);

const dateandtime = () => {
  return (
    <div className='flex flex-col text-white justify-center items-center py-4'>
    <h3 className='text-xl font-bold'>{currentDate.split(",")[0]}</h3>
    <h5 className='text-sm'>{currentDate.split(",")[1]}</h5>
    </div>
  )
}

export default dateandtime
