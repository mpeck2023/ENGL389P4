import type { Passage } from "../types/Passage";

export function parseFileToPassages(filename: string): Passage[] | null {
    if (!filename || filename.trim().length === 0) return null;

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
    const PID_INDICATOR = "id--"; // Passage ID indicaator
    const DIALOGUE_DELIM = ":";
    const CHOICE_DELIM = ">";
    const CHOICE_THUMBNAIL_DELIM = "|||";
    const EOP = "=="; // End of Passage

    const lines = rawPassages.split("\n");

    let i = 0;

    while (i < lines.length) {
        const pName = lines[i++].split(PID_INDICATOR)[1];
        const p: Passage = { name: pName, body: [], choices: [] };

        // Loops over a single passage
        while (lines[i] != EOP) {
            // If we're looking at dialogue
            if (lines[i].startsWith(DIALOGUE_DELIM)) {
                // `content` array looks somethihng like this:
                // ["", "Speaker Name", "", "", "I'm saying this frfr!"]
                // i.e., content[1] is the speaker's name
                //       content[4] is what the speaker says
                const content = lines[i].split(DIALOGUE_DELIM);

                p.body.push({
                    text: content[4],
                    speakerName: content[1],
                });
            }

            // If we're looking at a choice
            else if (lines[i].startsWith(CHOICE_DELIM)) {
                // `content` array looks somethihng like this:
                // ["", "What I, the Robot, am saying rn.", "", "", "NEXT_PASSAGE_ID"]
                // i.e., content[1] is what the choice looks like to the player
                //       content[4] is the next passage to go to
                //
                // Optionally, content[1] can contain allow "thumbnail text" which will
                // display for the choice, rather than the whole display text. This
                // can be used to avoid spacing issues. Thumbnail text is placed
                // before the display text and delimited with a "|||"
                const content = lines[i].split(CHOICE_DELIM);

                let displayText = content[1];
                let thumbnailText = null;
                if (content[1].includes(CHOICE_THUMBNAIL_DELIM)) {
                    [thumbnailText, displayText] = content[1].split(
                        CHOICE_THUMBNAIL_DELIM,
                    );
                }

                p.choices.push({
                    id: lines[i],
                    thumbnailText,
                    displayText: `"${displayText}"`,
                    nextPassage: content[4],
                });
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
