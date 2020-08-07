export interface ActionModel {
  type: string;
  value: any;
}

export interface ErrorModel {
  message: string;
}

export interface ResponseModel {
  success: boolean;
  error?: ErrorModel;
  data?: any;
}
