import { InputParser, FileInputParser, BrowserInputParser } from "./controller/InputParser";
import { MarsStateController } from "./controller/MarsStateController";

let inputParser: InputParser;

if (typeof window !== 'undefined') {
  inputParser = new BrowserInputParser();
} else {
  inputParser = new FileInputParser();
}

let marsStateController = new MarsStateController(inputParser);
marsStateController.start();

