export default function ControlPanel({
    selectedOption
}: {
    selectedOption: number,
}) {
    return (
        <div className="controlPanel">
            <p>{`${selectedOption == 0 ? "> " : ""}Continue`}</p>
            <p>{`${selectedOption == 1 ? "> " : ""}Go Back`}</p>
        </div>
    )
}

