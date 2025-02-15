export enum SwItemType {
  PinnedApp = 'PinnedApp',
  Pinned = 'Pinned',
  TemporalApp = 'TemporalPin',
  Separator = 'Separator',
  Media = 'Media',
  Start = 'StartMenu',
}

export interface PinnedWegItem {
  type: SwItemType.Pinned;
  path: string;
  is_dir: boolean;
};

export interface PinnedAppWegItem {
  type: SwItemType.PinnedApp;
  /** executable path */
  exe: string;
  /** command to open the app using explorer.exe (UWP apps start with `shell:AppsFolder`) */
  execution_path: string;
}

export interface TemporalPinnedWegItem {
  type: SwItemType.TemporalApp;
  /** executable path */
  exe: string;
  /** command to open the app using explorer.exe (UWP apps start with `shell:AppsFolder`) */
  execution_path: string;
}

export interface SeparatorWegItem {
  type: SwItemType.Separator;
  id: string;
}

export interface MediaWegItem {
  type: SwItemType.Media;
}

export interface StartWegItem {
  type: SwItemType.Start;
}

export type WegItem =
  | PinnedWegItem
  | PinnedAppWegItem
  | TemporalPinnedWegItem
  | SeparatorWegItem
  | MediaWegItem
  | StartWegItem;

export interface WegItems {
  left: WegItem[];
  center: WegItem[];
  right: WegItem[];
}
