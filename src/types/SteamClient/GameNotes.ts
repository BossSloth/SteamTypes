export interface GameNotes {
  DeleteImage(param0: unknown): unknown;

  DeleteNotes(): unknown;

  /*
        FilenameForNotes(e) {
        return "appid" in e ? `notes_${Number(e.appid)}` : `notes_shortcut_${h(e.shortcut)}`
    }
    DirectoryForNoteImages(e) {
        return "appid" in e ? `notes_${Number(e.appid)}_images/` : `notes_shortcut_${h(e.shortcut)}_images/`
    }
     */
  // {"result":1,"notes":"<escaped json>"}
  // <escaped json> example: {"notes":[{"id":"lmuudzqn","appid":1716740,"ordinal":0,"time_created":1695401684,"time_modified":1695403395,"title":"Old Earth Cuisine 1:","content":"[h1]Old Earth Cuisine 1:[/h1][list][*][p]Red Meat[/p][/*][/list][h1]Beverage Development 2:[/h1][list][*][p]Tranquilitea Sunray[/p][/*][/list][p][/p]"}]}
  GetNotes(filenameForNotes: string, directoryForNoteImages: string): Promise<unknown>;

  GetNotesMetadata(): unknown;

  GetNumNotes(): unknown;

  GetQuota(): unknown;

  // Results array of {"result":1,"filename":"","filesize":0,"timestamp":0}
  IterateNotes(appId: number, length: number): unknown;

  ResolveSyncConflicts(): unknown;

  // param1 - notes like escaped json in GetNotes
  SaveNotes(filenameForNotes: string, param1: string): Promise<unknown>;

  SyncToClient(): Promise<unknown>;

  SyncToServer(): Promise<unknown>;

  UploadImage(): unknown;
}
