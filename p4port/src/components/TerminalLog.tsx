import { useEffect, useRef } from "react";

export type TerminalLog = {
    speakerName: string;
    text: string;
};

export default function TerminalLogs({ logs }: { logs: TerminalLog[] }) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const currLog = logs.slice(-1)[0];

    useEffect(() => {
        const el = divRef.current;
        if (!el) return;

        el.scrollTop = el.scrollHeight;
    }, [logs]);

    return (
        <div ref={divRef} className="terminal-logs">
            {logs.slice(0, -1).map((l, i) => (
                <p className="past-log" key={i}>
                    {l.speakerName}: {l.text}
                </p>
            ))}
            {currLog && (
                <p className="current-log">
                    {currLog.speakerName}: {currLog.text}
                </p>
            )}
        </div>
    );
}
