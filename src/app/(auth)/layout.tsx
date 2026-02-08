import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative">
            <div className="absolute top-4 left-4">
                <Button variant="ghost" asChild className="gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                    <Link href="/">
                        <MoveLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
