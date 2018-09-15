// listen for form submission - done
// save customer - done
//delete customer 
//edit customer
//form validation
//show customer - done
//eventListener for save - done
const save = document.getElementById('customerForm');

function saveCustomer(event){
    // get customer values
    var name = document.getElementById('customer_name').value;
    var quantity = document.getElementById('quantity_ordered').value;
    var amount = document.getElementById('amount_owed').value;

    if (quantity < 0 ) return false;

    // formValidate(customerName, quantity, amount);
    var customer = {
        name,
        quantity,
        amount
    }

    //Local Storage initialization and storage 
    if ( localStorage.getItem('customers') === null){
        var customers = [];
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
    } else{
        var customers = JSON.parse(localStorage.getItem('customers'));
        customers.push(customer);
        localStorage.setItem('customers',JSON.stringify(customers));
    }

    // reset the form
    document.getElementById('customerForm').reset();

    //refresh the customer details
    fetchCustomers();

    event.preventDefault();
}

// fetch customers 
function fetchCustomers(){
    var customers = JSON.parse(localStorage.getItem('customers'));
    var customerResults = document.getElementById('customers');
    
    customerResults.innerHTML = '';

    for(let i =0; i < customers.length; i++){
        let name = customers[i].name;
        let quantity = customers[i].quantity;
        let  amount = customers[i].amount;

        customerResults.innerHTML += `<tr>
        <td>${name}</td>
        <td>${quantity} litres</td>
        <td>Ksh ${amount}</td>
        <td><a href="#" class="floating-action-button edit-links" ><i class="material-icons">edit</i></a></td>
        <td><a href="#" class="floating-action-button delete-link"><i class="material-icons">close</i></a></td>
        </tr> `;
    }
}

function assignEditLink(){
    let editLink = document.querySelector('.edit-links');
    for(let i = 0; i < editLink.length; i++){
        editLink[i].addEventListener('click', editCustomer);
    }
}

function assignDeleteLinkEvent(){
    let deleteLink = document.querySelector('delete-link');

    for(let i =0; i < deleteLink.length; i++){
        deleteLink[i].addEventListener('click', deleteCustomer);
    }
}
// delete a customer who's cleared their debt
function deleteCustomer(){
    console.log('deleted!!')
    // let customers = JSON.parse(localStorage.getItem('customers'));
  
    // let parent = this.parentNode.parentNode;
    // let child = this.parentNode;

    // parent.removeChild(child);

    // localStorage.setItem('customers', JSON.stringify(customers));

    // fetchCustomers();
}

// edit customer
function editCustomer(){
    console.log('edited!!')
    //fetch customer
    //edit
    //re-set to JSON/ stringify
    fetchCustomers();
}

//validate form
function formValidate(customerName, quantity, amount){
    if(!customerName || !quantity || !amount){
        alert('Please fill in the valid details');
        return false;
    }
}

save.addEventListener('submit', saveCustomer);

