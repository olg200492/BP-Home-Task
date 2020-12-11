const { spawn } = require("child_process");
const subProcess = spawn("./dataStream.exe");

let eventCount = new Map();
let wordCount = new Map();

function startStream() {
  subProcess.stdout.on("data", (data) => {
    processStream(data);
  });

  subProcess.stderr.on("data", (data) => {
    console.error(`subProcess stderr: ${data}`);
  });
}

function stopStream() {
  subProcess.kill();
}

function checkIfJson(data) {
  try {
    let jsonObject = JSON.parse(data);
    return jsonObject;
  } catch (error) {
    return false;
  }
}

function processStream(data) {
  let cleanData = data.toString().split("\n");
  cleanData.map((item) => {
    let jsonItem = checkIfJson(item);
    if (jsonItem) {
      const { event_type, data } = jsonItem;

      let numOfEventType = eventCount.get(event_type);
      let numOfData = wordCount.get(data);

      numOfEventType
        ? eventCount.set(event_type, ++numOfEventType)
        : eventCount.set(event_type, 1);
      numOfData ? wordCount.set(data, ++numOfData) : wordCount.set(data, 1);
    }
  });
}

module.exports = {
  startStream,
  stopStream,
  eventCount,
  wordCount,
};
