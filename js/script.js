let key = [
    ["~", "A",  "B",  "C",  "D",  "E",  "F",  "AB"],
    ["AC", "AD", "AE", "AF", "BC", "BD", "BE", "BF"],
    ["CD", "CE", "CF", "DE", "DF", "EF", "ABC", "ABD"],
    ["ABE", "ABF", "ACD", "ACE", "ACF", "ADE", "ADF", "AEF"],
    ["BCD", "BCE", "BCF", "BDE", "BDF", "BEF", "CDE", "CDF"],
    ["CEF", "DEF", "ABCD", "ABCE", "ABCF", "ABDE", "ABDF", "ABEF"],
    ["ACDE", "ACDF", "ACEF", "ADEF", "BCDE", "BCDF", "BCEF", "BDEF"],
    ["CDEF", "ABCDE", "ABCDF", "ABCEF", "ABDEF", "ACDEF", "BCDEF", "ABCDEF"],
];

let table = [];

for (let y = 0; y < 8; y++) {
    let row = [];
    for (let x = 0; x < 8; x++){
        row.push((Math.floor(Math.random() * 2)?"tails":"heads"));
    }
    table.push(row);
}

function display() {
    let board = document.getElementById("gameboard");
    let output = "<table>";
    for (let y = 0; y < table.length; y++) {
        output += "<tr>";
        for (let x = 0; x < table[y].length; x++) {
            output += "<td id='"+ key[y][x] +"'><img src='img/penny-" + table[y][x] + ".png' type='image/png' alt='" + table[y][x] + "' /></td>";
        }
        output += "</tr>";
    }
    output += "</table>";
    board.innerHTML = output;
} 

function count(i) {
    let reg = new RegExp(i);
    let counter = 0;
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            if (table[y][x] == "heads" && reg.test(key[y][x])) {
                counter++;
            }
        }
    }
    return counter % 2;
}

function map_() {
    let sets = ["A", "B", "C", "D", "E", "F"];
    let record = {A:0, B:0, C:0, D:0, E:0, F:0};
    for (let i = 0; i < sets.length; i++) {
        record[sets[i]] = count(sets[i]);
    }
    return record;
}

function legend_(y, x){
    let record = {A:0, B:0, C:0, D:0, E:0, F:0};
    if (y < table.length/2){
        record["A"] = 1;
        if (y < table.length/4){ 
            record["C"] = 1;
            if (y < table.length/8){ 
                record["E"] = 1;
            }
            else { 
                record["E"] = 0;
            }
        }
        else {
            record["C"] = 0;
            if (y < ((table.length/8) + (table.length/4))){
                record["E"] = 1;
            }
            else {
                record["E"] = 0;
            }

        }
    }
    else {
        record["A"] = 0;
        if (y < ((table.length/4) + (table.length/2))) {
            record["C"] = 1;
            if (y < ((table.length/8) + (table.length/2))) {
                record["E"] = 1;
            }
            else {
                record["E"] = 0;
            }
        }
        else {
            record["C"] = 0;
            if (y < ((table.length/8) + (table.length/4) + (table.length/2))) {
                record["E"] = 1;
            }
            else {
                record["E"] = 0;
            }
        }
    }
    if (x < table[y].length/2){
        record["B"] = 1;
        if (x < table[y].length/4){
            record["D"] = 1;
            if (x < table[y].length/8){
                record["F"] = 1;
            }
            else {
                record["F"] = 0;
            }
        }
        else {
            record["D"] = 0;
            if (x < ((table[y].length/8) + (table[y].length/4))){
                record["F"] = 1;
            }
            else {
                record["F"] = 0;
            }
        }
    }
    else {
        record["B"] = 0;
        if (x < ((table[y].length/4) + (table[y].length/2))) {
            record["D"] = 1;
            if (x < ((table[y].length/8) + (table[y].length/2))) {
                record["F"] = 1;
            }
            else {
                record["F"] = 0;
            }
        }
        else {
            record["D"] = 0;
            if (x < ((table[y].length/8) + (table[y].length/4) + (table[y].length/2))) {
                record["F"] = 1;
            }
            else {
                record["F"] = 0;
            }
        }
    }    
    return record;
}

function pick_a_coin() {
    let y = Math.floor(Math.random() * table.length);
    let x = Math.floor(Math.random() * table[y].length);
    flip_a_coin(map_(), legend_(y, x));
    document.getElementById(key[y][x]).addEventListener("click", winner);
}

function flip_a_coin(map, legend) {
    let results = "";
    let sets = ["A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < sets.length; i++) {
        if (map[sets[i]] != legend[sets[i]]) {
            results += sets[i];
        }
    }
    for (let i = 0; i < key.length; i++) {
        if (key[i].indexOf(results) >= 0) {
            if (table[i][key[i].indexOf(results)] == "heads") {
                table[i][key[i].indexOf(results)] = "tails";
            }
            else {
                table[i][key[i].indexOf(results)] = "heads";
            }
        }
    }
    display();

}

function winner() {
    alert("Winner! Congrats!");
}
