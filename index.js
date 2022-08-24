[...document.getElementsByClassName("btn")].forEach(function (btn){
    btn.addEventListener("click", function (e) {
        let updatedValue;
        if(btn.classList.contains("plus-btn")){
            updatedValue=valueUpdate(e,function (privValues){
                return privValues+1;
            });
            
        }else if(btn.classList.contains("minus-btn")){
            updatedValue=valueUpdate(e,function (privValues){
                return privValues-1;
            });
        }else if(btn.classList.contains("check-out")){
            window.location.reload();
        }
        let [value,returnElement] = updatedValue;
        if(returnElement.getAttribute("id")=="mobile"){
            returnElement.innerText=`$${value*1219}`;
            subTotalandTaxandTotalCal();
        }else if(returnElement.getAttribute("id")=="case"){
            returnElement.innerText=`$${value*59}`;
            subTotalandTaxandTotalCal();
        }
    });
});

function valueUpdate(element,cd) {
    let countContainer;
    if(element.target.parentElement.classList.contains("plus-btn") ){
        countContainer=element.target.parentElement.previousElementSibling;
    }
    else if(element.target.parentElement.classList.contains("minus-btn")){
        countContainer=element.target.parentElement.nextElementSibling;
    }
    else if(element.target.parentElement.classList.contains("input-btn-container")){
        countContainer=element.target.parentElement.children[1];
    }
    let privValue=parseInt(countContainer.value);
    let lastValue;
    if (privValue>0) {
        lastValue=cd(privValue);
    }else{
        lastValue=0;
    }
    countContainer.value=lastValue;
    return [lastValue,countContainer.parentElement.nextElementSibling];
}

function subTotalandTaxandTotalCal() {
    let value=0;
    [...document.getElementsByClassName("individualPrice")].forEach(function(item) {
        value+=parseInt(item.innerText.substring(1,item.innerText.length));
    })
    document.getElementById("subtotalVAlue").innerText=`$${value}`;
    document.getElementById("taxValue").innerText=`$${(value*0.2).toFixed(2)}`;
    document.getElementById("totalValue").innerText=`$${(value+parseFloat((value*0.2).toFixed(2))).toFixed(2)}`;

}

