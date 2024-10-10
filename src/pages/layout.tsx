import Header from "@/components/organisms/Header"
import Sideber from "@/components/organisms/Sideber"
import { useRouter } from "next/router"

export default function Layout({
    children,
    }: {
        children: React.ReactNode
    }) {
        const router = useRouter();
        const isNotLayout = router.pathname.startsWith('/auth')
        if (isNotLayout) {
            return (
                <main>{children}</main>
            )
        }
        return (
            <section className="flex">
                <Sideber />
                <div className="flex flex-col w-full">
                    <Header />
                    <main>{children}</main>
                </div>
            </section>
        )
    }