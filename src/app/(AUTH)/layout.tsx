import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-start justify-start min-h-screen w-screen p-4">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
                <div className=" overflow-hidden">
                    <Image
                        src="/logo_full_dark.svg"
                        alt="Logo"
                        width={160}
                        height={100}
                        className="object-contain h-auto w-auto"
                    />
                </div>
            </div>

            <div className="w-full max-w-md mx-auto my-auto">{children}</div>
        </div>
    )
}
export default AuthLayout
