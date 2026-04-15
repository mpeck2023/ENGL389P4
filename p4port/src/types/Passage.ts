export type Passage = {
    name: string;
    body: {
        text: string,
        speakerName: string
    }[];
    choices: Choice[];
};

export type Choice = {
    name: string
    displayText: string
    next: Passage
}