import { useEffect, useRef } from "react";

export type AsciiArt = {
    speakerName: string;
    ascii: string;
};

export default function AsciiArts({ face }: { face: AsciiArt }) {
    const divRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={divRef} className="ascii-art">
            {face && (
                <p className="current-log">
                    {face.ascii}
                </p>
            )}
        </div>
    );
}
