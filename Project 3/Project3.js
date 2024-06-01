let passwordDisplay = document.querySelector('.password')
let copy = document.querySelector('.button-copy')
let copyMsg = document.querySelector('.copy-msg')
let length = document.querySelector('.length')
let slider = document.querySelector('.slider')
let uppercase = document.querySelector('#uppercase')
let lowercase = document.querySelector('#lowercase')
let symbol = document.querySelector('#symbol')
let number = document.querySelector('#number')
let strengthColor = document.querySelector('.color')
let generate = document.querySelector('.generateButton')
let allCheckbox = document.querySelectorAll('input[type=checkbox]')
let rndSymbol = "!@#$%^&*()_+{}:\"<>?~`-=[];',./";

let password="";
let checkCount =0;
let passwordLength=10;
strengthColor.style.backgroundColor="grey";
handleSlider();
function handleSlider(){
    slider.value=passwordLength;
    length.innerHTML=slider.value;
}
function setIndicator(color)
{
 strengthColor.style.backgroundColor=color;
}
function getRndInteger(min,max){
  let number = Math.floor(Math.random()*(max-min)+min);
  return number;
}
function getRndNumber() {
    return getRndInteger(0,9);
}
function getRndUppercase()
{
 let uppercaseAlphabet = String.fromCharCode(getRndInteger(65,91));   //91 so that we can get alphabet at 90
 return uppercaseAlphabet;
}
function getRndLowercase()
{
 let lowercaseAlphabet = String.fromCharCode(getRndInteger(97,123)); //123 so that we can get alphabet at 122
 return lowercaseAlphabet;
}
function generateSymbol() {
    const randNum = getRndInteger(0, rndSymbol.length);
    return rndSymbol.charAt(randNum);
}

function getStrength()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercase.checked) hasUpper=true;
    if(lowercase.checked) hasLower=true;
    if(number.checked) hasNum=true;
    if(symbol.checked) hasSym=true;

    if (hasUpper && hasLower && (hasNum || hasSym) && slider.value >= 8) 
    {
        setIndicator("#0f0");
    } 
    else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        slider.value >= 6) 
    {
        setIndicator("#ff0");
    } 
    else 
    {
        setIndicator("#f00");
    }
}
async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied"
    }
    catch{
        copyMsg.innerText="Failed"
    }
    copyMsg.classList.add("active")

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        console.log("b")
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

slider.addEventListener('input',function(e){
    passwordLength=e.target.value;
    handleSlider();
})
copy.addEventListener('click',()=>{
    if(passwordDisplay.value) copyContent();
})

function handleCheckboxChange()
{
    console.log("function called")
    checkCount=0;
    allCheckbox.forEach((checkbox)=>
    {
        if(checkbox.checked) checkCount++;
        console.log(checkCount)
    })

    //special condition
    if(passwordLength<checkCount)
        {
        passwordLength=checkCount;
    handleSlider();
        }
}
allCheckbox.forEach((checkbox)=>{
    console.log("event listener added")
    checkbox.addEventListener('change',handleCheckboxChange);
    //agar mai kisi bhi checkbox ko tick ya untick krunga toh ye shuru se dobara count krega ki kitne checkbox tick.how?because of function reference in eventlisterner
})

/*
If you were to execute the function (like handleCheckboxChange()) instead of passing the function reference (like handleCheckboxChange), the function would run immediately when the event listener is added, not when the event occurs.
By passing the function reference, you’re telling the event listener: "Here’s a function. Please call this function for me when the event happens.".
*/ 

generate.addEventListener('click',()=>{
    //none of the checkbox are selected
    if(checkCount<1)
        return ;
     
    //removing old password;
    password="";
    console.log("Starting the Journey");

    //let's put the stuff mentioned by checkboxes
   
    // if(uppercase.checked) password+=getRndUppercase();
    // if(lowercase.checked) password+=getRndLowercase();
    // if(number.checked)    password+=getRndNumber();
    // if(symbol.checked)    password+=generateSymbol();

    let funcArr=[];
    if(uppercase.checked) 
        funcArr.push(getRndUppercase)
    if(lowercase.checked) 
        funcArr.push(getRndLowercase)
    if(number.checked) 
        funcArr.push(getRndNumber)
    if(symbol.checked) 
        funcArr.push(generateSymbol)
    
    console.log("pushed")
    //compulsory addition
    for(let i=0;i<funcArr.length;i++)
        password+=funcArr[i]();
    console.log("compulsory addition done")
    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
            let randIndex = getRndInteger(0,funcArr.length);
            password+=funcArr[randIndex]()
            console.log("a")
    }
    console.log("remaining addition done")
    console.log(password)
    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
})


