import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/supabaseFunction";
import Sideber from "@/components/organisms/Sideber";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";


export default function Home() {

  return (
    <div className="flex">
      <Sideber />
      <div className="flex flex-col w-full">
        <Header />
        {/* 分岐する */}
        <div className="my-auto mx-auto">
          <h2 className=" text-gray-300 text-lg font-bold">債務対象ユーザーを選択してください</h2>
        </div>
      </div>
    </div>
  );
}
