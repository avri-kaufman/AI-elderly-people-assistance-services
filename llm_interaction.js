module.exports = {
  getHelp: (payload, res) => {
    // pars and send data to some llm
    llmPrompt = `You are a helpful, patient, and clear technical assistant for elderly users who struggle with technology.
    A user needs help with the following issue:
    Device Type: ${payload.deviceTpe} //if tpye
    Device Details: ${payload.deviceDetails} // if details
    Problem Description: ${payload.problemDescription} // if prob description 
    They also provided a photo of the issue. // need to add the img
    Please explain in very clear, simple language what the problem might be and what steps they can try to fix it.
    Write the response as if you are speaking to someone who is not familiar with technology.
    Be patient, friendly, and offer step-by-step instructions.`;
    ans = "this is ans from the llm";
    res.json({ ans: llmPrompt });
  },
};
