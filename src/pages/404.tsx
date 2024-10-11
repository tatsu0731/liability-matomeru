import Link from "next/link";

export default function Custom404() {
    return (
        <>
            <div className=" mt-24 ">
                <div className="flex justify-center">
                    <div className="w-800 border-4 border-double py-16 rounded-md bg-slate-400">
                        <div className="flex flex-col items-center gap-y-4">
                            <h2 className=" text-white text-2xl font-bold mb-8">ごめんなさい・・・！このページは見れないみたいです・・・。</h2>
                            <p className="text-white text-xl font-bold">404 Not Found</p>
                            <Link href={"/"}>
                                <p className="text-white/80 text-sm border-b font-bold">+ Topへ戻る +</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
