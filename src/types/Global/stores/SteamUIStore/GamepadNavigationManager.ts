import { MappedObservable, ObservableValue, Unsubscribable } from 'shared/interfaces';

export interface GamepadNavigationManager {
  BatchedUpdate(e: unknown): void;

  BGlobalGamepadButton(e: unknown): boolean;

  BIsInActiveContext(e: unknown): boolean;

  BIsRestoringHistory(): unknown;

  BlurNavTree(e: unknown): void;

  ChangeNavigationSource(e: unknown, t: unknown): boolean;

  CreateContext(e: unknown, t: unknown): unknown;

  DestroyContext(e: unknown): void;

  DispatchVirtualButtonClick(e: unknown, t: unknown): void;

  DispatchVirtualGamepad(e: unknown, t: unknown): void;

  FindAnActiveContext(): unknown;

  FireUnhandledGamepadEventCallbacks(e: unknown): boolean;

  GetActiveContext(): unknown;

  GetDefaultContext(): unknown;

  /**
   * @param r default: !1
   */
  GetEventTarget(e: unknown, t: unknown, r?: boolean): unknown[];

  GetShowDebugFocusRing(): unknown;

  Init(): void;

  IsActiveFocusNavTree(e: unknown): boolean;

  IsActiveNavTree(e: unknown): boolean;

  m_fnGamepadEventUpdateBatcher(e: unknown, t: unknown): unknown;

  NewGamepadNavigationTree(e: unknown, t: unknown, r: unknown): unknown;

  OnButtonActionInternal(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown, s: unknown, o: unknown): undefined;

  OnButtonDown(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown, s: unknown): void;

  OnButtonUp(e: unknown, t: unknown, r: unknown, n: unknown, i: unknown, a: unknown, s: unknown): void;

  OnContextActivated(e: unknown): void;

  OnContextDeactivated(e: unknown, t: unknown): void;

  /**
   * @param t default: !1
   */
  OnGamepadNavigationTreeActivated(e: unknown, t?: boolean): void;

  /**
   * @param r default: !1
   */
  OnGamepadNavigationTreeFocused(e: unknown, t: unknown, r?: boolean): void;

  OnNavigationTypeChange(e: unknown): void;

  RegisterForUnhandledButtonDownEvents(callback: (event: GamepadEvent) => void): Unsubscribable;

  RegisterGamepadNavigationTree(e: unknown, t: unknown): () => void;

  RegisterInputSource(e: unknown): unknown;

  RestoreHistoryTransaction(e: unknown): Promise<void>;

  SetCatchAllGamepadInput(e: unknown): void;

  SetGamepadEventUpdateBatcher(e: unknown): void;

  SetShowDebugFocusRing(e: unknown): void;

  SetSuppressGamepadInput(e: unknown): void;

  TakeFocusChangingIFrame(): void;

  /**
   * @param e default: !1
   */
  UpdateSourceToGamepad(e?: boolean): void;

  m_ActiveContext?: FocusNavigationContext;

  m_bRestoringHistory: boolean;

  m_bShowDebugFocusRing: ObservableValue<boolean>;

  m_DefaultContext?: never;

  m_fnCatchAllGamepadInput: null;

  m_LastActiveContext: FocusNavigationContext;

  m_navigationSource: ObservableValue<NavigationSource>;

  m_navigationSourceSupportsFocus: NavigationSourceSupportsFocus;

  m_rgAllContexts: FocusNavigationContext[];

  m_rgGamepadInputSources: (StandardGamepadInputSource | MouseGamepadInputSource | TouchGamepadInputSource)[];

  m_UnhandledButtonEventsCallbacks: UnhandledButtonEventsCallbacks;

  NavigationSource: GamepadNavigationManager['m_navigationSource'];

  NavigationSourceSupportsFocus: NavigationSourceSupportsFocus;
}

export interface FocusNavigationContext {
  AddNavTree(e: unknown): void;

  BIsActive(): unknown;

  BIsGamepadInputSuppressed(): unknown;

  BlurNavTree(e: unknown): void;

  Destroy(e: unknown): void;

  FindNavTreeInFocusedWindow(): unknown;

  FindNavTreeToActivate(): unknown;

  /**
   * @param e default: void 0
   */
  LogName(e?: undefined): string;

