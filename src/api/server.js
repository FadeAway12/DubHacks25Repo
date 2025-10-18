import express from 'express';
import cors from 'cors';
import { TranscribeClient, StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// AWS Clients
const transcribe = new TranscribeClient({ region: "us-west-2" });
const bedrock = new BedrockRuntimeClient({ region: "us-west-2" });

// Transcribe Endpoint
app.post("/transcribe", async (req, res) => {
  const { audioFileUrl } = req.body;
  const jobName = `job-${Date.now()}`;

  const command = new StartTranscriptionJobCommand({
    TranscriptionJobName: jobName,
    LanguageCode: "en-US",
    MediaFormat: "mp3",
    Media: { MediaFileUri: audioFileUrl }
  });

  await transcribe.send(command);
  res.json({ message: "Job started", jobName });
});

// Nova AI Endpoint
app.post("/ask-nova", async (req, res) => {
  const { prompt } = req.body;
  const command = new InvokeModelCommand({
    modelId: "nova-lite-v1",
    contentType: "application/json",
    body: JSON.stringify({ prompt })
  });

  const response = await bedrock.send(command);
  const output = JSON.parse(new TextDecoder().decode(await response.body));
  res.json(output);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));