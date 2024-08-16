import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import { getThanks } from "../../../utils/supabaseFunction";
import Sideber from "@/components/organisms/Sideber";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import Table from "@/components/molecules/Table";


export default function Id() {

    return (
        <div className="flex">
        <Sideber />
        <div className="flex flex-col w-full">
            <Header />
            <Table />
        </div>
        </div>
    );
}
