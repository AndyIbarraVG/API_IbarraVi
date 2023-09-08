const fsc = require('fs');
const path = require('path');
const { jsPDF } = require("jspdf");
var xl = require('excel4node');
// console.log(__dirname);
// console.log(__filename);

fsc.writeFile(path.join(__dirname, 'archivo.txt'),"Archivo creado api callback",(err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Archivo creado");
    }
});

const doc = new jsPDF()
doc.text("Hola mundo",10, 10);
doc.save(path.join(__dirname, 'archivo.pdf'));

var wb = new xl.Workbook();
var ws = wb.addWorksheet('Hoja 1');
var ws2 = wb.addWorksheet('Hoja 2');

var style = wb.createStyle({
    font: {
        color: '#FF0800',
        size: 12,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
});

ws.cell(1,1).number(100).style(style);

wb.write(path.join(__dirname, 'archivo.xlsx'));