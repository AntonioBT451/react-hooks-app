import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const ProfilePage = () => {

    const { user, logout } = useContext(UserContext);
    const navigation = useNavigate();

    const handleSalir = () => {
        logout();
        navigation('/login');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
            <h1 className="text-4xl font-thin">Perfil del usuario: {user?.name}</h1>
            <hr />

            <pre className="my-4 w-2/3 overflow-x-auto">{JSON.stringify({ user }, null, 2)}</pre>

            <Button
                variant={'destructive'}
                onClick={() => handleSalir()}
            >
                Salir
            </Button>
        </div>
    )
};
