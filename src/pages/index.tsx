import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/supabaseFunction";
import Sideber from "@/components/organisms/Sideber";


export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    }
    getTodos();
  }, []);

  return (
    <>
      <Title />
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
        </div>
      ))}
      <Sideber />
    </>
  );
}
