// Variables
let bossAnger = 0, time = 0, mug = "", defiance = 0, observant = 0, confusion = 0;
let historyStack = [];

const introScreen = document.getElementById("introscreen");
const asciiArt = document.getElementById("ascii-art");
const colorBtn = document.getElementById("colorBtn");
const rangeInput = document.getElementById("slider");
const startBtn = document.getElementById("startBtn");
const storyBox = document.getElementById("storybox");
const story = document.getElementById("story");
const choiceBar = document.getElementById("choices");

let face = [
'                    ....                      ',
'               .-+-------:--.                 ',
'             .+@@@####+++++##+:               ',
'            -@@@@#####++++#####+.             ',
'           -@@@#######++++++#####:            ',
'          .+@###########++++++###-            ',
'          -#@##############+++###+:           ',
'          -#######################-           ',
'          -#@#+++++#######+++++###-           ',
'          :@#-:....-+++++-:...:-+#:           ',
'         --@#--:. .:--+--:...:--+#:.          ',
'         --@+-::. ..:-#+-... :.:-#--          ',
'         :-@##+---:--###--:::---+@-.          ',
'          -@###++++##@###++---++#@-           ',
'          .+####++++#@###+++++++##:           ',
'          .-###+++--#####+-+++++#--           ',
'           -+###+--: :::..--+++##--           ',
'           :-##+:          .-++++-            ',
'           .:--+   .......  .-+---            ',
'            :..   .::...:::  -:.-             ',
'             .     ..   .:     -              ',
'                              .-              ',
'              :               :               ',
'             -+-.            :+:              ',
'            -++--.         .-+###-.           ',
'          +:::-:..         ..:-+##+#-         ',
'       .--#.::..              .-+@@@@@+-      '
];                     

asciiArt.innerHTML = newLine(face);

startBtn.onclick = () => {
    introScreen.style.display="none";
    colorBtn.style.display="none";
    rangeInput.style.display="none";
    storyBox.style.display="flex";
}

// the plus button in the upper right
colorBtn.onclick = () => {
    rangeInput.style.display="flex";
    colorBtn.innerHTML = "-";
}

// plus button first click behavior
function firstClick() {
    rangeInput.style.display="none";
    colorBtn.innerHTML = "+";
    colorBtn.removeEventListener("click", firstClick);
    colorBtn.addEventListener("click", secondClick);
}
// plus button second click behavior
function secondClick() {
    colorBtn.removeEventListener("click", secondClick);
    colorBtn.addEventListener("click", firstClick);
}

colorBtn.addEventListener("click", firstClick);

//sets the color variable
const root = document.documentElement;

function setHue() {
  root.style.setProperty('--hue', rangeInput.value);
}

rangeInput.addEventListener('input', function(){
  setHue();
});

// Show a passage
function showPassage(name) {
    const passage = passages[name];
    if (!passage) return;

    // Apply variable updates
    if (passage.set) passage.set();

    lineBreak = ""
    if(name != "Intro") lineBreak = "...<br>";

    // Get text (function or string)
    if (typeof passage.text === "function") {
        text = passage.text();
    } else {
        text = passage.text;
    }

    textToShow = newLine(text);


    story.innerHTML = story.innerHTML + lineBreak + textToShow;  // display instantly

    setChoices(passage.choices || []);
    if(name != "Intro") choiceBar.appendChild(goBackBtn);
    story.scrollTo({ top: story.scrollHeight, behavior: 'smooth' });   
}

// just makes a new line between each list element
function newLine (text) {
    textToShow = ""
    text.forEach((line) => {
        textToShow += line + "<br>";
    });
    return textToShow;
}

// The go back button behavior
const goBackBtn = document.createElement("span");
goBackBtn.className = "go-back";
goBackBtn.innerHTML = "Go Back";
goBackBtn.onclick = () => {
    //Do nothing if there is no history
    if (historyStack.length === 0) {
        introScreen.style.display="flex";
        colorBtn.style.display="flex";
        storyBox.style.display="none";
    };
    //Get the previous text and choices
    const previous = historyStack.pop();
    story.innerHTML = previous.storyHTML;
    setChoices(previous.choices);
};

// Show choices with optional conditions
function setChoices(passageChoices) {
    choiceBar.innerHTML = "";

    passageChoices.forEach(c => {
        if (!c.condition || c.condition()) {
            const btn = document.createElement("span");
            btn.className = "choice";
            btn.innerHTML = c.text;

            btn.onclick = () => {
                if (c.set) c.set(); // update variables

                // Save current story and choices to history
                historyStack.push({
                    storyHTML: story.innerHTML,
                    choices: passageChoices
                });

                showPassage(c.next);
            };

            choiceBar.appendChild(btn);
        }
    });
    choiceBar.appendChild(goBackBtn);
}

