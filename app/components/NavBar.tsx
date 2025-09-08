
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/app/auth"
import "./NavBar.css"




async function NavBar() {

    const session = await auth()



    return (
        <>
            <div className="navBar">
                <Link className="logo" href="/">
                    <Image src="/Group 5.png" alt="Surya-app-Logo" width={144} height={144}></Image>
                </Link>

                <div className="auth">
                    {session ? (
                        <>
                            <Link href="/create">
                                <span className="create">Create</span>
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button className="sign-out" type="submit">Sign-Out</button>

                                {/* <Link href={`/user/${session.id}`}>
                                    <span>{session?.user?.name}</span>
                                </Link> */}
                            </form>


                        </>

                    ) : (
                        <form action={async () => {
                            "use server"
                            await signIn("github")
                        }}>
                            <button className="sign-in" type="submit">Sign-in</button>
                        </form>

                    )}
                </div>

                
            </div>
        </>
    );
}

export default NavBar;