export type Passage = {
    body: {
        text: string;
        speakerName: string;
        ascii: string;
    }[];
    continue: {
        text: string;
        thumbnail?: string;
    };
};
