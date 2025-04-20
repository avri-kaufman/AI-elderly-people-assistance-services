const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

module.exports = {
  getHelp: async (payload, res) => {
    // pars and send data to some llm
    llmPrompt =
      "You are a helpful, patient, and clear technical assistant for elderly users who struggle with technology. \n\nUser needs help with the following issue:\n";
    if (payload.deviceTpe) llmPrompt += `Device Type: ${payload.deviceTpe}\n`;
    if (payload.deviceDetails)
      llmPrompt += `Device Details: ${payload.deviceDetails}\n`;
    if (payload.problemDescription)
      llmPrompt += `Problem Description: ${payload.problemDescription}\n`;
    if (payload.img) llmPrompt += "They also provided a photo of the issue.\n"; // need to add the img to the prompt
    llmPrompt += `\nPlease explain in very clear, simple language what the problem might be and what steps they can try to fix it.\nWrite the response as if you are speaking to someone who is not familiar with technology.\nBe patient, friendly, and offer step-by-step instructions.`;
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "user",
            content: llmPrompt,
          },
        ],
        temperature: 0.7,
      });
      res.json({ answer: response.choices[0].message.content });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },

  // const response = await client.responses.create({
  //   model: "gpt-4.1",
  //   input: llmPrompt,
  // });
  // console.log(response);
  // res.json({ ans: response });
};
