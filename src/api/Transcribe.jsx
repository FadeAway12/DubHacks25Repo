import { TranscribeClient, StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";

const client = new TranscribeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

export const startTranscription = async (fileUrl) => {
  const command = new StartTranscriptionJobCommand({
    TranscriptionJobName: `job-${Date.now()}`,
    LanguageCode: "en-US",
    MediaFormat: "webm",
    Media: { MediaFileUri: fileUrl },
    OutputBucketName: "myaudiofile41252",
  });

  const response = await client.send(command);
  console.log(response);
};