import { useEffect, useState } from "react"

export default function ControlPanel({
    onContinue,
    onGoBack
}: {
    onContinue: () => void,
    onGoBack: () => void
}) {
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        const keyDownListener = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    setSelectedOption(0)
                    break
                case "ArrowDown":
                    setSelectedOption(1)
                    break
                case "Enter":
                    selectedOption == 0 ? onContinue() : onGoBack();
                    break
            }
        }

        window.addEventListener('keydown', keyDownListener);

        return () => window.removeEventListener('keydown', keyDownListener);
    }, [selectedOption]);

    return (
        <div className="controlPanel">
            <p>{`${selectedOption == 0 ? ">" : "."} Continue`}</p>
            <p>{`${selectedOption == 1 ? ">" : "."} Go Back`}</p>
        </div>
    )
}

