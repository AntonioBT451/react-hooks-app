import { Link } from "react-router";

export const AboutPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h1 className="text-4xl font-thin">Página sobre mi</h1>
            <hr />

            <div className="flex flex-col gap-2">
                <Link to={"/profile"} className="underline text-xl hover:text-blue-600">Perfil</Link>
                <Link to={"/login"} className="underline text-xl hover:text-blue-600">Login</Link>
            </div>
        </div>
    )
};
