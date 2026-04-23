export type TerminalLog = {
    speakerName: string;
    text: string;
}

export default function TerminalLogs({
    logs
}: {
    logs: TerminalLog[]
}) {
    return <div className="terminal-logs">
        {logs.map((l, i) =>
            <p key={i}>{l.speakerName}: {l.text}</p>
        )}
    </div>
}