  OnActivate(e: unknown): void;

  OnActivateBrowserView(e: unknown, t: unknown): void;

  OnDeactivate(e: unknown): void;

  OnDeactivateBrowserView(e: unknown, t: unknown): void;

  OnFocusChangeComplete(e: unknown): void;

  OnFocusChangeStart(e: unknown, t: unknown, r: unknown, n: unknown): number;

  OnMount(e: unknown): void;

  /**
   * @param r default: void 0
   */
  SetActive(e: unknown, t: unknown, r?: undefined): void;

  /**
   * @param t default: !1
   */
  SetActiveNavTree(e: unknown, t?: boolean): void;

  UnregisterGamepadNavigationTree(e: unknown): void;

  ActiveWindow: Window;

  FocusChangedCallbacks: UnhandledButtonEventsCallbacks;

  IsActive: ObservableValue<boolean>;

  m_activeBrowserView: undefined;

  m_ActiveFocusChange: ActiveFocusChange | undefined;

  m_activeWindow: Window;

  m_bIsGamepadInputSuppressed: boolean;

  m_bMounted: boolean;

  m_controller: GamepadNavigationManager;

  m_FocusChangedCallbacks: UnhandledButtonEventsCallbacks;

  m_iFocusChangeStack: number;

  m_LastActiveFocusNavTree: undefined;

  m_LastActiveNavTree: undefined;

  m_rgGamepadNavigationTrees: unknown[];

  m_rootWindow: Window;

  m_schDeferredActivate: SchDeferredActivate;

  m_valueIsActive: ObservableValue<boolean>;

  RootWindow: Window;
}

export interface NavigationSource {
  eActivationSourceType: ENavigationSourceType;

  nActiveGamepadIndex: number;

  nLastActiveGamepadIndex: number;
}

export type NavigationSourceSupportsFocus = MappedObservable<NavigationSource, boolean>;

export interface BaseGamepadInputSource {
  DispatchButtonDown(e: unknown, t: unknown): void;

  GetActiveControllerIndex(): unknown;

  GetActiveControllerTime(): unknown;

  GetSourceType(): unknown;

  OnAnalogPad(e: unknown, t: unknown, n: unknown, r: unknown): void;

  OnButtonDown(e: unknown, t: unknown): void;

  OnButtonUp(e: unknown, t: unknown): void;

  OnGamepadDetected(): void;

  OnNavigationTypeChanged(e: unknown): void;

  RegisterForAnalog(e: unknown): unknown;

  RegisterForGamepadButtonDown(e: unknown): unknown;

  RegisterForGamepadButtonUp(e: unknown): unknown;

  RegisterForGamepadDetected(e: unknown): unknown;

  RegisterForNavigationTypeChange(e: unknown): unknown;

  SetControllerActive(e: unknown): void;

  SetRepeatAllowed(e: unknown): void;

  SetSourceType(e: unknown): void;

  m_AnalogCallbacks: UnhandledButtonEventsCallbacks;

  m_bGamepadDetected: boolean;

  m_ButtonDownCallbacks: UnhandledButtonEventsCallbacks;

  m_ButtonRepeatHandler: ButtonRepeatHandler;

  m_ButtonUpCallbacks: UnhandledButtonEventsCallbacks;

  m_eNavigationSourceType: ENavigationSourceType;

  m_fLastActiveTime?: number | undefined;

  m_NavigationTypeChangeCallbacks: UnhandledButtonEventsCallbacks;

  m_nLastActiveControllerIndex: number;

  m_OnGamepadDetectedCallbacks: UnhandledButtonEventsCallbacks;
}

export interface StandardGamepadInputSource extends BaseGamepadInputSource {
  EnableAnalogInputMessages(e: unknown): void;

  GetController(e: unknown): unknown;

  HandleControllerInputMessages(e: unknown, t: unknown, r: unknown, n: unknown, a: unknown): void;

  HandleSystemKeyEvents(e: unknown): void;

  OnControllerListChanged(e: unknown): void;

  OnSystemButtonPress(e: unknown, t: unknown): void;

  m_rgControllers: Map<unknown, unknown>;
}

export interface MouseGamepadInputSource extends BaseGamepadInputSource {
  OnMouseDown(e: unknown): void;

