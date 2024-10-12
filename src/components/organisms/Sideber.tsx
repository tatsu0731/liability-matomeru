import Link from "next/link";
import Title from "../atoms/Title";
import { getUserId } from "../../../utils/supabaseFunction";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";
import Thanks from "../atoms/Thanks";
import Copyright from "../atoms/Copyright";
import Image from "next/image";

type setTitleType = Dispatch<SetStateAction<string>>

export default function Sideber({setTitle}: {setTitle: setTitleType}) {
    const [targets, setTargets] = useState<{
        id: number;
        title: string;
        created_at: string;
        status: boolean;
        user_id: string;
        Thanks: [];
    }[]>([]);

    const [targetUser, setTargetUser] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [comment, setComment] = useState<boolean>(false);

    const targetUserRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchTargetsByUserId = async () => {
            const user_id = await getUserId();
            setUserId(user_id)
            const { data, error } = await supabase.from('Targets').select(`*, Thanks(target_id, done)`).eq('user_id', user_id).eq('Thanks.done', false);
            if (!error) {
                setTargets(data);
            }
        };
        fetchTargetsByUserId();

        if (targets.length >= 5) {
            setComment(true)
        } else {
            setComment(false)
        }
    }, [targets.length]);

    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const targetUserValue = targetUserRef.current?.value

        if (!targetUserValue) {
            return
        };

        const { data, error } = await supabase
        .from('Targets')
        .insert([
        { title: targetUserValue, status: false, user_id: userId },
        ])
        .select()
        if (!error) {
            setTargets((prevTargets) => [...prevTargets, ...data])
            if (targetUserRef.current) {
                targetUserRef.current.value = "";
            }
            return
        }
        setError(true)
    }

    const randomComments = () => {
        const value = targets.length % 10;
        console.log(value)
        return COMMENTS[value]
    }

    const COMMENTS = [
        "一番良いのは借りを作らないことだと思うよ、、、",
        "自分を見直してみない、、、？",
        "たくさんの人に迷惑かけてるね、、、",
        "一番良いのは借りを作らないことだと思うよ、、、",
        "自分を見直してみない、、、？",
        "たくさんの人に迷惑かけてるね、、、",
        "一番良いのは借りを作らないことだと思うよ、、、",
        "自分を見直してみない、、、？",
        "たくさんの人に迷惑かけてるね、、、",
    ]

    return (
    <div className=" w-60 h-screen px-4 bg-gradient-to-b from-emerald-400 from-70% to-sky-400 text-white flex flex-col justify-between items-center border-r-2 border-slate-300">
        <div>
            <Link href="/">
            <Title setTitle={setTitle}/>
            </Link>
            <div className="">
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債権者一覧</h2>
                {targets.map((target) => (
                    <Thanks target={target} key={target.id} setTargets={setTargets}/>
                ))}
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債権者新規作成</h2>
                <form>
                    <input type="text" placeholder="債権者名" className="text-black px-1 rounded-md" ref={targetUserRef}/>
                    {error && <p className="text-red-400 text-sm">作成に失敗しました</p>}
                    <button className=" text-emerald-400 py-1 px-4 bg-white rounded-md mt-2 shadow-sm" onClick={handleSubmit}>作成</button>
                </form>
            </div>
        </div>
            <div className="mb-4 flex flex-col gap-4 items-center">
                {comment &&
                    <div className="border-2 rounded-md mb-8">
                        <p className="p-2">{randomComments()}</p>
                    </div>
                }
                <button className="text-sm flex items-center gap-1" onClick={() => signOut()}>
                    <Image src={"log-out.svg"} width={16} height={16} alt=""/>
                    <p>ログアウト</p>
                </button>
                <Copyright />
            </div>
    </div>
    )
}