import React from "react";

interface Props {
    title: string;
}

export const MyTitle = React.memo(({ title }: Props) => {
    console.log('Mi Title re-render');

    return (
        <h2 className="text-2xl font-bold">{title}</h2>
    );
});
