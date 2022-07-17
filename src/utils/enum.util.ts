export type innerResponse = {
  status: string;
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

export interface Required<T> {
  type: T;
  required: true;
}
