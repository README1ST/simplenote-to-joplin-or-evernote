const fs = require('fs');

const filePath = process.argv.slice(2)[0];
const source = fs.readFileSync(filePath);

const notes = JSON.parse(source);
const testNote = notes.activeNotes[1];
const trashedNotes = notes.trashedNotes;

const finalFile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE en-export SYSTEM \"http://xml.evernote.com/pub/evernote-export3.dtd\">
<en-export export-date="20171228T194211Z" application="Evernote" version="Evernote Mac 6.13.3 (455969)">`;

// maybe i don't need to replace
// function replaceNewlineCharacters(str) {
//     text.replace(' \r\n', 'ferret')
// }

function isoToEnDate(isoDatestring) {
    var d = new Date(isoDatestring);
    return `${d.getFullYear()}${d.getMonth()}${d.getDay()}T${d.getHours()}${d.getMinutes()}${d.getSeconds()}Z`
}

function simplenoteToEnexFormat(noteJson) {
    var {content, creationDate, lastModified} = noteJson;
    var creationDate = isoToEnDate(creationDate);
    var lastModified = isoToEnDate(lastModified);
    const title = content.slice(0, 6);
    return `<note><title>${title}</title><content><![CDATA[<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note>${content}</en-note>]]></content><created>${creationDate}</created><updated>${lastModified}</updated><note-attributes><author></author><source></source><reminder-order>0</reminder-order></note-attributes></note></en-export>`
}

const enex = simplenoteToEnexFormat(testNote);

fs.writeFileSync('enex.enex', finalFile + enex);