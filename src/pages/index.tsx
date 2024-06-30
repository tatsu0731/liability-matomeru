import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/supabaseFunction";
import Sideber from "@/components/organisms/Sideber";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";


export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);

  const router = useRouter();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    router.reload()
  }

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
      <p onClick={() => handleLogOut()}>ログアウトする</p>
    </>
  );
}
