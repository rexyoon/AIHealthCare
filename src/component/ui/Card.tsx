import type {ReactNode} from "react";

export default function Card(
    {
    title,
    right,
    children,
}:{
title?:string;
right?:ReactNode;
children: ReactNode;
}) {
    return(
        <section className ="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 shawdow-sm">
            {(title||right)&&(
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm fint-smibold text-zinc-200">{title}</h2>
                    {right}
                </div>
            )}
            {children}
        </section>
    )
}
