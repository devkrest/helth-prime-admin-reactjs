export default interface IBaseModel<T> {
  s: number;
  m: string;
  r: T | null;
  error: any;
}
