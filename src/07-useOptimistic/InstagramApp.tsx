import { useOptimistic, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface Comment {
    id: number;
    text: string;
    optimistic?: boolean;
}

let lastId = 2;

export const InstagramApp = () => {

    const [isPending, startTransition] = useTransition();

    const [comments, setComments] = useState<Comment[]>([
        { id: 1, text: '¡Gran foto!' },
        { id: 2, text: 'Me encanta 🧡' },
    ]);

    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments,
        (currentComments, newCommentText: string) => {
            const newId = lastId + 1;
            return [
                ...currentComments,
                {
                    id: newId,
                    text: newCommentText,
                    optimistic: true,
                }
            ]
        }
    );

    const shouldSucceed = () => {
        return Math.random() > 0.5;
    };


    const handleAddComment = async (formData: FormData) => {
        const messageText = formData.get('post-message') as string;
        const tempId = lastId + 1;

        // 1. ACTUALIZACIÓN URGENTE (Optimista)
        addOptimisticComment(messageText);

        // 2. INICIO DE LA TRANSICIÓN (Segundo plano)
        startTransition(async () => {
            // Simular petición
            await new Promise((resolve) => setTimeout(resolve, 3000));

            if (shouldSucceed()) {
                // 3. ACTUALIZACIÓN DE ESTADO REAL
                lastId++;

                setComments((prev) =>
                    prev.map(comment =>
                        comment.id === tempId
                            ? { ...comment, optimistic: false }
                            : comment
                    )
                );
            } else {
                // Código para revertir el proceso, caso de error.
                setComments((prev) => prev.filter(comment => comment.id !== tempId));

                toast('Error al agregar el comentario', {
                    description: 'Intente nuevamente',
                    duration: 5_000,
                    position: 'bottom-right',
                    action: {
                        label: 'Cerrar',
                        onClick: () => toast.dismiss(),
                    }
                });
            };
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
            {/* Post de ejemplo */}
            <div className='flex flex-col items-center justify-center bg-gray-300 rounded-3xl p-4 w-1/4 gap-3'>
                <div className='flex flex-col items-center justify-center w-full'>
                    <img
                        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
                        alt="Instagram Post"
                        className="object-cover rounded-xl mb-1 w-full h-auto"
                    />
                    <p className="text-black font-bold">
                        Mira que interesante esta funcionalidad de la API de React.
                    </p>
                </div>

                {/* Comentarios */}
                <ul className="flex flex-col items-start justify-center w-full gap-2">
                    {optimisticComments.map((comment) => (
                        <li key={comment.id} className="flex items-center gap-2">
                            <div className="flex items-center justify-center bg-blue-500 rounded-full w-6 h-6">
                                <span className="text-white text-center">A</span>
                            </div>
                            <p className="text-black">{comment.text}</p>
                            {comment.optimistic && (
                                <span className="text-gray-500 text-sm">enviando... </span>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Formulario de comentarios */}
                <form
                    action={handleAddComment}
                    className="flex flex-col items-center justify-center w-full gap-2"
                >
                    <input
                        type="text"
                        name="post-message"
                        placeholder="Escribe un comentario"
                        required
                        className="w-full p-2 rounded-md text-black bg-white"
                    />
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-500 text-white p-2 rounded-md w-full 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};