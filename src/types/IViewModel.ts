export interface IViewModel {
  init: () => Promise<void>;
  isReady: boolean;
}
