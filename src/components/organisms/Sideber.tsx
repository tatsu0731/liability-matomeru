import Article from "../atoms/Article";
import Title from "../atoms/Title";

export default function Sideber() {
    return (
    <div className=" w-48 h-screen px-4 bg-emerald-400 text-white flex flex-col justify-between items-center border-r-2 border-slate-300">
        <div>
            <Title />
            {/* <Article /> */}
            <p>梅原くん</p>
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
        <p className="mb-4 text-sm">ログアウト</p>
    </div>
    )
}