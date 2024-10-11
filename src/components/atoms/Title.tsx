import { Dispatch, SetStateAction } from "react";

type setTitleType = Dispatch<SetStateAction<string>>

export default function Title({setTitle}: {setTitle: setTitleType}) {
    return(
        <h1  onClick={() => setTitle("債権者")} className="font-bold text-white text-2xl py-2"><span className="text-xl">負債</span>matomeru</h1>
    )
}