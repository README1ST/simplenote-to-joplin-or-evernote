# simplenote-export-with-date
The `parse-source-json` script will create two ENEX files, one for the active notes and one for the trashed notes contained within the Simplenote export.

Information on how to obtain a JSON export of your Simplenote notes can be found at this [link](https://simplenote.com/help/#export).

This work is a tweak of a similar script but for Standard Notes, that code can be found [here](https://github.com/tanrax/standard-notes-to-evernote-or-joplin).

## Usage:

```bash
node parse-source-json.js <Path to Simplenote JSON export>
```

## Issues:

1. I ran into an `Import Error: MISSING_NOTE_TITLE` issue when trying to import the created ENEX files into Evernote. I haven't fixed this but I found it affected a very small amount of notes. I have raised this edge case as an issue here.
2. I did not need to transfer tags from Simplenote but that could be done with some work... PRs Welcome!
