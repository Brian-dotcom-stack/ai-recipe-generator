export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  const prompt = `Suggest a recipe using these ingredients: ${ingredients.join(", ")}`;

  return {
    resourcePath: "/model/amazon.nova-micro-v1:0/invoke",
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                text: prompt,
              },
            ],
          },
        ],
        inferenceConfig: {
          maxTokens: 512,
          temperature: 0.7,
          topP: 0.9,
        },
      }),
    },
  };
}

export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);

  return {
    body: parsedBody.output.message.content[0].text,
  };
}