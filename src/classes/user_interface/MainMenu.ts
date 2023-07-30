class MainMenu {
 template = `
 <main id="main-menu" class="fade-in">
  <button class="btn-9" data-action="start-game">Start Game</button>
  <button class="btn-9" data-action="controls">Controls</button>
  <button class="btn-9" data-action="editor">Editor</button>
  <button class="btn-9" data-action="options">Options</button>
 </main>
`;
 constructor() {
  const body = document.createElement("main");
  body.id = "main-menu";
 }
}
