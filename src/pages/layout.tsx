import Header from "@/components/organisms/Header"
import Sideber from "@/components/organisms/Sideber"
import { useRouter } from "next/router"
import { useState } from "react";

export default function Layout({
    children,
    }: {
        children: React.ReactNode
    }) {
        const [title, setTitle] = useState<string>("債権者");
        const router = useRouter();
        const isNotLayout = router.pathname.startsWith('/auth')
        if (isNotLayout) {
            return (
                <main>{children}</main>
            )
        }
        return (
            <section className="flex">
                <Sideber setTitle={setTitle}/>
                <div className="flex flex-col w-full">
                    <Header title={title} setTitle={setTitle}/>
                    <main>{children}</main>
                </div>
            </section>
        )
    }