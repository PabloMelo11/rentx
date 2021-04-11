interface ISendForgotPasswordMailDTO {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

export { ISendForgotPasswordMailDTO };
