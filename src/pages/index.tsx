import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/supabaseFunction";
import Sideber from "@/components/organisms/Sideber";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";


export default function Home() {
  const [thanks, setThanks] = useState<any>([]);

  useEffect(() => {
    const getThanks = async () => {
      let { data: Thanks, error } = await supabase
        .from('Thanks')
        .select(`
          title,
          Target (
            target_id
          )
        `)
      setThanks(Thanks);
    }
    getThanks();
  },[])

  console.log(thanks)

  return (
    <div className="flex">
      <Sideber />
      <div className="flex flex-col w-full">
        <Header />
        {/* 分岐する */}
        <div className="my-auto mx-auto">
          <div className="flex flex-col items-center gap-y-4">
            <h2 className=" text-gray-300 text-lg font-bold">債務対象ユーザーを選択してください</h2>
            <p className="text-sm text-emerald-200 font-bold">Please select the user to be indebted !</p>
          </div>
        </div>
      </div>
    </div>
  );
}
