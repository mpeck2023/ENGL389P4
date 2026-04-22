export type Passage = {
    body: {
        text: string;
        speakerName: string;
    }[];
    continue: {
        text: string;
        thumbnail?: string;
    };
};
