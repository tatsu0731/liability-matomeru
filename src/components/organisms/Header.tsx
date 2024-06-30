export default function Header() {
    const title = "This is Title"
    return(
        <header className="flex justify-between py-2 px-8">
            <h1 className="font-bold text-xl text-gray-600">
                {title && title}
            </h1>
            <ul className="text-sm text-slate-500">
                <a href="https://ushio-hp.vercel.app/"><li>ヘルプ</li></a>
            </ul>
        </header>
    )
}