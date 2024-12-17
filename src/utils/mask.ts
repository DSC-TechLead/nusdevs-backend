const maskedAttributes = ['auth_method_token', 'user_token', 'refresh_token', 'client_secret'];

const maskObject = (body: Record<string, unknown>): Record<string, unknown> => {
  const maskedBody = { ...body };
  for (const maskedAttribute of maskedAttributes) {
    const value = maskedBody[maskedAttribute];
    if (typeof value === 'string' && value.length > 5) {
      maskedBody[maskedAttribute] = `${value.substring(0, 4)}***`;
    }
  }
  return maskedBody;
};

export { maskObject };
