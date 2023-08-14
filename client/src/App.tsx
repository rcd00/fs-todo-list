import React, { useState, useEffect } from 'react';
import TodoContainer from "./components/TodoContainer";

function App() {
  const [fetchedTodoItems, setFetchedTodoItems] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/list`)
      const json = await response.json()
      setFetchedTodoItems(json)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App flex justify-center mt-10" >
      <TodoContainer todoItems={fetchedTodoItems} getData={getData} />
    </div>
  );
}

export default App;
