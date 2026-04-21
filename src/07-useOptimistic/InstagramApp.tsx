import { useOptimistic, useState } from 'react';

interface Comment {
    id: number;
    text: string;
    optimistic?: boolean;
}

let lastId = 2;

export const InstagramApp = () => {
    const [comments, setComments] = useState<Comment[]>([
        { id: 1, text: '¡Gran foto!' },
        { id: 2, text: 'Me encanta 🧡' },
    ]);

    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments,
        (currentComments, newCommentText: string) => {
            lastId++;
            // Retorna el nuevo estado "imaginario"
            return [
                ...currentComments,
                {
                    id: lastId,
                    text: newCommentText,
                    optimistic: true,
                }
            ]
        }
    );

    const handleAddComment = async (formData: FormData) => {
        const messageText = formData.get('post-message') as string;
        console.log('Nuevo comentario', messageText);

        addOptimisticComment(messageText);

        // Simular petición
        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log('Mensaje grabado');
        setComments((prev) => [
            ...prev,
            {
                id: lastId,
                text: messageText,
            }
        ]);
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
                        disabled={false}
                        className="bg-blue-500 text-white p-2 rounded-md w-full"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};