import Link from "next/link";
import Article from "../atoms/Article";
import Title from "../atoms/Title";

export default function Sideber() {
    return (
    <div className=" w-60 h-screen px-4 bg-emerald-400 text-white flex flex-col justify-between items-center border-r-2 border-slate-300">
        <div>
            <Link href="/">
            <Title />
            </Link>
            <div className="">
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債務対象一覧</h2>
                {/* hrefにkeyなりidが入るはず */}
                <Link href="[1].tsx">
                    <p>梅原くん</p>
                </Link>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
                <p>梅原</p>
            </div>
        </div>
        <p className="mb-4 text-sm">ログアウト</p>
    </div>
    )
}