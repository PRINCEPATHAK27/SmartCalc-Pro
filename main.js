// ================= THEME =================

document.addEventListener("DOMContentLoaded", function() {

    const themeBtn = document.getElementById("themeBtn");

    if(themeBtn){
        themeBtn.onclick = () => {
            document.body.classList.toggle("dark");
            if(document.body.classList.contains("dark")){
                themeBtn.innerHTML = "☀️";
            } else {
                themeBtn.innerHTML = "🌙";
            }
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

    display.value="";

}


function calculate(){

    try{

        let result = eval(display.value);

        display.value=result;

        saveHistory("Basic Calculator : " + result);

    }

    catch{

        display.value="Error";

    }

}





// ================= AGE CALCULATOR =================


function calculateAge(){

let dob=document.getElementById("dob").value;

if(!dob){
    alert("Select Date of Birth");
    return;
}


let birth=new Date(dob);

let today=new Date();


let age=today.getFullYear()-birth.getFullYear();

let month=today.getMonth()-birth.getMonth();


if(month<0){

age--;
month+=12;

}


let result=`Age: ${age} Years ${month} Months`;

document.getElementById("ageResult").innerHTML=result;


saveHistory("Age Calculator : "+result);


}







// ================= EMI CALCULATOR =================


function calculateEMI(){


let P=Number(document.getElementById("loan").value);

let R=Number(document.getElementById("rate").value)/12/100;

let N=Number(document.getElementById("years").value)*12;



if(!P || !R || !N){

alert("Enter all values");
return;

}



let emi=(P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);


let result=
`Monthly EMI: ₹${emi.toFixed(2)}`;


document.getElementById("emiResult").innerHTML=result;


saveHistory("EMI : "+result);


}







// ================= SIP CALCULATOR =================


function calculateSIP(){


let amount=
Number(document.getElementById("sipAmount").value);


let rate=
Number(document.getElementById("sipRate").value)/100/12;


let months=
Number(document.getElementById("sipYears").value)*12;



if(!amount || !rate || !months){

alert("Enter all values");
return;

}



let future=
amount*
((Math.pow(1+rate,months)-1)/rate)
*(1+rate);



let invested=amount*months;


let profit=future-invested;



let result=
`
Invested: ₹${invested.toFixed(0)}
<br>
Profit: ₹${profit.toFixed(0)}
<br>
Final Value: ₹${future.toFixed(0)}
`;



document.getElementById("sipResult").innerHTML=result;


saveHistory("SIP Calculator Completed");


}







// ================= PERCENTAGE =================


function calculatePercentage(){


let value=
Number(document.getElementById("percentValue").value);


let total=
Number(document.getElementById("percentTotal").value);



if(!value || !total){

alert("Enter values");
return;

}


let result=(value/total)*100;


let output=
`${result.toFixed(2)}%`;


document.getElementById("percentResult").innerHTML=output;


saveHistory("Percentage : "+output);


}








// ================= GST =================


function calculateGST(){


let amount=
Number(document.getElementById("gstAmount").value);


let rate=
Number(document.getElementById("gstRate").value);



let gst=amount*rate/100;


if(!amount || !rate){
alert("Enter all values");
return;
}


let total=amount+gst;


let result=
`
GST: ₹${gst}
<br>
Final Amount: ₹${total}
`;



document.getElementById("gstResult").innerHTML=result;


saveHistory("GST Calculator : "+total);


}








// ================= BMI =================


function calculateBMI(){


let weight=
Number(document.getElementById("weight").value);


let height=
Number(document.getElementById("height").value)/100;



if(!weight || !height){

alert("Enter values");
return;

}



let bmi=weight/(height*height);


let status="";


if(bmi<18.5)
status="Underweight";

else if(bmi<25)
status="Normal";

else if(bmi<30)
status="Overweight";

else
status="Obese";



let result=
`BMI: ${bmi.toFixed(2)}
<br>
Status: ${status}`;



document.getElementById("bmiResult").innerHTML=result;


saveHistory("BMI : "+bmi.toFixed(2));


}








// ================= HISTORY =================


function saveHistory(data){


let history=
JSON.parse(localStorage.getItem("history")) || [];


let date=new Date().toLocaleString();


history.unshift(
data+" | "+date
);



localStorage.setItem(
"history",
JSON.stringify(history)
);


showHistory();


}





function showHistory(){


let list=
document.getElementById("historyList");


if(!list)return;


let history=
JSON.parse(localStorage.getItem("history")) || [];



list.innerHTML="";


history.forEach(item=>{


let li=document.createElement("li");

li.innerHTML=item;

list.appendChild(li);


});


}



function clearHistory(){


localStorage.removeItem("history");

showHistory();


}