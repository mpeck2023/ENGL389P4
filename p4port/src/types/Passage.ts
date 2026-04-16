export type Passage = {
    name: string;
    body: {
        text: string;
        speakerName: string;
    }[];
    choices: {
        id: string;
        thumbnailText?: string;
        displayText: string;
        nextPassage: Passage | string;
    }[];
};
