import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center max-h-screen">
            <div className="flex flex-col items-center bg-white rounded-lg w-full max-w-md p-6 gap-8">
                <div className="text-center w-full">
                    <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
                    <div className="w-full h-px bg-slate-400" />
                </div>

                <form className="flex flex-col gap-3">
                    <div className="space-y-1">
                        <label htmlFor="userId" className="text-sm font-medium text-slate-900">Usuario</label>
                        <Input
                            id="userId"
                            type="number"
                            placeholder="ID del usuario"
                            className="
                                text-slate-900        
                                ring-1 ring-slate-400 
                                hover:ring-1 hover:ring-blue-600
                                focus-visible:ring-1 focus-visible:ring-blue-800"
                        />
                    </div>
                    <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white transition-colors">Login</Button>
                </form>

                <Link to={"/about"}>
                    <Button variant={"link"} className="text-slate-800 hover:text-slate-900">Volver</Button>
                </Link>
            </div>
        </div>
    )
};
