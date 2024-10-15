import { TFile, App, TAbstractFile } from "obsidian";

const DAILY_NOTES_FOLDER = "Daily Notes";

/**
 * Determines if the provided file is a daily note.
 * @param file The file to check.
 * @returns True if the file is a daily note, false otherwise.
 */
export function isDailyNote(file: TAbstractFile): boolean {
  if (!(file instanceof TFile)) {
    return false;
  }

  return file.path.startsWith(DAILY_NOTES_FOLDER) && file.extension === "md";
}

/**
 * Fetches previous daily note.
 * @param app The Obsidian app instance.
 * @returns The file representing the previous daily note (likely yesterday), or undefined if it
 * doesn't exist.
 */
export function fetchPreviousDailynote(app: App): TFile | undefined {
  const dailyNotes = app.vault
    .getFiles()
    .filter(isDailyNote)
    .sort((a, b) => b.name.localeCompare(a.name));

  return dailyNotes[1];
}
