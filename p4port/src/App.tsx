import { parseFileToPassages } from "./service/passageParser";

export default function MyApp() {
    console.dir(parseFileToPassages("passages.txt"));

    return (
        <div>
            What's good
        </div>
    );
}
