/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ObservableValue<T> {
  /**
   * Used in {@link Set} to compare the new value with the current value.
   * If it returns true, {@link Set} will not notify subscribers.
   * If this is undefined, {@link Set} will do a strict equality check (===).
   */
  m_fnEquals?(value1: T, value2: T): boolean;

  /**
   * Sets the value of the observable.
   * If the value is different from the current value, it will notify subscribers.
   */
  Set(value: T): void;

  /**
   * Subscribes to changes in the value.
   * @param callback The callback to be called when the value changes.
   * @returns An object with an `Unsubscribe` method to remove the subscription.
   */
  Subscribe(callback: (value: T) => void): { Unsubscribe: () => void; };

  m_callbacks: Callbacks<(value: T) => void>;

  m_currentValue: T;

  /**
   * Returns the number of subscribers from {@link m_callbacks.CountRegistered}.
   */
  SubscriberCount: number;

  /**
   * Returns the current value from {@link m_currentValue}.
   */
  Value: T;
}

// TODO: update converter to also detect this type. Make it default to `<unknown, getType()>`
/**
 * @exported
 */
export interface ReducedValue<TInput, TOutput> {
  /**
   * Creates a new input into the reduced value.
   * @param debugName Optional debug name for this input.
   * @returns An object with `Set` and `Delete` methods to manage this input.
   */
  CreateInput(debugName?: string): {
    Set: (value: TInput) => void;

    Delete: () => void;
  };

  /**
   * The reducer function used to combine all input values into a single output.
   */
  m_fnReducer(inputs: TInput[]): TOutput;

  /**
   * Forces recomputation of the reduced value from all current inputs.
   */
  RecalculateValue(): void;

  /**
   * The internal log instance used for debugging.
   */
  Log: Log;

  /**
   * Internal map of all input values, keyed by their assigned ID.
   */
  m_mapInputs: Map<number, {
    value: TInput;

    strDebugCallstack: string | null;

    strDebugName: string;
  }>;

  /**
   * Incrementing ID counter for assigning keys to inputs.
   */
  m_nNextInputKey: number;

  /**
   * Optional name for debugging/logging.
   */
  m_strNameForLog: string | null;

  /**
   * The underlying observable that stores the reduced value.
   */
  m_SubscribableValue: ObservableValue<TOutput>;

  /**
   * Provides access to the internal subscribable reduced value.
   */
  SubscribableValue: ObservableValue<TOutput>;

  /**
   * Returns the current reduced value.
   */
  Value: TOutput;
}

/**
 * @exported
 */
export interface MappedObservable<TSource, TMapped> {
  /** @native */
  GetValue(): unknown;

  /**
   * The mapping function applied to the source value.
   * Whenever the source changes, this is used to compute the mapped value.
   */
  m_fnMap(value: TSource): TMapped;

  /**
   * Subscribes to changes in the mapped value.
   * @param callback The callback to be called when the mapped value changes.
   * @returns An object with an `Unsubscribe` method to remove the subscription.
   */
  Subscribe(callback: (value: TMapped) => void): { Unsubscribe: () => void; };

  /** @native */
  SyncStore(): unknown;

  /**
   * Forces recomputation of the mapped value from the original source.
   * Also updates the internal {@link m_mappedSubscribableValue}.
   */
  UpdateMappedValue(): void;

  /**
   * Flag indicating whether the mapped value needs to be recomputed.
   * If true, {@link UpdateMappedValue} will be called before returning {@link Value}.
   */
  m_bMappedValueStale: boolean;

  /**
   * The internal observable that stores the mapped value and handles subscriptions.
   */
  m_mappedSubscribableValue: ObservableValue<TMapped>;

  /**
   * The original source observable that this mapped value depends on.
   */
  m_originalSubscribableValue: ObservableValue<TSource>;

  /**
   * Returns the current mapped value.
   * If the value is stale, recomputes it first.
   */
  Value: TMapped;
}

export interface Callbacks<T extends (...args: any) => unknown = () => void> {
  /**
   * Removes all registered callbacks in {@link m_vecCallbacks}.
   */
  ClearAllCallbacks(): void;

  /**
   * @returns the number of registered callbacks in {@link m_vecCallbacks}.
   */
  CountRegistered(): number;

  /**
   * Calls all registered callbacks with the given arguments.
   *
   * @param args The arguments to pass to the callbacks.
   */
  Dispatch(...args: Parameters<T>): void;

  Register(callback: T): { Unregister: () => void; };

  m_vecCallbacks: T[];
}

/**
 * @exported
 */
export interface Unsubscribable {
  /**
   * Unregisters the callback.
   */
  Unregister(): void;
}

export interface Log {
  Assert(): unknown;

  Debug(): unknown;

  Error(): unknown;

  Info(): unknown;

  IsDebugEnabled(): unknown;

  Log(e: unknown, ...t: unknown[]): void;

  m_fnIdGenerator(): unknown;

  Warning(): unknown;

  m_sName: string;
}
