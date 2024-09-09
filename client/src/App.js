
import { useEffect, useState } from 'react';
import './App.css';
import ListHeader from './Components/ListHeader/ListHeader';
import ListItem from './Components/ListItem/ListItem'
import Auth from './Components/Auth/Auth';
import {useCookies } from 'react-cookie'
const App = () =>{

  const [cookie, setCookie, removeCookie] = useCookies(null)
  const authToken = cookie.AuthToken
  const userEmail= cookie.Email
  const [tasks, setTasks] = useState(null)

  const getData = async () =>{
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() =>{
    
    if(authToken){
      getData()
      }

    }, [])

 const sortedTask = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && <>
        <ListHeader listName={'🏝️ Holiday Tick List'} getData={getData}/>
        <p className='user-email'>Welcome Back {userEmail.toUpperCase()}</p>
          {sortedTask?.map((task, index) => {
            return <ListItem task={task} key={index} getData={getData}/>
            })}
          </>}
          <p className='copyright'>&copy; Custom Codding LLC</p>
    </div>
  );
}

export default App;
