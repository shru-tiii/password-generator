function showSelectedNumber() {
    var sNumber = document.getElementById("length").value;
    document.getElementById("selectedNumber").innerText = sNumber;
}

function copypassword(){
    var copiedtext = document.getElementById("copied");
    var textToCopy = document.getElementById("password").value;
    //returns a promise toh error aa sakta hai isliye try catch mai daal -- jae bhadd mai
    copiedtext.style.cssText = "visibility: visible; transition: visibility 2s ease;";
    navigator.clipboard.writeText(textToCopy);
    setTimeout(()=>{
        copiedtext.style.cssText = "visibility:hidden; ";
    }, 1000);
}
    
let upper = document.getElementById("upper");
let lower = document.getElementById("lower");
let symbol = document.getElementById("symbol");
let number = document.getElementById("number");
let circle = document.getElementById("strength-color");
function checkCount(){
    let count = 0;
    if(upper.checked) count++;
    if(lower.checked) count++;
    if(number.checked) count++;
    if(symbol.checked) count++;
    return count;
}
function setStrengthColor(len,count){
    if(len<5 || (count<=1 && len<=14)){
        circle.style.cssText = "background-color: red; box-shadow: 0.5px 0.5px 9px red;"
    }
    else if((len>=5 && len<=8 && count<=2) || (len<7 && count<=4) || (len>14 && count==1)){
        circle.style.cssText = "background-color: orange; box-shadow: 0.5px 0.5px 9px orange;"
    }
    else{
        circle.style.cssText = "background-color: green; box-shadow: 0.5px 0.5px 9px green;"
    }
}
function getRnumber(){
    let num = Math.floor(Math.random()*11);
    return num;
}
function getRupper(){
    let min=65;
    let max=90;
    let ascii = Math.floor(Math.random()*(max-min+1))+min;
    let upp = String.fromCharCode(ascii);
    return upp;
}
function getRlower(){
    let min=97;
    let max=122;
    let ascii = Math.floor(Math.random()*(max-min+1))+min;
    let low = String.fromCharCode(ascii);
    return low;
}
function getRsymbol(){
    let specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ';', ':', '\'', '"', ',', '.', '<', '>', '/', '?'];
    let randomIndex = Math.floor(Math.random() * specialCharacters.length);
    return specialCharacters[randomIndex];
}
function generate_password(){
    let fpassword = "";
    let len = document.getElementById("length").value;
    let count=checkCount(); //count=array length
    if(count>0){
        setStrengthColor(len,count);
        let arr = []; //this array is a array of functions. //jo jo checked honge
        if(upper.checked) arr.push(getRupper); //th
        if(lower.checked) arr.push(getRlower); //this
        if(number.checked) arr.push(getRnumber);
        if(symbol.checked) arr.push(getRsymbol);
        for(let x of arr){
            fpassword+=x(); //x=getRupper
        }    //math.random 
        for(let i = 1 ; i<=len-count ; i++){
            let index = Math.floor(Math.random()*(count)); //0->count-1 ek num aya
            fpassword+=arr[index]();
        }
        // console.log(fpassword);
        let pass = document.getElementById("password");
        pass.value = fpassword;
    }
}
