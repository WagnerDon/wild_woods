import { AudioManager } from "./utility/audioManager.js";
import { InputHandler } from "./utility/inputHandler.js";
import { Game } from "./game.js";
import { ImageLibrary } from "./utility/imageLibrary.js";
import { SpriteMaker } from "./utility/spriteMaker.js";

// Preload
AudioManager.loadSounds();
ImageLibrary.loadImages();
SpriteMaker.loadSprites();

// Preset variables
const UI = document.getElementById("ui");

const FADE_OUT_DURATION = 500; // in ms

const FPS_LIMIT = 120; // in s
const FPS_JUMP = 15; // in s

const RESTART_DELAY = 2000; // in ms

let lastHtml: string;
let currentHTML: string;
let currentGame: Game;

// Settings used in other modules
export const SETTINGS = {
 mobileMode: false,
 fullscreen: false,
 sound: true,
 framerate: 30,
 twoPlayer: false,
 pause: false,
};

// HTML templates
const MENU = `
 <main id="main-menu" class="fade-in">
  <button class="btn-9" data-action="start-game">Start Game</button>
  <button class="btn-9" data-action="controls">Controls</button>
  <button class="btn-9" data-action="editor">Editor</button>
  <button class="btn-9" data-action="options">Options</button>
 </main>
`;

const HEAD = `
 <header id="head" class="fade-in">
  <div>
   <div id="avatar">
    <span>Avatar</span>
    <div class="animated-progress progress-blue"><span></span></div>
   </div>
  </div>
  <div class="btn-9">
   <button class="absolute-space utf-8" data-action="options">⛭</button>
  </div>
 </header>
`;

const HEAD_TWO = `
 <div id="avatar" class="health-bar-two">
  <span>Avatar</span>
  <div class="animated-progress progress-green"><span></span></div>
 </div>
`;

const OPTIONS = `
 <div id="options" class="fade-in">
  <button class="btn-9" data-action="back">Back</button>
  <button class="btn-9" data-action="fullscreen">Fullscreen</button>
  <button class="btn-9" data-action="framerate">Framerate</button>
  <button class="btn-9" data-action="sound">Sound</button>
  <button class="btn-9" data-action="mobile">Mobile Mode</button>
  <button class="btn-9" data-action="restart">Restart</button>
 </div>
`;

const CONTROLS = `
 <div id="tutorial" class="fade-in absolute-space">
  <button class="btn-9" data-action="back">Back</button>
  <p>Player 1: <span>⇑ ⇐ ⇒ RIGHT-SHIFT</span></p>
  <button class="btn-9" data-action="two-player">Two Player</button>
 </div>
`;

const CONTROLS_TWO = `
 <p class="fade-in">Player 2: <span>W A D SPACEBAR</span></p>
`;

const MOBILE = `
 <div id="mobile" class="fade-in">
  <div>
   <button class="btn-9 utf-8" data-action="right">⇐</button>
   <button class="btn-9 utf-8" data-action="left">⇒</button>
  </div>

  <div>
   <button class="btn-9 utf-8" data-action="attack">⚔</button>
   <button class="btn-9 utf-8" data-action="jump">⇑</button>
  </div>
 </div>
`;

// Menu is initiated
display(MENU);

// Refreshes UI content with new html
function display(html: string) {
 if (!UI) return;
 const oldHtml = UI.firstElementChild;
 const mobileHtml = UI.lastElementChild;
 oldHtml?.classList.add("fade-out");
 mobileHtml?.classList.add("fade-out");
 lastHtml = currentHTML ?? html;
 currentHTML = html;
 setTimeout(() => {
  UI.innerHTML = html;
  if (SETTINGS.mobileMode && html === HEAD)
   UI.insertAdjacentHTML("beforeend", MOBILE);
  if (SETTINGS.twoPlayer && html === HEAD)
   UI.firstElementChild?.insertAdjacentHTML("beforeend", HEAD_TWO);
  selection();
  addEvents();
 }, FADE_OUT_DURATION);
}

