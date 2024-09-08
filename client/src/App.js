
import { useEffect, useState } from 'react';
import './App.css';
import ListHeader from './Components/ListHeader/ListHeader';
import ListItem from './Components/ListItem/ListItem'
import Auth from './Components/Auth/Auth';

const App = () =>{

  const userEmail= 'temp021889@gmail.com'
  const [tasks, setTasks] = useState(null)

  const authToken = false

  const getData = async () =>{
    try {
      const response = await fetch(`http://localhost:5000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() =>{
    getData()
  }, [])

 const sortedTask = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && <>
        <ListHeader listName={'🏝️ Holiday Tick List'} getData={getData}/>
          {sortedTask?.map((task, index) => {
            return <ListItem task={task} key={index} getData={getData}/>
            })}
          </>}
      
    </div>
  );
}

export default App;