  OnMouseMove(e: unknown): undefined;

  OnMouseUp(e: unknown): void;

  Reset(): void;

  /**
   * @native
   */
  TranslateKey(e: unknown): unknown;

  m_bFirstMouseUpdate: boolean;

  m_lastButtonDown: number;

  m_nAccumulatedMouseMovement: number;

  m_nLastScreenX?: number;

  m_nLastScreenY?: number;
}

export interface TouchGamepadInputSource extends BaseGamepadInputSource {
  OnTouchEnd(e: unknown): void;

  OnTouchStart(e: unknown): void;
}

export interface UnhandledButtonEventsCallbacks {
  ClearAllCallbacks(): void;

  CountRegistered(): unknown;

  Dispatch(...e: unknown[]): void;

  Register(e: unknown): { Unregister: () => void; };

  m_vecCallbacks: never;
}

export interface ActiveFocusChange {
  from: From;

  source: number;

  to: undefined;
}

export interface SchDeferredActivate {
  Cancel(): void;

  IsScheduled(): boolean;

  Schedule(e: unknown, t: unknown): void;

  ScheduledInternal(): void;

  m_fnCallback?: undefined;

  m_schTimer?: undefined;
}

export interface ButtonRepeatHandler {
  HandleInputButtonDown(e: unknown, t: unknown, n: unknown): void;

  HandleInputButtonUp(e: unknown): void;

  m_fnRepeatAllowed(): unknown;

  Reset(): void;

  SetRepeatAllowed(e: unknown): void;

  m_config: Config;

  m_inputRepeatGenerator: InputRepeatGenerator;

  m_repeatOnAxis: number;
}

export interface From {
  AddChild(e: unknown): void;

  AdjustRectForLastMovementOnTangentAxis(e: unknown, t: unknown): unknown;

  AdvanceIndex(e: unknown, t: unknown): unknown;

  BChildTakeFocus(e: unknown, t: unknown): unknown;

  BFocusFirstChild(e: unknown): unknown;

  BFocusLastChild(e: unknown): unknown;

  BFocusWithin(): unknown;

  BHasFocus(): unknown;

  BTakeFocus(e: unknown, t: unknown): unknown;

  BTryInternalNavigation(e: unknown, t: unknown): boolean;

  BuildConsolidatedActionDescriptionMap(e: unknown): unknown;

  BVisibleChildTakeFocus(e: unknown): unknown;

  BWantsAutoFocus(): unknown;

  BWantsFocusRing(): unknown;

  BWantsPreferredFocus(): unknown;

  ComputeRelativeDirection(e: unknown, t: unknown): unknown;

  CreateHandle(): unknown;

  DEV_SetDebugPropsOnElement(): void;

  /**
   * @param e default: !1
   */
  EnsureChildrenSorted(e?: boolean): void;

  FindClosestChildInNextAxiallyAlignedSet(e: unknown, t: unknown, n: unknown, r: unknown, i: unknown, o: unknown): unknown;

  FindClosestFocusableNodeToRect(e: unknown, t: unknown): unknown;

  FindClosetChildInDirection(e: unknown, t: unknown, n: unknown, r: unknown): unknown;

  FindFocusableDescendant(e: unknown, t: unknown): unknown;

  FindFocusableNode(e: unknown, t: unknown): unknown;

  FindNextFocusableChildGeometric(e: unknown, t: unknown): unknown;

  FindNextFocusableChildInDirection(e: unknown, t: unknown, n: unknown): unknown;

  FindNextFocusableChildInGrid(e: unknown, t: unknown, n: unknown): unknown;

  ForceMeasureFocusRing(): void;

  GetActiveActionDescriptions(): unknown;

  GetActiveChild(): unknown;

  GetActiveChildIndex(): unknown;

  GetActiveDescendant(): unknown;

  GetBoundingRect(): unknown;

  GetChildren(): unknown[];

  GetDepth(): unknown;

  GetFocusable(): 'none' | 'self' | 'children';

  GetLastFocusElement(): unknown;

  GetLayout(): unknown;

  GetRelativeDirection(e: unknown): unknown;

  GetScrollIntoViewType(): unknown;

  InternalFocusDescendant(e: unknown, t: unknown, n: unknown): boolean;

