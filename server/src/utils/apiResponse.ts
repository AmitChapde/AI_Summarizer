export function success(data: any) {
  return {
    status: "success",
    data
  };
}

export function error(message: string, extra: any = {}) {
  return {
    status: "error",
    message,
    ...extra
  };
}
