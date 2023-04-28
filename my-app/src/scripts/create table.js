
const Headings = ["Name"," Building","Apartment","In date","Out date","Status"];
const Name = ["Sravan bannu","Madhuri Mittapalli","Ramya Maddieni"];
const Buildings = ["B1","B2","B1"];
const Apartment = ["105","108","105"];
const Indate= ["10/11/2021","11/01/2021","10/11/2021"];
const Outdate= ["10/13/2021","11/02/2021","10/13/2021"];
const Status= ["Approved","Pending","Rejected"];


const popup = document.querySelector(".popup");
function showPopup() {
  popup.classList.add("open");
}
function hidePopup() {
  popup.classList.remove("open");
}
function createtable(headings, firstcol, secondcol, thirdcol,fourthcol,fifthcol,sixthcol, tableid) {
  const action = "remove";
  const table = document.getElementById(tableid);
  let headerRow = document.createElement("tr");
  headings.forEach((head) => {
    let tablehead = document.createElement("th");
    tablehead.innerText = head;
    headerRow.append(tablehead);
  });
  console.log(table);
  table.append(headerRow);
  let tablelength = firstcol.length;
  for (let i = 0; i < tablelength; i++) {
    let row = document.createElement("tr");
    row.append(createcell(firstcol[i]));
    row.append(createcell(secondcol[i]));
    row.append(createcell(thirdcol[i]));
    row.append(createcell(fourthcol[i]));
    row.append(createcell(fifthcol[i]));
    row.append(createcell(sixthcol[i]));

    table.append(row);
  }
}

function createcell(text) {
  var cell = document.createElement("td");
  cell.innerText = text;
  return cell;
}


function onloadfunction() {
  createtable(Headings,Name,Buildings,Apartment,Indate,Outdate,Status, "newtable");
}

window.addEventListener("load", onloadfunction);
