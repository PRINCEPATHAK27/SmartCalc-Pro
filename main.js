// ================= THEME =================

document.addEventListener("DOMContentLoaded", function() {

    const themeBtn = document.getElementById("themeBtn");

    if(themeBtn){
        themeBtn.onclick = () => {
            document.body.classList.toggle("dark");
            themeBtn.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
        };
    }

    showHistory();

});


// ================= BASIC CALCULATOR =================

let display = document.getElementById("display");

function press(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        let result = eval(display.value);
        display.value = result;
        saveHistory("Basic Calculator : " + result);
    } catch{
        display.value = "Error";
    }
}


// ================= AGE CALCULATOR =================

function calculateAge(){
    let dob = document.getElementById("dob").value;
    if(!dob){ alert("Select Date of Birth"); return; }

    let birth = new Date(dob);
    let today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    let month = today.getMonth() - birth.getMonth();

    if(month < 0){ age--; month += 12; }

    let days = today.getDate() - birth.getDate();
    if(days < 0){ month--; }

    let result = `Age: ${age} Years ${month} Months`;
    document.getElementById("ageResult").innerHTML = result;
    saveHistory("Age Calculator : " + result);
}


// ================= EMI CALCULATOR =================

function calculateEMI(){
    let P = Number(document.getElementById("loan").value);
    let R = Number(document.getElementById("rate").value) / 12 / 100;
    let N = Number(document.getElementById("years").value) * 12;

    if(!P || !R || !N){ alert("Enter all values"); return; }

    let emi = (P * R * Math.pow(1+R, N)) / (Math.pow(1+R, N) - 1);
    let total = emi * N;
    let interest = total - P;

    let result = `Monthly EMI: ₹${emi.toFixed(2)}<br>Total Payment: ₹${total.toFixed(2)}<br>Total Interest: ₹${interest.toFixed(2)}`;
    document.getElementById("emiResult").innerHTML = result;
    saveHistory("EMI : ₹" + emi.toFixed(2) + "/month");
}


// ================= SIP CALCULATOR =================

function calculateSIP(){
    let amount = Number(document.getElementById("sipAmount").value);
    let rate   = Number(document.getElementById("sipRate").value) / 100 / 12;
    let months = Number(document.getElementById("sipYears").value) * 12;

    if(!amount || !rate || !months){ alert("Enter all values"); return; }

    let future   = amount * ((Math.pow(1+rate, months) - 1) / rate) * (1+rate);
    let invested = amount * months;
    let profit   = future - invested;

    let result = `Invested: ₹${invested.toFixed(0)}<br>Profit: ₹${profit.toFixed(0)}<br>Final Value: ₹${future.toFixed(0)}`;
    document.getElementById("sipResult").innerHTML = result;
    saveHistory("SIP Calculator Completed");
}


// ================= PERCENTAGE =================

function calculatePercentage(){
    let value = Number(document.getElementById("percentValue").value);
    let total = Number(document.getElementById("percentTotal").value);

    if(!value || !total){ alert("Enter values"); return; }

    let result = (value / total) * 100;
    let output = `${result.toFixed(2)}%`;
    document.getElementById("percentResult").innerHTML = output;
    saveHistory("Percentage : " + output);
}


// ================= GST =================

function calculateGST(){
    let amount = Number(document.getElementById("gstAmount").value);
    let rate   = Number(document.getElementById("gstRate").value);

    if(!amount || !rate){ alert("Enter all values"); return; }

    let gst   = amount * rate / 100;
    let total = amount + gst;

    let result = `GST: ₹${gst.toFixed(2)}<br>Final Amount: ₹${total.toFixed(2)}`;
    document.getElementById("gstResult").innerHTML = result;
    saveHistory("GST Calculator : ₹" + total.toFixed(2));
}


// ================= BMI =================

function calculateBMI(){
    let weight = Number(document.getElementById("weight").value);
    let height = Number(document.getElementById("height").value) / 100;

    if(!weight || !height){ alert("Enter values"); return; }

    let bmi = weight / (height * height);
    let status = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal ✅" : bmi < 30 ? "Overweight" : "Obese";

    let result = `BMI: ${bmi.toFixed(2)}<br>Status: ${status}`;
    document.getElementById("bmiResult").innerHTML = result;
    saveHistory("BMI : " + bmi.toFixed(2) + " (" + status + ")");
}


// ================= SHAPE CALCULATOR =================

function showShapeInputs(){
    // Hide all shape input groups
    document.querySelectorAll(".shape-inputs").forEach(el => el.classList.remove("active"));
    document.getElementById("shapeResult").innerHTML = "";

    let shape = document.getElementById("shapeSelect").value;
    if(shape){
        let target = document.getElementById("inputs-" + shape);
        if(target) target.classList.add("active");
    }
}

