export default class InputLogger {
 constructor() {
  this.keyLogs = {};
  onkeydown = (e) => this.keydownLogger(e);
  onkeyup = (e) => this.keyupLogger(e);
 }

 keyLogs: Record<string, boolean>;

 getKey(key: string) {
  return this.keyLogs[key];
 }

 keydownLogger(e: KeyboardEvent) {
  this.keyLogs[e.code] = true;
 }

 keyupLogger(e: KeyboardEvent) {
  this.keyLogs[e.code] = false;
 }
}
