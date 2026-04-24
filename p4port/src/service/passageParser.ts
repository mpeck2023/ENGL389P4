import type { Passage } from "../types/Passage";

export function parseFileToPassages(): Passage[] | null {
    // Import the file.
    // With this method, the filename passed to glob must be a string literal.
    const key = "../assets/passages.txt";
    const fileImport = import.meta.glob("../assets/passages.txt", {
        as: "raw",
        eager: true,
    });
    const rawPassages = fileImport[key];

    if (!rawPassages) throw new Error(`No file found at ${key}`);

    const passages: Passage[] = [];

    // ===============
    // Begin parsing
    // ===============

    // Reserved symbols
    const DIALOGUE_DELIM = "::";
    const CHOICE_DELIM = ">>";
    const CHOICE_THUMBNAIL_DELIM = "|||";
    const EOP = "=="; // End of Passage

    const lines = rawPassages.split("\n");
    const asciiList = parseFileToAscii();
    console.log(asciiList)
    let i = 0;

    while (i < lines.length) {
        const p: Passage = { body: [], continue: { text: "" } };

        // Loops over a single passage
        while (lines[i] != EOP) {
            // If we're looking at dialogue
            if (lines[i].startsWith(DIALOGUE_DELIM)) {
                // `content` array looks somethihng like this:
                // ["", "Speaker Name", "I'm saying this frfr!"]
                // i.e., content[1] is the speaker's name
                //       content[2] is what the speaker says
                const content = lines[i].split(DIALOGUE_DELIM);
                
                let ascii_text = asciiList.get(content[1])
                console.log(ascii_text)
                if (ascii_text == undefined) {ascii_text = asciiList.get("Generic")}
                if (ascii_text == undefined) {ascii_text = ""}

                p.body.push({
                    text: content[2],
                    speakerName: content[1],
                    ascii: ascii_text
                });
            }

            // If we're looking at a choice
            else if (lines[i].startsWith(CHOICE_DELIM)) {
                const content = lines[i].split(CHOICE_DELIM)[1];

                let displayText = content;
                let thumbnailText = undefined;

                // If there's thumbnail, which would make `content`
                // look something like this:
                //
                // "Say your two cents.|||I think you are terrible."
                //
                // The text to the left of "|||" is the thumbnail.
                if (displayText.includes(CHOICE_THUMBNAIL_DELIM)) {
                    [thumbnailText, displayText] = displayText.split(
                        CHOICE_THUMBNAIL_DELIM,
                    );
                }

                p.continue = {
                    text: `"${displayText}"`,
                    thumbnail: thumbnailText,
                };

            } else if (lines[i].startsWith(EOP)) {
                break;
            }

            // Idk what we're looking at anymore :(
            else {
                throw new Error(
                    `File badly formatted at line ${i + 1}: ${lines[i]}`,
                );
            }

            i++;
        }

        passages.push(p);
        i++;
    }

    return passages;
}

function parseFileToAscii(): Map<string, string> {
    const key = "../assets/ascii.txt";
    const fileImport = import.meta.glob("../assets/ascii.txt", {
        as: "raw",
        eager: true,
    });
    const rawAsciis = fileImport[key];

    if (!rawAsciis) throw new Error(`No file found at ${key}`);

    const asciis = new Map<string, string>();

    const NEW_CHARACTER_DELIM = "!!";
    const CHARACTER_NAME_DELIM = "||";

    const characters = rawAsciis.split(NEW_CHARACTER_DELIM);
    
    characters.forEach((character) => {
        const name_ascii = character.split(CHARACTER_NAME_DELIM)
        asciis.set(name_ascii[0],name_ascii[1])
    })

    return asciis;

}