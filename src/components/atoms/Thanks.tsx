import Link from "next/link"
import { useState } from "react"
import { supabase } from "../../../utils/supabase"

type targetType = {
    id: number;
    title: string;
    created_at: string;
    status: boolean;
    user_id: string;
    Thanks: [];
}

type ThanksProps = {
    target: targetType;
    setTargets: React.Dispatch<React.SetStateAction<targetType[]>>
}

export default function Thanks({target, setTargets}: ThanksProps) {

    const [hover, setHover] = useState(false)

    const handleDeleteTarget = async() => {
        const { error } = await supabase
        .from('Targets')
        .delete()
        .eq('id', target.id)
        if (!error) {
            setTargets(prevTargets => prevTargets.filter(t => t.id !== target.id));
        }
    }

    // 10文字以上を...で置換する関数
    const replaceTitle = (title:string) => {
        if (title.length > 7) {
            title = title.slice(0, 7)
            title = title + "...";
        }
        return title
    }

    const countThanks = (thanks:number) => {
        if (thanks !== 0) {
            return (`( ${thanks} )`)
        }
    }

    return(
        <div className={hover ? "flex justify-between mt-1 bg-white/40 rounded-md" : "flex justify-between mt-1"} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Link href={`/${target.id}`} key={target.id}>
                <p className="ml-2">{replaceTitle(target.title)} <span className=" text-red-400">{countThanks(target.Thanks.length)}</span></p>
            </Link>
            {hover && <p className="text-white mr-2 cursor-pointer" onClick={handleDeleteTarget}>×</p>}
        </div>
    )
}