  IsValidChildIndex(e: unknown): boolean;

  /**
   * @native
   */
  OnDOMBlur(e: unknown): void;

  /**
   * @native
   */
  OnDOMFocus(e: unknown): undefined;

  OnFocusedDecendantRemoved(e: unknown): void;

  OnMount(e: unknown): void;

  /**
   * @native
   */
  OnNavigationEvent(e: unknown): boolean;

  OnUnmount(): void;

  PropagateFocusableIfEmptyAncestorToDescendants(e: unknown): void;

  RegisterDOMEvents(): void;

  RemoveChild(e: unknown): void;

  ScanChildren(e: unknown, t: unknown, n: unknown): unknown;

  SetActiveChild(e: unknown): void;

  SetDOMFocusAndScroll(e: unknown, t: unknown): void;

  SetFocusableIfEmptyAncestor(e: unknown): void;

  SetFocusWithin(e: unknown): void;

  SetHasFocus(e: unknown): void;

  SetProperties(e: unknown): void;

  UnregisterDOMEvents(): void;

  UpdateParentActiveChild(): void;

  ActionDescriptionChangedCallbackList: UnhandledButtonEventsCallbacks;

  Element: HTMLDivElement;

  m_ActionDescriptionsChangedCallbackList: UnhandledButtonEventsCallbacks;

  m_ActiveChild?: never;

  m_bAutoFocusChild: boolean;

  m_bChildrenSorted: boolean;

  m_bMounted: boolean;

  m_element: HTMLDivElement;

  m_FocusableIfEmptyAncestor: null;

  m_Focused: ObservableValue<boolean>;

  m_FocusRing: (FocusRing | null);

  m_FocusWithin: ObservableValue<boolean>;

  m_iLastActiveChildIndex: number;

  m_nDepth: number;

  m_Parent: (From | null);

  m_Properties: Properties;

  m_rgChildren: never;

  m_rgFocusHandlers: never;

  m_rgNavigationHandlers: never;

  m_Tree: Tree;

  NavKey?: never;

  Parent: (From | null);

  SubscribableFocusWithin: ObservableValue<boolean>;

  SubscribableHasFocus: ObservableValue<boolean>;

  Tree: Tree;
}

export interface Config {
  firstRepeatInterval_ms: number;

  inputsThatRepeat: Set<number>;

  repeatInterval_ms: number;
}

export interface InputRepeatGenerator {
  HandleInputButtonDown(e: unknown, t: unknown): void;

  Reset(): void;

  m_ActiveInputId?: never;

  m_ActiveInputTimeout?: never;

  m_config: Config;
}

export interface FocusRing {
  OnBlur(e: unknown, t: unknown, r: unknown): void;

  OnFocus(e: unknown, t: unknown, r: unknown): void;

  OnFocusChange(e: unknown, t: unknown, r: unknown): void;

  OnForceMeasureFocusRing(): void;
}

export interface Properties {
  actionDescriptionMap: (ActionDescriptionMap | object);

  autoFocus?: boolean;

  childFocusDisabled?: boolean;

  disableNavSounds?: never;

  fnCanTakeFocus?: never;

  fnScrollIntoViewHandler?: never;

  focusable?: boolean;

  focusableIfEmpty?: boolean;

  focusableIfNoChildren?: never;

  layout?: number;

  navEntryPreferPosition?: number;

  navKey?: never;

  navRef?: never;

  noFocusRing?: boolean;

  onFocusWithin?: never;

  onMoveDown?: never;

  onMoveLeft?: never;

  onMoveRight?: never;

  onMoveUp?: never;

  preferredFocus?: never;

  resetNavOnEntry?: never;

  retainFocus?: boolean;

  scrollIntoViewType?: never;

  scrollIntoViewWhenChildFocused?: never;
}

export interface Tree {
  /**
   * @param e default: !1
   */
  Activate(e?: boolean): void;

  AddChildNavTree(e: unknown): () => void;

  BIsActive(): unknown;

  BIsActiveFocus(): unknown;

  BIsActiveWithinContext(): unknown;

  BIsContextActive(): unknown;

  BIsEnabled(): unknown;

  BIsModal(): unknown;

  BUseVirtualFocus(): unknown;

