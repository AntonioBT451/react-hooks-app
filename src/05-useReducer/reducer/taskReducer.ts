import * as z from "zod";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number
}

export type TaskAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number };

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
    const localStorageState = localStorage.getItem('tasks-state');

    if (!localStorageState) {
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0
        }
    }

    // Validar mediante Zod
    // Extraemos y parseamos el JSON
    const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
    // ... si no existe, devolvemos el estado inicial limpio
    if (result.error) {
        console.log(result.error);
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0
        }
    }
    // Si todo está bien, result.data contiene la información validada y tipada
    return result.data;
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };

            return {
                ...state,
                todos: [...state.todos, newTodo],
                length: state.todos.length + 1,
                pending: state.pending + 1,
            };
        }

        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            const completedTodos = updatedTodos.filter(todo => todo.completed).length;
            const pendingTodos = updatedTodos.filter(todo => !todo.completed).length;

            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: completedTodos,
                pending: pendingTodos,
            };
        }

        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });


            const completedTodos = updatedTodos.filter(todo => todo.completed).length;
            const pendingTodos = updatedTodos.filter(todo => !todo.completed).length;

            return {
                ...state,
                todos: updatedTodos,
                completed: completedTodos,
                pending: pendingTodos,
            };
        }

        default:
            return state;
    }
}
