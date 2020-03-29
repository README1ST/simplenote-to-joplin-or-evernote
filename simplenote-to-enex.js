const fs = require('fs');
const moment = require('moment');

const exportFilePath = process.argv.slice(2)[0];
const simplenoteExport = fs.readFileSync(exportFilePath);

const notes = JSON.parse(simplenoteExport);
const {activeNotes, trashedNotes} = notes;

const finalFile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE en-export SYSTEM \"http://xml.evernote.com/pub/evernote-export3.dtd\">
<en-export export-date="20171228T194211Z" application="Evernote" version="Evernote Mac 6.13.3 (455969)">`;

async function replaceNewlineChars(str) {
    return str.replace(/\r\n/g, '<br/>');
}

function isoToEvernoteDate(isoDatestring) {
    var d = new Date(isoDatestring);
    var d = moment(d).format('YYYYMMDDTHHmmss[Z]');
    return d;
}

async function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

async function simplenoteToEnexFormat(noteJson) {
    var {content, creationDate, lastModified} = noteJson;
    var creationDate = isoToEvernoteDate(creationDate);
    var lastModified = isoToEvernoteDate(lastModified);
    var content = await escapeXml(content);
    var content = await replaceNewlineChars(content);
    const title = content.split('<br/>')[0];
    return `<note><title>${title}</title><content><![CDATA[<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note>${content}</en-note>]]></content><created>${creationDate}</created><updated>${lastModified}</updated><note-attributes><author></author><source></source><reminder-order>0</reminder-order></note-attributes></note>`
}

async function createNotebookFileContent(testNotes) {
    var result = await Promise.all(testNotes.map(async function (x) {
        return await simplenoteToEnexFormat(x);
    }));
    var result =  result.join('');
    return finalFile + result + '</en-export>';
}

async function run() {
    var activeNotesResult = await createNotebookFileContent(activeNotes);
    var trashedNotesResult = await createNotebookFileContent(trashedNotes);

    fs.writeFileSync('activeNotes.enex', activeNotesResult);
    fs.writeFileSync('trashedNotes.enex', trashedNotesResult);
}

run();