// Adds all click events including sound
function addEvents() {
 const elements = document.querySelectorAll("[data-action]");
 const controls = ["left", "right", "jump", "attack"];
 const options = ["fullscreen", "framerate", "sound", "mobile", "two-player"];
 const buttons = [
  "start-game",
  "controls",
  "editor",
  "options",
  "back",
  "restart",
 ];
 for (const element of elements) {
  AudioManager.playSound("fade_in", 1, 0.8);
  const data = element.attributes[1].value;
  if (controls.indexOf(data) === -1) {
   element.addEventListener("mouseover", () => {
    AudioManager.playSound("hover");
   });

   element.addEventListener("mousedown", () => {
    AudioManager.playSound("click");
   });
  }
  if (buttons.indexOf(data) !== -1) {
   element.addEventListener("click", () =>
    elements.forEach((element) => {
     const button = <HTMLButtonElement>element;
     button.disabled = true;
    })
   );
  }
  if (options.indexOf(data) !== -1) {
   element.addEventListener("click", () =>
    element.classList.toggle("selected")
   );
  }
  switch (data) {
   case "start-game":
    element.addEventListener("click", () => {
     display(HEAD);
     currentGame = new Game();
     InputHandler.initialize();
     AudioManager.playSound("start", 1, 1, 0.2);
     setTimeout(
      () => currentGame.canvas?.classList.add("fade-in"),
      FADE_OUT_DURATION * 2
     );
    });
    break;
   case "controls":
    element.addEventListener("click", () => {
     display(CONTROLS);
    });
    break;
   case "two-player":
    element.addEventListener("click", () => {
     const tutorial = document.getElementById("tutorial");
     const thirdChild = tutorial?.children[2];
     SETTINGS.twoPlayer = !SETTINGS.twoPlayer;
     if (SETTINGS.twoPlayer)
      tutorial?.children[1]?.insertAdjacentHTML("afterend", CONTROLS_TWO);
     else if (thirdChild?.classList.contains("fade-in")) {
      thirdChild.classList.add("fade-out");
      setTimeout(() => {
       thirdChild.remove();
      }, FADE_OUT_DURATION);
     }
     console.log("Two Player", SETTINGS.twoPlayer);
    });
    break;
   case "editor":
    element.addEventListener("click", () => {
     console.log("Editor");
    });
    break;
   case "options":
    element.addEventListener("click", () => {
     display(OPTIONS);
     if (lastHtml === HEAD) SETTINGS.pause = true;
     if (element.innerHTML === "⛭") element.classList.add("spin");
    });
    break;
   case "back":
    element.addEventListener("click", () => {
     if (lastHtml === HEAD) SETTINGS.pause = false;
     display(lastHtml);
    });
    break;
   case "fullscreen":
    element.addEventListener("click", () => {
     SETTINGS.fullscreen = !SETTINGS.fullscreen;
     if (SETTINGS.fullscreen) {
      document.body.requestFullscreen();
     } else {
      document.exitFullscreen();
     }
     console.log("Fullscreen", SETTINGS.fullscreen);
    });
    break;
   case "framerate":
    element.addEventListener("click", () => {
     SETTINGS.framerate += FPS_JUMP;
     if (SETTINGS.framerate > FPS_LIMIT) {
      SETTINGS.framerate = 0;
      element.innerHTML = "Framerate";
      element.classList.remove("selected");
     } else {
      element.classList.add("selected");
      element.innerHTML = `${SETTINGS.framerate} Frames`;
      console.log("Framerate", SETTINGS.framerate || undefined);
     }
     currentGame.loopInfo.targetFps = SETTINGS.framerate;
    });
    break;
   case "sound":
    element.addEventListener("click", () => {
     SETTINGS.sound = !SETTINGS.sound;
     console.log("Sound", SETTINGS.sound);
    });
    break;
   case "mobile":
    element.addEventListener("click", () => {
     SETTINGS.mobileMode = !SETTINGS.mobileMode;
     console.log("Mobile Mode", SETTINGS.mobileMode);
    });
    break;
   case "restart":
    element.addEventListener("click", () => {
     console.log("restarting");
     setTimeout(() => window.location.reload(), RESTART_DELAY);
    });
    break;
   case "right":
    element.addEventListener(
     "touchstart",
     () => {
      InputHandler.keyState = { key: "ArrowRight", value: true };
      console.log("touchstart right", true);
     },
     { passive: true }
    );
    element.addEventListener(
     "touchend",
     () => {
      InputHandler.keyState = { key: "ArrowRight", value: false };
      console.log("touchend right", false);
     },
     { passive: true }
    );
    break;
   case "left":
    element.addEventListener(
     "touchstart",
     () => {
      InputHandler.keyState = { key: "ArrowLeft", value: true };
      console.log("touchstart left", true);
     },
     { passive: true }
    );
    element.addEventListener(
     "touchend",
     () => {
      InputHandler.keyState = { key: "ArrowLeft", value: false };
      console.log("touchend left", false);
     },
     { passive: true }
    );
    break;
   case "attack":
    element.addEventListener(
     "touchstart",
     () => {
      InputHandler.keyState = { key: "RightShift", value: true };
      console.log("touchstart attack", true);
     },
     { passive: true }
    );
    element.addEventListener(
     "touchend",
     () => {
      InputHandler.keyState = { key: "RightShift", value: false };
      console.log("touchend attack", false);
     },
     { passive: true }
    );
    break;
   case "jump":
    element.addEventListener(
     "touchstart",
     () => {
      console.log("touchstart jump", true);
      InputHandler.keyState = { key: "ArrowUp", value: true };
     },
     { passive: true }
    );
    element.addEventListener(
     "touchend",
     () => {
      InputHandler.keyState = { key: "ArrowUp", value: false };
      console.log("touchend jump", false);
     },
     { passive: true }
    );
    break;
  }
 }
}

// Selects the buttons when UI content is refreshed
function selection() {
 const elements = document.querySelectorAll("[data-action]");
 for (const element of elements) {
  const data = element.attributes[1].value;
  switch (data) {
   case "two-player":
    if (SETTINGS.twoPlayer) {
     const tutorial = document.getElementById("tutorial");
     tutorial?.children[1].insertAdjacentHTML("afterend", CONTROLS_TWO);
     element.classList.toggle("selected");
    }
    break;
   case "fullscreen":
    if (SETTINGS.fullscreen) element.classList.toggle("selected");
    break;
   case "mobile":
    if (SETTINGS.mobileMode) element.classList.toggle("selected");
    break;
   case "framerate":
    if (SETTINGS.framerate) {
     element.innerHTML = `${SETTINGS.framerate} Frames`;
     element.classList.toggle("selected");
    }
    break;
   case "sound":
    if (SETTINGS.sound) element.classList.toggle("selected");
    break;
  }
 }
}
