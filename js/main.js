

var pNameInput = document.getElementById("pname"),
    pPriceInpute = document.getElementById("pprice"),
    pCatInpute = document.getElementById("pcat"),
    pDecInpute = document.getElementById("pdec"),
    mainbtn=document.getElementById("mainbtn");

     
    var myStore ;


    function productNameValided(){

        var rgx =/^[A-Z][a-z]{3,8}/


        if(rgx.test(pNameInput.value)==true)
        {
            pNameInput.classList.remove("is-invalid")
            pNameInput.classList.add("is-valid")
            return true;
        }else{
            pNameInput.classList.add("is-invalid")
            pNameInput.classList.remove("is-valid")
            return false;
        }


    }


    function productPriceValided(){

        var rgx =/^[1-9]+/


        if(rgx.test(pPriceInpute.value)==true)
        {
            pPriceInpute.classList.remove("is-invalid")
            pPriceInpute.classList.add("is-valid")
            return true;
        }else{
            pPriceInpute.classList.add("is-invalid")
            pPriceInpute.classList.remove("is-valid")
            return false;
        }


    }

    function productCatValided(){

        var rgx =/^[A-Z][a-z]{3,8}/


        if(rgx.test(pCatInpute.value)==true)
        {
            pCatInpute.classList.remove("is-invalid")
            pCatInpute.classList.add("is-valid")
            return true;
        }else{
            pCatInpute.classList.add("is-invalid")
            pCatInpute.classList.remove("is-valid")
            return false;
        }


    }

    function productDecValided(){

        var rgx =/^[a-z]+/


        if(rgx.test(pDecInpute.value)==true)
        {
            pDecInpute.classList.remove("is-invalid")
            pDecInpute.classList.add("is-valid")
            return true;
        }else{
            pDecInpute.classList.add("is-invalid")
            pDecInpute.classList.remove("is-valid")
            return false;
        }


    }


pNameInput.addEventListener("blur" ,productNameValided );
pPriceInpute.addEventListener("blur" ,productPriceValided );
pCatInpute.addEventListener("blur" ,productCatValided );

pDecInpute.addEventListener("blur" ,productDecValided );


    if( localStorage.getItem("productInStorage")==null ){
        myStore=[];
    }else{
        myStore =JSON.parse(localStorage.getItem("productInStorage"))
        displayProduct();
    }

    function addProduct(){

        if(productNameValided()==true && productPriceValided()==true && productCatValided()==true && productDecValided()==true){

        
        var pNameValue = pNameInput.value,
            pPriceValue = pPriceInpute.value,
            pCatValue = pCatInpute.value,
            pDecValue = pDecInpute.value;
       
        var product =
        {
            pName:pNameValue,
            pPrice:pPriceValue,
            pCat :pCatValue,
            pDesc:pDecValue
        }
    
     

    myStore.push(product);
    localStorage.setItem("productInStorage" , JSON.stringify(myStore))
    clearInputs();
    displayProduct();

     }else{
         alert ("you must enter value")

     }
}


function clearInputs()
{
    pNameInput.value="";
    pPriceInpute.value="";
    pCatInpute.value="";
    pDecInpute.value="";

    pNameInput.classList.remove("is-invalid");
    pNameInput.classList.remove("is-valid");
    pPriceInpute.classList.remove("is-invalid");
    pPriceInpute.classList.remove("is-valid");
    pCatInpute.classList.remove("is-invalid");
    pCatInpute.classList.remove("is-valid");
    pDecInpute.classList.remove("is-invalid");
    pDecInpute.classList.remove("is-valid");
}


function displayProduct()
{
    
    var hassala ="" ;
    for(var i=0 ; i< myStore.length; i++ )
    {
        hassala+=`<tr>
        <td> ` + myStore[i].pName +`</td>
        <td>` +  myStore[i].pPrice +`</td>
        <td>`+  myStore[i].pCat +`</td>
        <td>`+  myStore[i].pDesc +`</td>
        <td> <button onclick="deleteproduct(` + i+ `)" class="btn btn-danger">delete</button></td>
        <td><button onclick="updateProduct(`+ i +`)" class="btn btn-warning">Update</button></td></tr>`

        
    }

    document.getElementById("tbody").innerHTML = hassala ;
    
   
}


function deleteproduct( Pindex)
{
    myStore.splice(Pindex,1);
    displayProduct();
    localStorage.setItem("productInStorage" , JSON.stringify(myStore))
}


function searchProduct(useWord)
{
    var hassala ="" ;
    for(var i=0 ; i< myStore.length; i++ )
    {

        if((myStore[i].pName).toLowerCase().includes(useWord.toLowerCase()))
        {
            hassala+=`<tr>
        <td> ` + myStore[i].pName +`</td>
        <td>` +  myStore[i].pPrice +`</td>
        <td>`+  myStore[i].pCat +`</td>
        <td>`+  myStore[i].pDesc +`</td>
        <td> <button onclick="deleteproduct(` + i+ `)" class="btn btn-danger">delete</button></td>
        
        </tr>`

        
        }
        
    }

    document.getElementById("tbody").innerHTML = hassala ;
}



function updateProduct(upindex){
    pNameInput.value= myStore[upindex].pName 
    pPriceInpute.value=myStore[upindex].pPrice
    pCatInpute.value= myStore[upindex].pCat
    pDecInpute.value=myStore[upindex].pDesc

    mainbtn.innerHTML=("Update")


    mainbtn.onclick=function(){
        myStore[upindex].pName =pNameInput.value
        myStore[upindex].pPrice= pPriceInpute.value
        myStore[upindex].pCat=pCatInpute.value
        myStore[upindex].pDesc= pDecInpute.value

        localStorage.setItem("productInStorage" , JSON.stringify(myStore));
        mainbtn.innerHTML="Add product";
        mainbtn.onclick=addProduct;
    
        displayProduct();
        clearInputs();
    }
}