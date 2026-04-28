import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const AboutPage = () => {

    const { isAuthenticated, logout } = use(UserContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h1 className="text-4xl font-thin">Página sobre mi</h1>
            <hr />

            <div className="flex flex-col gap-2">
                {
                    isAuthenticated ? (
                        <>
                            <Link to={"/profile"} className="underline text-xl hover:text-blue-600">Perfil</Link>
                            <Button variant={'destructive'} className="mt-4"
                                onClick={logout}>
                                Salir
                            </Button>
                        </>
                    ) : (
                        <Link to={"/login"} className="underline text-xl hover:text-blue-600">Iniciar sesión</Link>
                    )
                }
            </div>
        </div>
    )
};
