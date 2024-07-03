import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import Sideber from "@/components/organisms/Sideber";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";
import { getTargetsByUserId, getUserId } from "../../utils/supabaseFunction";


export default function Home() {

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
