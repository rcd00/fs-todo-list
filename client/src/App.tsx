import React, { useState, useEffect } from 'react';
import TodoContainer from "./components/TodoContainer";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/list`)
      const json = await response.json()
      setTodoItems(json)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const sortedItems = todoItems.sort((a, b) => {
    var dateA = new Date(a['last_updated']).getTime()
    var dateB = new Date(b['last_updated']).getTime()
    return dateB - dateA;
  })

  return (
    <div className="App m-20" >
      <TodoContainer todoItems={sortedItems} getData={getData} />
    </div>
  );
}

export default App;
