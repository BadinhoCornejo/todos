export const getError = (
  error: string | { status: number; message: string }
) => {
  if (typeof error === "string") {
    return {
      status: 500,
      message: error,
    };
  }

  return {
    status: error.status,
    message: error.message,
  };
};
