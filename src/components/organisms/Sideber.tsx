import Link from "next/link";
import Article from "../atoms/Article";
import Title from "../atoms/Title";
import { getTargets, getTargetsByUserId, getUserId } from "../../../utils/supabaseFunction";

import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";

export default function Sideber() {
    const [targets, setTargets] = useState<{
        id: number;
        title: string;
        created_at: string;
        status: boolean;
        user_id: string
    }[]>([]);

    const [targetUser, setTargetUser] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);

    const [targetId, setTargetId] = useState<number | null>(null);
    console.log(targetId)

    useEffect(() => {
        const fetchTargetsByUserId = async () => {
            const user_id = await getUserId();
            const data = await getTargetsByUserId(user_id);
            if (data !== null) {
                setTargets(data);
            }
        };
        fetchTargetsByUserId();
    }, []);

    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
        // router.reload();
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
            .from('Targets')
            .insert([
            { title: targetUser, status: false, user_id: await getUserId() },
            ])
            .select()
            router.reload();
            console.log(targetUser)
        } catch (error) {
            setError(true)
            console.log(error)
        }
    }

    return (
    <div className=" w-60 h-screen px-4 bg-emerald-400 text-white flex flex-col justify-between items-center border-r-2 border-slate-300">
        <div>
            <Link href="/">
            <Title />
            </Link>
            <div className="">
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債務対象一覧</h2>
                {targets.map((target) => (
                    <Link href={`/${target.id}`} key={target.id}>
                        <p onClick={() => setTargetId(target.id)}>{target.title}</p>
                    </Link>
                ))}
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債務対象新規作成</h2>
                <form>
                    <input type="text" placeholder="債務対象名" className="text-black px-1 rounded-md" onChange={(e) => setTargetUser(e.target.value)}/>
                    {error && <p className="text-red-400 text-sm">作成に失敗しました</p>}
                    <button className=" text-emerald-400 py-1 px-4 bg-white rounded-md mt-2 shadow-sm" onClick={handleSubmit}>作成</button>
                </form>
            </div>
        </div>
        <button className="mb-4 text-sm" onClick={() => signOut()}>ログアウト</button>
    </div>
    )
}