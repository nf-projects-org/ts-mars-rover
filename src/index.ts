import { InputParser, FileInputParser, BrowserInputParser } from "./controller/input_parser";
import { MarsStateController } from "./controller/mars_state_controller";

let inputParser: InputParser;

if (typeof window !== 'undefined') {
  inputParser = new BrowserInputParser();
} else {
  inputParser = new FileInputParser();
}

let marsStateController = new MarsStateController(inputParser);
marsStateController.start();

