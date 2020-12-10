const { spawn } = require("child_process");
const subProcess = spawn("./dataStream.exe");

const event_typeFromStream = new Map();
const dataFromStream = new Map();

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
      const { event_type, data, timestamp } = jsonItem;
      console.log(dataFromStream);
      let numOfEventType = event_typeFromStream.get(event_type);
      let numOfData = dataFromStream.get(data);
      numOfEventType
        ? event_typeFromStream.set(event_type, ++numOfEventType)
        : event_typeFromStream.set(event_type, 1);
      numOfData
        ? dataFromStream.set(data, ++numOfData)
        : dataFromStream.set(data, 1);
    }
   
  });
}

startStream();
