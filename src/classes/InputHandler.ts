export class InputHandler {
 private static readonly keyStates: Record<string, boolean> = {}; // Using Record because object is similar to a library

 static initialize() {
  window.addEventListener("keydown", InputHandler.keydownHandler);
  window.addEventListener("keyup", InputHandler.keyupHandler);
 }

 static keyIsPressed(key: string) {
  return InputHandler.keyStates[key];
 }

 private static keydownHandler(e: KeyboardEvent) {
  InputHandler.keyStates[e.code] = true;
 }

 private static keyupHandler(e: KeyboardEvent) {
  InputHandler.keyStates[e.code] = false;
 }

 static set keyState({ key, value }: { key: string; value: boolean }) {
  InputHandler.keyStates[key] = value;
 }
}
