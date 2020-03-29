# simplenote-export-with-date
The `parse-source-json` script will create two ENEX files, one for the active notes and one for the trashed notes contained within the Simplenote export.

Information on how to obtain a JSON export of your Simplenote notes can be found at this [link](https://simplenote.com/help/#export).

## Usage:

```bash
node parse-source-json.js <Path to Simplenote JSON export>
```

I ran into an `Import Error: MISSING_NOTE_TITLE` issue when trying to import the created ENEX files into Evernote. I haven't fixed this but I found it affected a very small amount of notes. I have raised this edge case as an issue here.
