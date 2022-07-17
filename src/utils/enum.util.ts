export type innerResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: any;
};

export interface RootModel {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type DataOrError<T> =
  | {
      data: T;
    }
  | {
      error: Error;
    };
