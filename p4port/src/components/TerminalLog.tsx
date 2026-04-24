import { useEffect, useRef } from "react";

export type TerminalLog = {
    speakerName: string;
    text: string;
};

function OneLog({
    key,
    log,
    selected,
}: {
    key: any;
    log: TerminalLog;
    selected?: boolean;
}) {
    return (
        <p className={selected ? "current-log" : "past-log"} key={key}>
            {log.speakerName === "Narrator" ? (
                <em>{log.text}</em>
            ) : (
                log.speakerName + ": " + log.text
            )}
            {selected && <p className="cursor">▌</p>}
        </p>
    );
}

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
                <OneLog key={i} log={l} />
            ))}
            {currLog && <OneLog key="current" log={currLog} selected />}
        </div>
    );
}