  CreateNode(e: unknown, t: unknown): unknown;

  Deactivate(): void;

  FindModalDescendant(): unknown;

  GetLastFocusedMovementRect(e: unknown): unknown;

  GetLastFocusedNode(): unknown;

  GetParentEmbeddedNavTree(): unknown;

  GetTimeLastActivated(): unknown;

  HandleButtonDownEventAsLogicalEvent(e: unknown): unknown;

  IsActiveFocusNavTree(): unknown;

  MountNavTree(e: unknown): () => void;

  OnActivate(e: unknown): void;

  OnChildActivated(e: unknown): void;

  OnContextActiveStateChanged(e: unknown): void;

  OnDeactivate(e: unknown): void;

  OnRootButtonDown(e: unknown): unknown;

  RegisterNavigationItem(e: unknown, t: unknown): () => unknown;

  SetIsEmbeddedInLegacyTree(e: unknown): void;

  SetIsEnabled(e: unknown): void;

  SetModal(e: unknown): void;

  SetOnGlobalButtonDown(e: unknown): void;

  SetOnUnhandledButtonCallback(e: unknown): void;

  SetUseVirtualFocus(e: unknown): void;

  /**
   * @param t default: !1
   */
  TakeFocus(e: unknown, t?: boolean): void;

  TransferFocus(e: unknown, t: unknown, r: unknown): void;

  TransferFocusInternal(e: unknown, t: unknown, r: unknown): void;

  ChildTrees: unknown[];

  Controller: GamepadNavigationManager;

  DeferredFocus: DeferredFocus;

  id: string;

  m_bIsEmbeddedInLegacyTree: boolean;

  m_bIsEnabled: boolean;

  m_bIsMounted: boolean;

  m_bModal: boolean;

  m_bVirtualFocus: boolean;

  m_bWasActiveForLastFocusChange: boolean;

  m_context: FocusNavigationContext;

  m_Controller: GamepadNavigationManager;

  m_DeferredFocus: DeferredFocus;

  m_ID: string;

  m_lastFocusNode: null;

  m_lastFocusNodeXMovement: LastFocusNodeXMovement;

  m_lastFocusNodeYMovement: LastFocusNodeXMovement;

  m_onActivateCallbacks: UnhandledButtonEventsCallbacks;

  m_onActiveFocusStateChangedCallbacks: UnhandledButtonEventsCallbacks;

  m_onChildTreesChanged: UnhandledButtonEventsCallbacks;

  m_onDeactivateCallbacks: UnhandledButtonEventsCallbacks;

  m_onGlobalButtonDown: undefined;

  m_onUnhandledButton: undefined;

  m_ParentNavTree: undefined;

  m_rgChildNavTrees: unknown[]/* circular reference to ChildTrees */;

  m_Root: From;

  m_tsLastActivated: number;

  m_window: Window;

  OnActivateCallbacks: UnhandledButtonEventsCallbacks;

  OnActiveStateChangedCallbacks: UnhandledButtonEventsCallbacks;

  OnChildTreesChangedCallbacks: UnhandledButtonEventsCallbacks;

  OnDeactivateCallbacks: UnhandledButtonEventsCallbacks;

  Parent: undefined;

  Root: From;

  Window: Window;

  WindowContext: FocusNavigationContext;
}

export interface ActionDescriptionMap {
  3: string;

  4: string;
}

export interface DeferredFocus {
  BHasQueuedFocusNode(): boolean;

  BIsQueuedFocusNode(e: unknown): unknown;

  ClearInterval(): void;

  ExecuteQueuedFocus(): void;

  RequestFocus(e: unknown, t: unknown): void;

  Reset(): void;

  SuppressFocus(): void;

  m_bSuppressed: boolean;

  m_interval: undefined;

  m_schExecuteQueuedFocus: SchDeferredActivate;

  m_target: undefined;

  m_tree: Tree;
}

export interface LastFocusNodeXMovement {
  GetRect(): unknown;

  Reset(): void;

  SetNode(e: unknown): void;

  m_element?: never;

  m_rect?: never;
}

export enum ENavigationSourceType {
  UNKNOWN,
  GAMEPAD,
  KEYBOARD_SIMULATOR,
  MOUSE,
  TOUCH,
  LPAD,
  RPAD,
}