function getVal(id){
    let el = document.getElementById(id);
    return el ? Number(el.value) : 0;
}

function calculateShape(){
    let shape = document.getElementById("shapeSelect").value;
    if(!shape){ alert("Please select a shape"); return; }

    let area = 0, perimeter = 0, resultText = "";

    switch(shape){

        case "circle": {
            let r = getVal("circle-r");
            if(!r){ alert("Enter radius"); return; }
            area      = Math.PI * r * r;
            perimeter = 2 * Math.PI * r;
            resultText = `Area: ${area.toFixed(4)}<br>Circumference: ${perimeter.toFixed(4)}`;
            break;
        }

        case "rectangle": {
            let l = getVal("rect-l"), w = getVal("rect-w");
            if(!l || !w){ alert("Enter length and width"); return; }
            area      = l * w;
            perimeter = 2 * (l + w);
            resultText = `Area: ${area.toFixed(4)}<br>Perimeter: ${perimeter.toFixed(4)}`;
            break;
        }

        case "square": {
            let s = getVal("sq-s");
            if(!s){ alert("Enter side"); return; }
            area      = s * s;
            perimeter = 4 * s;
            resultText = `Area: ${area.toFixed(4)}<br>Perimeter: ${perimeter.toFixed(4)}`;
            break;
        }

        case "triangle": {
            let a = getVal("tri-a"), b = getVal("tri-b"), c = getVal("tri-c"), h = getVal("tri-h");
            if(!a || !b || !c){ alert("Enter all three sides"); return; }
            perimeter = a + b + c;
            if(h){
                area = 0.5 * a * h;
            } else {
                // Heron's formula
                let sp = perimeter / 2;
                area = Math.sqrt(sp * (sp-a) * (sp-b) * (sp-c));
            }
            resultText = `Area: ${area.toFixed(4)}<br>Perimeter: ${perimeter.toFixed(4)}`;
            break;
        }

        case "parallelogram": {
            let b = getVal("para-b"), h = getVal("para-h"), s = getVal("para-s");
            if(!b || !h || !s){ alert("Enter base, height and side"); return; }
            area      = b * h;
            perimeter = 2 * (b + s);
            resultText = `Area: ${area.toFixed(4)}<br>Perimeter: ${perimeter.toFixed(4)}`;
            break;
        }

        case "trapezoid": {
            let a = getVal("trap-a"), b = getVal("trap-b");
            let c = getVal("trap-c"), d = getVal("trap-d"), h = getVal("trap-h");
            if(!a || !b || !c || !d){ alert("Enter all sides"); return; }
            perimeter = a + b + c + d;
            if(!h){ alert("Enter height for area calculation"); return; }
            area = 0.5 * (a + b) * h;
            resultText = `Area: ${area.toFixed(4)}<br>Perimeter: ${perimeter.toFixed(4)}`;
            break;
        }

        case "ellipse": {
            let ea = getVal("ellipse-a"), eb = getVal("ellipse-b");
            if(!ea || !eb){ alert("Enter both axes"); return; }
            area = Math.PI * ea * eb;
            // Ramanujan approximation for ellipse circumference
            perimeter = Math.PI * (3*(ea+eb) - Math.sqrt((3*ea+eb)*(ea+3*eb)));
            resultText = `Area: ${area.toFixed(4)}<br>Circumference (approx): ${perimeter.toFixed(4)}`;
            break;
        }

        case "rhombus": {
            let d1 = getVal("rhom-d1"), d2 = getVal("rhom-d2"), s = getVal("rhom-s");
            if(!d1 || !d2){ alert("Enter both diagonals"); return; }
            area = (d1 * d2) / 2;
            if(s){
                perimeter = 4 * s;
            } else {
                perimeter = 4 * Math.sqrt((d1/2)*(d1/2) + (d2/2)*(d2/2));
            }
            resultText = `Area: ${area.toFixed(4)}<br>Perimeter: ${perimeter.toFixed(4)}`;
            break;
        }

        default:
            alert("Unknown shape");
            return;
    }

    document.getElementById("shapeResult").innerHTML = resultText;
    saveHistory(`Shape (${shape}) — Area: ${area.toFixed(2)}, Perimeter/Circumference: ${perimeter.toFixed(2)}`);
}


// ================= HISTORY =================

function saveHistory(data){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let date    = new Date().toLocaleString();
    history.unshift(data + " | " + date);
    localStorage.setItem("history", JSON.stringify(history));
    showHistory();
}

function showHistory(){
    let list = document.getElementById("historyList");
    if(!list) return;
    let history = JSON.parse(localStorage.getItem("history")) || [];
    list.innerHTML = "";
    history.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = item;
        list.appendChild(li);
    });
}

function clearHistory(){
    localStorage.removeItem("history");
    showHistory();
}