// Text that requires a condition to be visable
function lockedText(key,locked1,locked2) {
    if (locked2 === undefined) {
        locked2 = "";
    }
    return key ? locked1 : locked2;
}

// Passages
const passages = {
    "Intro": {
        text: [
            "You pull into the office parking lot."
        ],
        choices: [
            {text: "Park close to the entrance", next: "Park", set: ()=>{bossAnger=1}},
            {text: "Park farther away", next: "Park"}
        ]
    },
    "Park": {
        text: [
            "You park the car, sitting for a while in dread of the day to come."
        ],
        choices: [
            {text: "Sit for a while", next: "GoIn", set: ()=>{time+=1}},
            {text: "Go in", next: "GoIn"}
        ]
    },
    "GoIn": {
        text: () => [
            ...lockedText(
            (time >= 1),
            [
                "You sit for a while, seeing how long you can enjoy the peace before you have to go in.",
                "You look at your watch, 8:55, you better get inside.",
                ""
            ]  
        ),
        "You walk into the office and the receptionist waves to you.",
        "\"Hey Dave! Doing well?\"",
        "",
        "Her name is Margery, or maybe Margaret, you can't remember."
        ],
        choices: [
            {text: "\"Good morning Margaret.\"", next: "GreetMargaret"},
            {text: "\"Doing well, yourself?\"", next: "GreetReception"}
        ]
    },
    "GreetMargaret" : {
        text: [
            "\"Good morning Margaret.\"",
            "",
            "The receptionist laughs.",
            "\"Good morning to you too silly. My name is Mary, remember?\"",
            "",
            "You try to laugh it off.",
            "\"Of course of course, just seeing if you remembered your own name.\"",
            "",
            "Mary forces out another little chuckle.",
            "\"Yeah, right. Well, you can go right through, the doors are unlocked, <i>Dillon</i>.\"",
            "",
            "You chuckle back at her and walk inside."
        ],
        choices: [
            {text: "Go to your desk", next:"Desk"},
            {text: "Get some coffee", next:"GetCoffee"}
        ]
    },
    "GreetReception" : {
        text: [
            "\"Doing well, yourself?\"",
            "",
            "\"I'm doing great, thank you for asking.\"",
            "She flashes you a smile.",
            "\"Go right on through, sweetie, the door is unlocked.\"",
            "",
            "You give your best attempt at a smile and walk inside."
        ],
        choices: [
            {text: "Go to your desk", next:"Desk"},
            {text: "Get some coffee", next:"GetCoffee"}
        ]
    },
    "GetCoffee": {
        text: [
            "You go to the break room to get some coffee and, thankfully, someone had just brewed a new pot.",
			"You open the cabinet to get your mug, but it looks like someone already took it.",
            "There are two mugs still in the cabinet.",
            "The first has \"#1 Dad\" printed on the side in what is possibly the most boring font known to man and the second has a picture of a cat hanging from a branch with the words \"Hang in there\" printed underneath."
        ],
        choices: [
            {text: "Take the Dad mug", next: "BreakRoom", set: ()=>{mug="dad"}},
            {text: "Take the Cat mug", next: "BreakRoom", set: ()=>{mug="cat",bossAnger+=1}}
        ]
    },
    "BreakRoom": {
        text: [
            "Janice and Bill are sitting at a table talking quietly.",
            "Once you walk in their eyes flick up and they start speaking faster."
        ],
        choices: [
            {text: "Approach them", next: "ApproachThem"},
            {text: "Go to your cubical", next: "Desk"}
        ]
    },
    "ApproachThem": {
        text: [
            "You walk up to Janice and Bill.",
			"",
			"Bill speaks more frantically-",
			"\"Can we tell him-\"",
			"",
			"Janice kicks his leg and looks up at you.",
			"\"Hey man, how are you?\""
        ],
        choices: [
            {text: "\"Good, you?\"", next: "GoodYou"},
            {text: "\"I gotta get out of here\"", next: "IGottaGetOut"},
            {text: "\"Hanging in there.\"", next: "HangIn", condition: () => mug == "cat"}
        ]
    },
    "GoodYou": {
        text: [
            "\"Good, you?\"",
			"",
			"Janice leans back.",
			"\"Just getting ready for the day my man.\""
        ],
        choices:[
            {text:"Ask about the whispering", next:"AskWhisper"}
        ]
    },
    "IGottaGetOut": {
        text: [
            "\"I gotta get out of here\"",
            "",
            "Janice smirks.",
            "\"Me too man, this office is a prison\""
        ], 
        choices:[
            {text:"Ask about the whispering", next:"AskWhisper"}
        ]
    },
    "HangIn": {
        text: [
            "\"Hanging in there.\"",
			"You raise up your mug.",
            "",
			"Bill bursts out laughing, Janice cracks a smile.",
			"This is the 31st time you have made that joke."
        ],
        choices:[
            {text:"Ask about the whispering", next:"AskWhisper"}
        ]
    },
    "AskWhisper": {
        text: [
            "\"So what were you guys talking about?\"",
            "",
            "Bill raises his head to speak but Janice kicks him under the table again.",
            "\"Oh nothing just little stuff.\""
        ],
        choices:[
            {text:"It sounded important", next:"AskAgain"},
            {text:"Leave", next:"LeaveBreakRoom"}
        ]
    },
    "AskAgain": {
        text: [
            "\"Really? It sounded kind of important.\"",
            "",
            "Bill turns to Janice.",
            "\"I really think we should tell him, he has the right to know.\"",
            "",
            "Janice rolls her eyes and scowls at Bill.",
            "\"Fine, <i>I'll</i> tell him\"",
            "She turns to you with that same scowl and beckons you to sit down."
        ],
        choices:[
            {text:"Sit with them", next:"SitWithThem"},
            {text:"Stay standing", next:"StayStanding", set:()=>{defiance+=1}}
        ]
    },
    "LeaveBreakRoom": {
        text: [
            "\"Oh okay, well I'm gonna head to my desk, see you guys later.",
            "",
            "Bill opens his mouth to speak.",
            "",
            "Janice kills him hard this time and he closes his mouth.",
            "\"Yeah we will see you later.\"",
            "",
            "As you turn to leave you hear them start to whisper again, but keep walking, they said it was just little stuff after all."
        ],
        choices:[
            {text:"Go to your desk", next:"Desk",set:()=>{observant-=1}}
        ]
    },
    "SitWithThem": {
        text: () => [
            ...lockedText(
            (defiance>=1),
            [
                "You sit down at their table.",
			    "\"Took you long enough\""
            ]
        ), 
        "Janice leans in.",
        "\"Have you noticed anything weird about the boss recently.\""
        ],
        choices:[
            {text:"He seems off", next:"HeSeemsOff", set:()=>{observant=1}},
            {text:"He seems fine", next:"HeSeemsOff"}
        ]
    },
    "StayStanding": {
        text: [
            "You stay standing. Janice scowls at you.",
			"\"Are you going to sit down?\""
        ],
        choices:[
            {text:"Sit with them", next:"SitWithThem"},
            {text:"Stay standing", next:"StayStanding2", set:()=>{defiance+=1}}
        ]
    },
    "StayStanding2": {
        text: [
            "You stand defiantly.",
            "",
			"\"All right fine have it your way.\""
        ],
        choices:[
            {text:"Sit with them", next:"SitWithThem"},
            {text:"Stay standing", next:"StayStanding3", set:()=>{defiance+=1}}
        ]
    },
    "StayStanding3": {
        text: [
            "You stand proud.",
            "",
			"Janice turns to Bill.",
            "\"What is wrong with this dude?\""
        ], 
        choices:[
            {text:"Go to your desk", next:"Desk"}
        ]
    },
    "HeSeemsOff": {
        text: () => [
            ...lockedText(
            (observant==1),
            [
                "\"He seems off. I have barely seen him out of his office.\""
            ],
            [
                "\"I don't know he seems fine.\""
            ]
        ),
        "",
        "\"You've seen all the memos right? The cut-backs, the new responibilities, the new 'Consultants' they are bringing in?\""
        ], 
        choices:[
            {text:"Yeah I've seen them", next:"WIP", set:()=>{observant+=1}}, //Add choices here
            {text:"I haven't checked my emails.", next:"WIP"} //Add choices here, I haven't been checking my emails.
        ]
    },
    "Desk": {
        text: [
            "You go to your cubical, take your coat off, hang it up, and sit down."
        ],
        choices:[
            {text:"Turn on computer", next:"ComputerOn"}
        ]
    },
    "ComputerOn": {
        text: [
            "You press the power button and the screen lights up.",
			"Immediately the screen shows a prompt to log in."
        ],
        choices:[
            {text:"Log in", next:"LogIn"}
        ]
    },
    "LogIn": {
        text: [
            "You type your username and password and press enter.",
			"The computer loads for a minute or two, and then states that your password has expired and you need to reset it."
        ],
        choices:[
            {text:"Press reset password", next:"ResetPass"}
        ]
    },
    "ResetPass": {
        text: [
            "It asks for the confirmation code sent to your email.",
			"Your phone buzzes in your pocket."
        ],
        choices:[
            {text:"Take your phone out", next:"TakePhone"}
        ]
    },
    "TakePhone": {
        text: [
            "You take your phone out, go into your email, and enter the code.",
			"The screen buffers for a minute, showing only a loading icon.",
			"After a few seconds the desktop shows up."
        ],
        choices:[
            {text:"Open browser", next:"OpenBrow"}
        ]
    },
    "OpenBrow": {
        text: [
            "You open up your browser, it loads for a few more minutes.",
			"Finally you are in your browser and ready to do work-",
			"and then another log in page shows up."
        ],
        choices:[
            {text:"Log in", next:"LogIn2"}
        ]
    },
    "LogIn2": {
        text: [
            "You put in your new credentials again.",
			"A notication pops up in the corner of your screen, it's from your boss."
        ], 
        choices:[
            {text:"Click it", next:"ClickEmail"},
            {text:"Ignore it", next:"SkipMeet", set:()=>{defiance+=1}}
        ]
    },
    "ClickEmail": {
        text: [
            "You open your boss's email.",
			"\"IMPORTANT. Meeting in my office in 5, finish what you are doing and come by.\"",
			"Under the email there is a picture of a motivational cat poster:",
			"\"Believe!\"",
			"The email was from 4 minutes ago, you can get there if you rush."
        ], 
        choices:[
            {text:"Run to his office", next:"WIP"}, //Add choices here
            {text:"Walk at a reasonable pace", next:"WIP"}, //Add choices here
            {text:"Skip the meeting", next:"SkipMeet", set:()=>{defiance+=1}}
        ]
    },
    "SkipMeet": {
        text: [
            "You sit for a while, poking through your emails, purposely ignoring the email from your boss.",
            "A few minutes pass, and you see your boss walking up to your desk."
        ], 
        choices:[
            {text:"Say hello", next:"GreetBoss"},
            {text:"Try to sneak away", next:"SneakAway", set:()=>{defiance+=1}}
        ]
    },
    "GreetBoss": {
        text: () => [
            ...lockedText(
            (confusion==1),
            [
                "\"I couldn't, no, what's up?\""
            ],
            [
                "\"Hey Larry, what's up?\""
            ]
        ),
        "",
        "Your boss Larry walks up to you, scowling.",
        "\"You know 'what's up' David, have you checked the email I just sent you?\""
        ], 
        choices:[
            {text:"\"I can read it right now.\"", next:"WIP"}, //Add choices here, I just sat down, I can read it right now though.
            {text:"\"I was just on my way.\"", next:"WIP"}, //Add choices here, Yeah I saw it. I was just on my way to talk to you.
            {text:"\"Didn't see it.\"", next:"WIP",set:()=>{defiance+=1,bossAnger+=1}} //Add choices here, Didn't see it, are you sure you sent it?
        ]
    },
    "SneakAway": {
        text: [
            "You crouch down and try to run to the next cubical.",
            "",
            "\"Hey Dave-\"",
            "",
            "He saw you."
        ], 
        choices:[
            {text:"Say hello", next:"GreetBoss"},
            {text:"Keep walking", next:"WalkAway", set:()=>{defiance+=1,bossAnger+=1}}
        ]
    },
    "WalkAway": {
        text: [
            "You try to casually walk away, but your boss catches up to you.",
            "",
            "\"Hey Dave, didn't you hear me?\""
        ], 
        choices:[
            {text:"\"I couldn't, no, what's up?\"", next:"GreetBoss", set:()=>{confusion=1}},
            {text:"\"I heard you.\"", next:"HeardBoss", set:()=>{defiance+=1,bossAnger+=1}},
            {text:"\"I have to go to the bathroom.\"", next:"Bathroom"}
        ]
    },
    "HeardBoss": {
        text: [
            "\"I heard you.\"",
            "",
            "Larry has his mouth slightly open in shock.",
            "\"You heard me? Well why didn't you stop?\""
        ], 
        choices:[
            {text:"\"I thought you said Gabe.\"", next:"WIP"},
            {text:"\"I thought you were talking to the other Dave.\"", next:"WIP"}
        ]
    },
    "Bathroom": {
        text: [
            "\"I'm sorry man I have to go to the bathroom.\"",
            "",
            "Larry stands there, uncomfortable.",
            "\"Oh okay, just go straight to my office afterwards, we have a meeting\""
        ], 
        choices:[
            {text:"\"Will do!\"", next:"WIP"},
            {text:"\"Aye, Aye, sir!\"", next:"WIP"},
            {text:"\"I'll see if I can make it.\"", next:"WIP",set:()=>{defiance+=1}}
        ]
    },
    "WIP": {
        text: [
            "To be continued..."
        ]
    }
};

// Start story
setHue()
showPassage("Intro");