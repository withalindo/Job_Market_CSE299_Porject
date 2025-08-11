// Wrote it for testing purposes might delete later
import pdfParse from "pdf-parse";
import fs from "fs";
const dataBuffer = fs.readFileSync("./src/ResumeUploads/alindo_Resume.pdf"); // Use a real PDF path you have
pdfParse(dataBuffer).then(data => {
  console.log(data.text);
});