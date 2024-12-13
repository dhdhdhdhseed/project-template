export interface Page {
    pageNumber: number
    pageSize: number
  }

export interface ResponseData {
    code: string;
    data: any;
    message: string,
    responseTimestamp: string
}
