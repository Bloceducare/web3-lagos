export interface IElementProps {
  children?: React.ReactElement;
  className?: string;
  // All other props
  [x: string]: any;
}

export interface IEmail {
  email: string;
}

export interface ILogin extends IEmail {
  password: string;
}

export interface IRegister extends ILogin {
  others?: string;
}

export interface IPattern {
  value: RegExp;
  message: string;
}

export interface IConfirmToken {
  token: string;
  userId: string;
}

export interface IResetPassword {
  password: string;
  passwordConfirm: string;
  token?: string;
  userId: string;
}

export interface IScheduleItem {
  topic:string
  speaker:string
  time:string
}



