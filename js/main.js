var list = [
    {"desc":"rice", "amount":"1","value":"5.40"},
    {"desc":"beer", "amount":"12","value":"1.99"},
    {"desc":"meat", "amount":"1","value":"15.00"}
];

// Função pegar Total de Compras
function getTotal(list){
    var total = 0;

    for(var key in list){
        total += list[key].value * list[key].amount;
    };

    document.getElementById("totalValue").innerHTML = formatValue(total);
    
    return total;
}

// Função printar itens
function setList(list) {

    var table ='';
    for( var key in list){
        table += '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount(list[key].amount)+'</td><td>'+formatValue(list[key].value)+'</td><td><button onclick="setUpdate('+key+');" class="btn btn-info">Edit</button> <button onclick="deleteData('+key+');" class="btn btn-danger">Delete</button></td></tr>';
    };
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}


// FORMAT

// Formatar Descrição
function formatDesc(desc){
    var str = desc.toLowerCase();
    str     = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

// Formatar Quantidade
function formatAmount(amount) {
    return parseInt(amount);
}

// Formatar Valor
function formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str     = str.replace(".", ",");
    str     = "$ " + str;
    return str;
}




// CRUD

    var global_desc        = document.getElementById("desc")
    var global_amount      = document.getElementById("amount")
    var global_value       = document.getElementById("value")
    var global_hidden      = document.getElementById("inputIDUpdate")


// Adiciona item a lista
function addData(){

    // Validação
    if (!validation()) {
        return;
    }

    var desc    = global_desc.value;
    var amount  = global_amount.value;
    var value   = global_value.value;

    list.unshift({"desc":desc, "amount":amount, "value":value});
    setList(list);    
}


// Edita item
function setUpdate(id) {
    var obj = list[id];
    global_desc.value   = obj.desc ;
    global_amount.value = obj.amount;
    global_value.value  = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    
    global_hidden.innerHTML  = '<input id="idUpdate" type="hidden" value="'+id+'">';
    


}

// Reset form
function resetForm() {
    global_desc.value   = "" ;
    global_amount.value = "";
    global_value.value  = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    global_hidden.value  = "";
}


function updateData() {

    // Validação
    if (!validation()) {
        return;
    }

    var id      = document.getElementById("idUpdate").value;
    var desc    = global_desc.value;
    var amount  = global_amount.value;
    var value   = global_value.value;

    list[id] = {"desc": desc, "amount": amount, "value": value};
    resetForm();
    setList(list);
}

function deleteData(id) {
    if (confirm("Delete this Item?")) {

        list.splice(id,1);
        // if (id === list.length - 1) {
        //     list.pop();
        // }else if(id === 0){
        //     list.shift();
        // }else{
        //     var arrAuxIni = list.slice(0, id);
        //     var arrAuxEnd = list.slice(id+1);
        //     list = arrAuxIni.concat(arrAuxEnd);
        // }

        setList(list);
    }
}

function deleteList(){
    if (confirm("Delete this list?")) {
        list = [];
        setList(list);
    }
}


function validation() {

    var desc    = global_desc.value;
    var amount  = global_amount.value;
    var value   = global_value.value;
    var errors  = "";

    document.getElementById("errors").style.display ="none";

    // Validar Descrição
    if (desc === "") {
        errors += '<p>Fill out description</p>'
    }

    // validar quantidade
    if (amount === "") {
        errors += '<p>Fill out amount</p>';
    }else if(amount != parseInt(amount)){
        errors +='<p>Fill out a valid amount</p>'
    }

    // validar valor
    if (value === "") {
        errors += '<p>Fill out value</p>';
    }else if(value != parseFloat(value)){
        errors +='<p>Fill out a valid value</p>'
    }

    // Se existir erros
    if (errors != "") {
        var campo_errors = document.getElementById("errors");

        campo_errors.style.display = "block";
        campo_errors.style.backgroundColor = "rgba(85,85,85,0.3)";
        campo_errors.style.color = "black";
        campo_errors.style.padding = "10px";
        campo_errors.style.margin = "10px";
        campo_errors.style.borderRadius = "13px";

        campo_errors.innerHTML = "<h3>Erros</h3>" + errors;
        return 0;
    } else {
        return 1;
    }

}


// STORAGE

// Save list
function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

// Inicializar Storage
function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList)
    }
    setList(list);
}

initListStorage();