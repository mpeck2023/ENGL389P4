//slowly transitioning to react
export default function MyApp() {
    return (
        <div>
            <ColorButton />
            <ColorSlider />
            <IntroScreen />
        </div>
    );
}

function ColorButton() {
    return (
        <button id="colorBtn">
            +
        </button>
    );
}

function ColorSlider() {
    return (
        <input 
            type="range" 
            id="slider" 
            value= {129}
            min={0}
            max={360} 
            style={{
                display: none
            }}
        />
    );
}

function IntroScreen() {
    return (
        <div id="introscreen">
            <Flare />
            <TitleContainer />
            <StartButton />
            <Subtitle />
        </div>
    );
}

function Flare() {
    return (
        <div className="flare"/>
    );
}

function TitleContainer() {
    <div className="titleCon">
        <Title />
        <AsciiArt />
    </div>
}

function Title() {
    <div className="title">WORKSPACE</div>
}

function AsciiArt() {
    <div id="ascii-art" />
}

function StartButton() {
    return (
        <span 
            id="startBtn"
            className="choice"
        >
            Start
        </span>
    );
}

function Subtitle() {
    return (
        <span 
            className="subtitle"
        >
            by Matthew Peck
        </span>
    );
}

function StoryBox() {
    return (
        <div 
            id="storybox" 
            style={{
                display: none
            }}
        >
            <Flare />
            <Title />
            <Story />
            <Choices />
        </div>
    );
}

function Story() {
    return (
        <div id="story"/>
    );
}

function Choices() {
    return (
        <div id="choices"></div>
    );
}