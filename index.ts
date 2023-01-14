import { InputParser, FileInputParser, BrowserInputParser  } from "./src/controller/InputParser";
import { MarsStateController } from "./src/controller/MarsStateController";

let inputParser:InputParser;

if (typeof window !== 'undefined') {
    inputParser = new BrowserInputParser();
  } else {
   inputParser = new FileInputParser(); 
}


export function start(){
  let marsStateController = new MarsStateController(inputParser);
  marsStateController.start();
}

start();