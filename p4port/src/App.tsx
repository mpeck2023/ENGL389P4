import { parseFileToPassages } from "./service/passageParser";
import './App.css'
import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import TerminalLogs, { type TerminalLog } from "./components/TerminalLog";
import type { Passage } from "./types/Passage";

export default function MyApp() {
    const [started, setStarted] = useState(true);

    // return (
    //     <>
    //         <ColorButton />
    //         <ColorSlider />
    //         <IntroScreen
    //             show={!started}
    //             onStart={() => setStarted(!started)}
    //         />
    //         <StoryBox show={started} />
    //     </>
    // );
    return <StoryBox show={started} passages={parseFileToPassages()!} />;
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
                display: "none"
            }}
        />
    );
}

function IntroScreen(props) {
    const [show_, setShow] = useState(props.show);

    return (
        <div
            id="introscreen"
            style={{
                display: show_ ? "flex" : "none"
            }}
        >
            <Flare />
            <TitleContainer />
            <StartButton onClick={props.onStarted} />
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
    return (<div className="titleCon">
        <Title />
        <AsciiArt />
    </div>)
}

function Title() {
    return <div className="title">WORKSPACE</div>
}

function AsciiArt() {
    return <div id="ascii-art" />
}

function StartButton(props) {
    return (
        <span 
            id="startBtn"
            className="choice"
            onClick={props.onClick}
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

function StoryBox({show, passages}: {show: boolean, passages: Passage[]}) {
    const [storyI, setStoryI] = useState(0);
    const logs: TerminalLog[] = passages.map(p => p.body).flat();

    return (
        <div
            id="storybox"
            style={{
                display: show ? "flex" : "none"
            }}
        >
            <Flare />
            {/* <Title />
            <Story />
            <Choices /> */}
            <div className="layout">
                <div className="topLeft">Top Left</div>
                <div className="topRight">
                    <TerminalLogs
                        logs={logs.slice(0, storyI)}
                    />
                </div>
                <div className="bottom">
                    <ControlPanel
                        onContinue={() => setStoryI(i => i + 1)}
                        onGoBack={() => setStoryI(i => Math.max(0, i - 1))}
                    />
                </div>
            </div>

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