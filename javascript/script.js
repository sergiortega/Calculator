var result = null;
var firstOp = true;
var equalClicked = true;
var solution, operation;

function equal() {
    equalClicked=true;
    console.log(result);
    var res = eval(result);

    if(res == null) return false;

    if(res != Number.POSITIVE_INFINITY && res != Number.NEGATIVE_INFINITY){           
        if(isNaN(res)){
            solution.value = "ERROR";  
            operation.value = null;
            result = null;
        }else{
            solution.value = res;  
                operation.value = null;
                result = res;
        }
    }else{
        solution.value = "ERROR";  
        operation.value = null;
        result = null;
    } 
}

function removeLast() {
    if(result == null) return false;
    result = result.substr(0,result.length-1);
    solution.value = result; 
}

function isOperator (val){  
    var opArray = ['+', '-', '*', '/'];  
    if(opArray.indexOf(val) > -1)
        return true; 
    else
        return false;     
}

function close(){
    localStorage.setItem("operation", operation.value);
    localStorage.setItem("total", solution.value);
}

function keyDown(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    var report = true;
    var aux = null;

    if(key == 8){//backspace
        e.preventDefault();
        e.stopPropagation();
        removeLast();
        report = false;  

        if(report && result != null){
            if(!result.isNaN)  
                result = parseFloat(result);
            result += aux;
            console.log(result);
            operation.value = aux;   
            solution.value = null;     
        }
    }
}

function keyPress(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    var report = true;
    var aux = null;

    //catch numbers keypress
    if((key >= 48 && key <= 57) || key == 46) {
        aux = String.fromCharCode(key);
        if(equalClicked){    
            result = aux;            
            solution.value = aux;
            equalClicked = false;
            return;
        }else{               
            result += aux;
            solution.value += aux; 
        }
    }else {
        switch(key){
            case 99: //letter "c"
                result = null;
                operation.value = null;
                solution.value = result; 
                report = false;
                break;
            case 13: //enter
                equal();
                report = false;
                break;
            case 42:
                aux = "*";
                break;
            case 43:
                aux = "+";
                break;
            case 45:
                aux = "-";
                break;
            case 47:
                aux = "/";
                break;
            default:    
                return;
                break;
        }

        if(report && result != null){
            if(!result.isNaN)  
                result = parseFloat(result);
            result += aux;
            console.log(result);
            operation.value = (aux == '*') ? 'x' : aux;   
            solution.value = null;
        }
    }
}

$(document).ready(function() {
    solution = document.getElementById('solution');
    operation = document.getElementById('operation');
    var storageTotal = localStorage.getItem("total");
    var storageOperation = localStorage.getItem("operation");

    if(storageTotal != "") {        
        result = storageTotal;
        solution.value = result;
    }
    if(storageOperation != "") {
        firstOp = false;
        operation.value = storageOperation;  
    }

    $('.number').click(function() {
        if(equalClicked) {
            result = $(this).val();
            solution.value = $(this).val();
            equalClicked = false;
            return;            
        }

        if(result == null) {
            result = $(this).val();
            solution.value = $(this).val();
        }else { 
            result += $(this).val();
            solution.value += $(this).val();
        }
    });

    $('.operator').click(function() {    
        if(result != null) {          
            console.log("Result: "+ result);    
            var last = result.substring(result.length - 1);
            if(isOperator(last))
                result = result.substring(0, result.length - 1);
            
            var value = ($(this).val() == 'x') ? '*' : $(this).val();            
            result += value;
            operation.value = $(this).val();
            solution.value = null;  
        } else if($(this).val() == "-") {
            result = $(this).val();
            console.log("Result: "+ result);
            operation.value = $(this).val();
            solution.value = null; 
        }
    });

    $('.equal').click(function(){
        equal();
    });

    $('.other').click(function() {
        switch($(this).val()) {
            case "CLEAR":
                result = null;
                break;
            default:
                removeLast();
                break;
        }
    });

    $( 'input[type="textfield"]' ).keypress(function (e) {
        return false;
    });

    window.onkeypress = keyPress;
    window.onkeydown = keyDown;
    window.onbeforeunload  = close;
});