import { RouterProvider } from 'react-router/dom';
import { appRouter } from './router/app.router';

export const ProfessionalApp = () => {
    return (
        <div className="bg-gradient">
            <RouterProvider router={appRouter} />
        </div>
    )
};
