let admin_action = document.querySelector("#main_admin");
let emp_action = document.querySelector("#main_emp");
let signup_form = document.querySelector("#sign_up");
let submitButton = document.querySelector("button[type='submit']");
let editingFlightId = null;
const first_class_price = 150;
const business_price = 90;
const economy_price = 70;

function sign_up(event){
    event.preventDefault();
    let usernameInput = document.querySelector("#username");
    let passwordInput = document.querySelector("#password");

    let username = usernameInput.value;
    let password = passwordInput.value;

    let user_admin = "Admin";
    let pass_admin = "Admin123";
    let user_emp = "Employee";
    let pass_emp = "Employee123";

    if(username === user_admin && password === pass_admin){
        signup_form.classList.add("d-none");
        AdminControl();
    } else if(username === user_emp && password === pass_emp){
        signup_form.classList.add("d-none");
        EmpControl();
    } else {
        alert("Invalid Username or Password!\nPlease try again!");
    }

    usernameInput.value = '';
    passwordInput.value = '';
}

function AdminControl(){
    admin_action.classList.remove("d-none");
}

function EmpControl(){
    emp_action.classList.remove("d-none");
}

function log_out(){
    signup_form.classList.remove("d-none");
    admin_action.classList.add("d-none");
    emp_action.classList.add("d-none");
}

// ========admin====

let airline_name = document.getElementById("airline-name");
let flight_id = document.getElementById("flight-id");
let departure_at = document.getElementById("departure-at");
let departure_date = document.getElementById("departure-date");
let arrival_at = document.getElementById("arrival-at");
let arrival_date = document.getElementById("arrival-date");
let economy_seat = document.getElementById("economy");
let business_seat = document.getElementById("business");
let first_class_seat = document.getElementById("first-class");
let note = document.getElementById("note");

function create_flight(event){
    event.preventDefault();
    let v_airline_name = airline_name.value;
    let v_flight_id = flight_id.value;
    let v_departure_at = departure_at.value;
    let v_departure_date = departure_date.value;
    let v_arrival_at = arrival_at.value;
    let v_arrival_date = arrival_date.value;
    let v_economy_seat =economy_seat.value;
    let v_business_seat = business_seat.value;
    let v_first_class_seat = first_class_seat.value;

    if (editingFlightId) {
        update_flight(editingFlightId, v_airline_name, v_departure_at, v_departure_date, v_arrival_at, v_arrival_date, v_economy_seat, v_business_seat, v_first_class_seat);
        editingFlightId = null;
        submitButton.textContent = 'Add Flight';
    } else {
        if (isDuplicateFlightId(v_flight_id)) {
            alert("Duplicate flight ID. Please enter a unique flight ID.");
            return;
        }
        add_flight(v_flight_id, v_airline_name, v_departure_at, v_departure_date, v_arrival_at, v_arrival_date, v_economy_seat, v_business_seat, v_first_class_seat);
    }

    document.querySelector('#form_flight').reset();
}
function isDuplicateFlightId(flight_id) {
    let rows = document.getElementById("dis_infor_admin").getElementsByTagName("tr");
    for (let row of rows) {
        if (row.getElementsByTagName("td")[0].innerText === flight_id) {
            return true;
        }
    }
    return false;
}

function add_flight(flight_id, airline_name, departure_at, departure_date, arrival_at, arrival_date, economy_seat, business_seat, first_class_seat){
    let total_price = eval((economy_price * economy_seat)+(business_price * business_seat)+(first_class_price * first_class_seat));
    let row_get_input_admin = `
        <tr id="${flight_id}-row_get_input_admin">
            <td>${flight_id}</td>
            <td>${airline_name}</td>
            <td>${departure_at}</td>
            <td>${departure_date}</td>
            <td>${arrival_at}</td>
            <td>${arrival_date}</td>
            <td>
                <button class="bookTicket-btn" role="button" onclick="edit_flight('${flight_id}')">Edit</button>
                <button class="bookTicket-btn " role="button" onclick="delete_flight('${flight_id}')"><i
                    class="fa-solid fa-xmark pe-1"></i>Delete</button>
            </td>
        </tr>
    `;

    let row_dis_infor_admin = `
        <tr id="${flight_id}-row_dis_infor_admin">
            <td>${flight_id}</td>
            <td>${airline_name}</td>
            <td>${departure_at}</td>
            <td>${departure_date}</td>
            <td>${arrival_at}</td>
            <td>${arrival_date}</td>
            <td>${economy_seat}</td>
            <td>${business_seat}</td>
            <td>${first_class_seat}</td>
        </tr>
    `
    // emp
    let row_dis_infor_flight_emp = `
        <tr id="${flight_id}-row_dis_infor_flight_emp">
            <td>${flight_id}</td>
            <td>${departure_at}</td>
            <td>${departure_date}</td>
            <td>${arrival_at}</td>
            <td>${arrival_date}</td>
            <td>${economy_seat}</td>
            <td>${business_seat}</td>
            <td>${first_class_seat}</td>
            <td><button class="bookTicket-btn" role="button" onclick="get_book_ticket(this)">Book</button></td>
        </tr>
    `
    let row_emp_flight_with_price = `
                        <tr>
                            <td>${flight_id}</td>
                            <td>${departure_at}</td>
                            <td>${departure_date}</td>
                            <td>${arrival_at}</td>
                            <td>${arrival_date}</td>
                            <td>${economy_seat}</td>
                            <td>${business_seat}</td>
                            <td>${first_class_seat}</td>
                            <td>${total_price}$</td>
                        </tr>
    `;
    document.getElementById("get_input_admin").innerHTML += row_get_input_admin;
    document.getElementById("dis_infor_admin").innerHTML += row_dis_infor_admin;
    document.getElementById("emp_tbl_flight_get_from_admin").innerHTML += row_dis_infor_flight_emp; //emp
    document.getElementById("emp_flight_with_price").innerHTML += row_emp_flight_with_price;
}


// Edit Update btn
function edit_flight(flight_id){
    editingFlightId = flight_id;
    let row = document.getElementById(flight_id + "-row_dis_infor_admin");
    let cells = row.getElementsByTagName('td');

    document.getElementById("airline-name").value = cells[1].innerText;
    document.getElementById("flight-id").value = cells[0].innerText;
    document.getElementById("departure-at").value = cells[2].innerText;
    document.getElementById("departure-date").value = cells[3].innerText;
    document.getElementById("arrival-at").value = cells[4].innerText;
    document.getElementById("arrival-date").value = cells[5].innerText;
    document.getElementById("economy").value = cells[6].innerText;
    document.getElementById("business").value = cells[7].innerText;
    document.getElementById("first-class").value = cells[8].innerText;

    submitButton.textContent = 'Update Flight';
}

function update_flight(flight_id, airline_name, departure_at, departure_date, arrival_at, arrival_date, economy_seat, business_seat, first_class_seat){
    let row_get_input_admin = document.getElementById(`${flight_id}-row_get_input_admin`);
    row_get_input_admin.innerHTML = `
        <td>${flight_id}</td>
        <td>${airline_name}</td>
        <td>${departure_at}</td>
        <td>${departure_date}</td>
        <td>${arrival_at}</td>
        <td>${arrival_date}</td>
        <td>
            <button class="bookTicket-btn" role="button" onclick="edit_flight('${flight_id}')">Edit</button>
            <button class="bookTicket-btn" role="button" onclick="delete_flight('${flight_id}')"><i class="fa-solid fa-xmark pe-1"></i>Delete</button>
        </td>
    `;

    let row_dis_infor_admin = document.getElementById(`${flight_id}-row_dis_infor_admin`);
    row_dis_infor_admin.innerHTML = `
        <td>${flight_id}</td>
        <td>${airline_name}</td>
        <td>${departure_at}</td>
        <td>${departure_date}</td>
        <td>${arrival_at}</td>
        <td>${arrival_date}</td>
        <td>${economy_seat}</td>
        <td>${business_seat}</td>
        <td>${first_class_seat}</td>
    `;
    // emp
    let row_dis_infor_flight_emp = document.getElementById(`${flight_id}-row_dis_infor_flight_emp`);
    row_dis_infor_flight_emp.innerHTML = `
        <td>${flight_id}</td>
        <td>${departure_at}</td>
        <td>${departure_date}</td>
        <td>${arrival_at}</td>
        <td>${arrival_date}</td>
        <td>${economy_seat}</td>
        <td>${business_seat}</td>
        <td>${first_class_seat}</td>
        <td><button class="bookTicket-btn" role="button" onclick="get_book_ticket(this)">Book</button></td>
    `;
}

// ===delete===
function delete_flight(flight_id){
    let flight_get_input_admin = document.getElementById(flight_id + "-row_get_input_admin");
    let flight_dis_infor_admin = document.getElementById(flight_id + "-row_dis_infor_admin");
    //emp
    let flight_dis_infor_flight_emp = document.getElementById(flight_id + "-row_dis_infor_flight_emp");

    if(flight_dis_infor_admin) flight_dis_infor_admin.remove();
    if(flight_get_input_admin) flight_get_input_admin.remove();
    //emp
    if(flight_dis_infor_flight_emp) flight_dis_infor_flight_emp.remove();
}



// Add an event listener to reset the table when inputs are cleared
document.getElementById('flightSearchForm').addEventListener('reset', function() {
    let table = document.getElementById('main_emp_tbl_flight_get_from_admin');
    let rows = table.getElementsByTagName('tr');

    // Show all rows
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display = '';
    }
});

// =======crud-passenger====

// Global variables to store flight details
let flightDetails = {};

// Get elements by ID
let passenger_id = document.getElementById("passenger_id");
let first_name = document.getElementById("first-name");
let last_name = document.getElementById("last-name");
let dob = document.getElementById("dob");
let p_nationality = document.getElementById("nationality");
let p_male = document.getElementById("male");
let p_female = document.getElementById("female");
let p_email = document.getElementById("passenger_email");
let p_phone = document.getElementById("phone_number");
let p_address = document.getElementById("passenger_address");
let p_country = document.getElementById("passenger_country");
let postal = document.getElementById("postal");
let get_flight_id = document.getElementById("get_flight_id");
let p_seat_type = document.getElementById("passenger_seat_type");
let p_seat_number = document.getElementById("passenger_seat_number");
let price = 0.00;
let gender = '';

let passengerIds = new Set();
function create_passenger(event){
    event.preventDefault();

    
    let v_passenger_id = passenger_id.value;
    let v_first_name = first_name.value;
    let v_last_name = last_name.value;
    let v_dob = dob.value;
    let v_p_nationality = p_nationality.value;
    let v_p_email = p_email.value;
    let v_p_phone = p_phone.value;
    let v_p_address = p_address.value;
    let v_p_country = p_country.value;
    let v_postal = postal.value;
    let v_p_seat_type = p_seat_type.value.toLowerCase();
    let v_p_seat_number = p_seat_number.value;

    if (passengerIds.has(v_passenger_id)) {
        alert("Passenger ID already exists! Please use a different ID.");
        return;
    }

    passengerIds.add(v_passenger_id);

    if(p_male.checked) gender = p_male.value;
    if(p_female.checked) gender = p_female.value;

    if(v_p_seat_type.includes("economy")) price = economy_price;
    if(v_p_seat_type.includes("business")) price = business_price;
    if(v_p_seat_type.includes("first")) price = first_class_price;

    // Pass stored flight details to add_passenger
    add_passenger(v_passenger_id, v_first_name, v_last_name, v_dob, v_p_nationality, gender, v_p_email, v_postal, price, v_p_seat_type, v_p_seat_number,flightDetails.flightId, flightDetails.departure_at, flightDetails.arrival_at, v_p_phone, v_p_country,  v_p_address);

    document.getElementById("passenger_form").reset();

    document.getElementById("payment-section").classList.remove("d-none");
}

function get_book_ticket(btn){
    let row_get_booked = btn.parentElement.parentElement;

    flightDetails.flightId = row_get_booked.getElementsByTagName('td')[0].innerText;
    flightDetails.departure_at = row_get_booked.getElementsByTagName('td')[1].innerText;
    flightDetails.departure_date = row_get_booked.getElementsByTagName('td')[2].innerText;
    flightDetails.arrival_at = row_get_booked.getElementsByTagName('td')[3].innerText;
    flightDetails.arrival_date = row_get_booked.getElementsByTagName('td')[4].innerText;

    document.getElementById("get_flight_id").value = flightDetails.flightId;

    let row_com_flight = `
        <tr id="${flightDetails.flightId}-row_com_flight-da">
            <td>${flightDetails.flightId}</td>
            <td>${flightDetails.departure_at}</td>
            <td>${flightDetails.departure_date}</td>
            <td>${flightDetails.arrival_at}</td>
            <td>${flightDetails.arrival_date}</td>
            <td></td>
            <td></td>
        </tr>
    `;
    document.getElementById("flight_com_detail").innerHTML = row_com_flight;
}

function add_passenger(passenger_id, first_name, last_name, dob, p_nationality, gender, p_email, postal, price, seat_type, seat_number,flightId, departure_at, arrival_at, p_phone, p_country, p_address) {
    let inner_data_com_flight = document.getElementById("flight_com_detail");
    inner_data_com_flight.getElementsByTagName('td')[5].innerText = seat_type;
    inner_data_com_flight.getElementsByTagName('td')[6].innerText = seat_number;

    let row_passenger_com = `
                               <tr id="${passenger_id}-row_passenger_com">
                                    <td>${passenger_id}</td>
                                    <td>${first_name} ${last_name}</td>
                                    <td>${dob}</td>
                                    <td>${gender}</td>
                                    <td>${postal}</td>  
                                    <td>${p_nationality}</td>
                                    <td>${p_email}</td>
                                </tr>
    
    `;

    document.getElementById("row_passenger_com").innerHTML = row_passenger_com;

    let row_passenger_edit = `
            <tr id="${passenger_id}-row_passenger_edit">
                <td>${passenger_id}</td> 
                <td>${first_name}</td>
                <td>${last_name}</td>
                <td>${gender}</td>
                <td>${dob}</td>
                <td>${postal}</td>
                <td>${p_nationality}</td>
                <td>${p_email}</td>

                <td class="d-none">${flightId}</td>
                <td class="d-none">${p_phone}</td>
                <td class="d-none">${p_country}</td>
                <td class="d-none">${p_address}</td>
                <td class="d-none">${seat_type}</td>
                <td class="d-none">${seat_number}</td>
                <td><button class="bookTicket-btn" role="button" onclick="edit_passenger(${passenger_id})">Edit</button></td>
            </tr>
    `;

    document.getElementById("row_passenger_edit").innerHTML += row_passenger_edit;

    let row_passenger_delete = `
             <tr id="${passenger_id}-row_passenger_delete">
                <td>${passenger_id}</td>
                <td>${first_name} ${last_name}</td>
                <td>${gender}</td>
                <td>${dob}</td>
                <td>${postal}</td>
                <td>${p_nationality}</td>
                <td>${p_email}</td>
                <td><button onclick="delete_passenger(${passenger_id})" class="bookTicket-btn " role="button"><i class="fa-solid fa-xmark pe-1"></i>Delete</button></td>
            </tr>
    `;
    document.getElementById("row_passenger_delete").innerHTML += row_passenger_delete;

    let row_dis_passenger_infor = `
        <tr id="${passenger_id}-row_dis_passenger_infor">
            <td>${passenger_id}</td>
            <td>${first_name} ${last_name}</td>
            <td>${gender}</td>
            <td>${dob}</td>
            <td>${postal}</td>
            <td>${p_nationality}</td>
            <td>${p_email}</td>
            <td>${departure_at}</td>
            <td>${arrival_at}</td>
        </tr>
    `;
    document.getElementById("dis_player_passenger_infor").innerHTML += row_dis_passenger_infor;

    let detail_for_payment = `
        <li class="list-group-item">
            <span class="list-info">Number of Passenger:</span>1
        </li>
        <li class="list-group-item">
            <span class="list-info">Airfare:</span>$${price}
        </li>
        <li class="list-group-item">
            <span class="list-info">Taxes and Fees:</span>0.00
        </li>
        <li class="list-group-item">
            <span class="list-info">Total Price:</span><span class="total">$${price}</span>
        </li>
    `;
    document.getElementById("detail_payment").innerHTML = detail_for_payment;
}

// ===--=-====
function delete_passenger(passenger_id){
    	let row_passenger_edit = document.getElementById(passenger_id + "-row_passenger_edit");
        let row_passenger_delete = document.getElementById(passenger_id+"-row_passenger_delete");
        let row_dis_passenger_infor = document.getElementById(passenger_id+"-row_dis_passenger_infor");

        // alert();
        if(row_passenger_edit) row_passenger_edit.remove();
        if(row_passenger_delete) row_passenger_delete.remove();
        if(row_dis_passenger_infor) row_dis_passenger_infor.remove();
}

// document.getElementById("airline-name")
function edit_passenger(passenger_id) {
    let row = document.getElementById(passenger_id + "-row_passenger_edit");
    let cells = row.getElementsByTagName('td');

    let passenger_id_u = document.getElementById("passenger-id-update");
    let firstname_u = document.getElementById("first-name-update");
    let lastname_u = document.getElementById("last-name-update");
    let nationality_u = document.getElementById("nationality-update");
    let dob_u = document.getElementById("dob-update");
    let email_u = document.getElementById("email-update");
    let phone_u = document.getElementById("phone-update");
    let address_u = document.getElementById("address-update");
    let country_u = document.getElementById("country-update");
    let postal_u = document.getElementById("postal-update");
    let flight_id_u = document.getElementById("flight-id-update");
    let seat_type_u = document.getElementById("seat-type-update");
    let seat_number_u = document.getElementById("seat-number-update");
    let male_u = document.getElementById("male-btn-update");
    let female_u = document.getElementById("female-btn-update");

    passenger_id_u.value = cells[0].innerHTML;
    firstname_u.value = cells[1].innerHTML;
    lastname_u.value = cells[2].innerHTML;
    nationality_u.value = cells[6].innerHTML;
    dob_u.value = cells[4].innerHTML;
    email_u.value = cells[7].innerHTML;
    phone_u.value = cells[9].innerHTML;
    address_u.value = cells[11].innerHTML;
    country_u.value = cells[10].innerHTML;
    postal_u.value = cells[5].innerHTML;
    flight_id_u.value = cells[8].innerHTML;
    seat_type_u.value = cells[12].innerHTML;
    seat_number_u.value = cells[13].innerHTML;

    if (cells[3].innerHTML.toLowerCase() === "male") {
        male_u.checked = true;
    } else if (cells[3].innerHTML.toLowerCase() === "female") {
        female_u.checked = true;
    }
}

function update_passenger(event) {
    event.preventDefault();

    let passenger_id_u = document.getElementById("passenger-id-update").value;
    let firstname_u = document.getElementById("first-name-update").value;
    let lastname_u = document.getElementById("last-name-update").value;
    let nationality_u = document.getElementById("nationality-update").value;
    let dob_u = document.getElementById("dob-update").value;
    let email_u = document.getElementById("email-update").value;
    let phone_u = document.getElementById("phone-update").value;
    let address_u = document.getElementById("address-update").value;
    let country_u = document.getElementById("country-update").value;
    let postal_u = document.getElementById("postal-update").value;
    let flight_id_u = document.getElementById("flight-id-update").value;
    let seat_type_u = document.getElementById("seat-type-update").value;
    let seat_number_u = document.getElementById("seat-number-update").value;
    let male_u = document.getElementById("male-btn-update").checked;
    let female_u = document.getElementById("female-btn-update").checked;

    let gender_u = male_u ? "male" : female_u ? "female" : "";

    let get_da = document.getElementById(`${flightDetails.flightId}-row_com_flight-da`);
    let row_da = get_da.getElementsByTagName('td');
    let get_arr_at = row_da[3].innerHTML;
    let get_de_at = row_da[1].innerHTML;

    let u_row_dis_passenger_infor = document.getElementById(`${passenger_id_u}-row_dis_passenger_infor`);
    u_row_dis_passenger_infor.innerHTML = `
        <td>${passenger_id_u}</td>
        <td>${firstname_u} ${lastname_u}</td>
        <td>${gender_u}</td>
        <td>${dob_u}</td>
        <td>${postal_u}</td>
        <td>${nationality_u}</td>
        <td>${email_u}</td>
        <td>${get_de_at}</td>
        <td>${get_arr_at}</td>
    `;

    let u_row_passenger_delete = document.getElementById(`${passenger_id_u}-row_passenger_delete`);
    u_row_passenger_delete.innerHTML = `
        <td>${passenger_id_u}</td>
        <td>${firstname_u} ${lastname_u}</td>
        <td>${gender_u}</td>
        <td>${dob_u}</td>
        <td>${postal_u}</td>
        <td>${nationality_u}</td>
        <td>${email_u}</td>
        <td><button onclick="delete_passenger(${passenger_id_u})" class="bookTicket-btn " role="button"><i class="fa-solid fa-xmark pe-1"></i>Delete</button></td>
    `;

    let u_row_passenger_edit = document.getElementById(`${passenger_id_u}-row_passenger_edit`);
    u_row_passenger_edit.innerHTML = `
        <td>${passenger_id_u}</td> 
        <td>${firstname_u}</td>
        <td>${lastname_u}</td>
        <td>${gender_u}</td>
        <td>${dob_u}</td>
        <td>${postal_u}</td>
        <td>${nationality_u}</td>
        <td>${email_u}</td>
        <td class="d-none">${flight_id_u}</td>
        <td class="d-none">${phone_u}</td>
        <td class="d-none">${country_u}</td>
        <td class="d-none">${address_u}</td>
        <td class="d-none">${seat_type_u}</td>
        <td class="d-none">${seat_number_u}</td>
        <td><button class="bookTicket-btn" role="button" onclick="edit_passenger(${passenger_id_u})">Edit</button></td>
    `;

    let row_passenger_com_u = `
                               <tr id="${passenger_id_u}-row_passenger_com">
                                    <td>${passenger_id_u}</td>
                                    <td>${firstname_u} ${lastname_u}</td>
                                    <td>${dob_u}</td>
                                    <td>${gender_u}</td>
                                    <td>${postal_u}</td>  
                                    <td>${nationality_u}</td>
                                    <td>${email_u}</td>
                                </tr>
    
    `;

    row_da[5].innerHTML = seat_type_u;
    row_da[6].innerHTML = seat_number_u;
    document.getElementById("row_passenger_com").innerHTML = row_passenger_com_u;

    if(seat_type_u.includes("economy")) price = economy_price;
    if(seat_type_u.includes("business")) price = business_price;
    if(seat_type_u.includes("first")) price = first_class_price;

    let detail_for_payment_u = `
        <li class="list-group-item">
            <span class="list-info">Number of Passenger:</span>1
        </li>
        <li class="list-group-item">
            <span class="list-info">Airfare:</span>$${price}
        </li>
        <li class="list-group-item">
            <span class="list-info">Taxes and Fees:</span>0.00
        </li>
        <li class="list-group-item">
            <span class="list-info">Total Price:</span><span class="total">$${price}</span>
        </li>
    `;
    document.getElementById("detail_payment").innerHTML = detail_for_payment_u;

    document.getElementById("passenger_form_update").reset();
}

// ====search====
function searchTable(){
    const originalTableData = [...document.getElementById('dis_infor_admin').rows].map(row => row.innerHTML);
    console.log(originalTableData);
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("tbl_dis_infor_admin");
    const tr = table.getElementsByTagName("tr");
    if (!filter) {
        resetTable();
        return;
    }

    for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        const td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
    function resetTable() {
        const tableBody = document.getElementById('dis_infor_admin');
        tableBody.innerHTML = originalTableData.map(row => `<tr id="${flight_id}-row_dis_infor_admin">${row}</tr>`).join('');
    }
    document.getElementById("searchInput").addEventListener("input", function() {
        if (this.value === '') {
            resetTable();
        }
    });
}

function paid(event){
    event.preventDefault();
    let pay_fn = document.getElementById("pay_fn");
    let pay_ln = document.getElementById("pay_ln");
    let cdc = document.getElementById("credit-card");
    let sc = document.getElementById("security-code");
    let ed = document.getElementById("expire-date");

    alert("Successfully paid from " + pay_fn.value + " " + pay_ln.value + ".");

    pay_fn.value = '';
    pay_ln.value = '';
    cdc.value = '';
    sc.value = '';
    ed.value = '';

    document.getElementById("payment-section").classList.add("d-none");
}
// search flight publish
document.getElementById('flightSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let departure = document.getElementById('departure').value.toLowerCase();
    let arrival = document.getElementById('arrival').value.toLowerCase();
    let departDate = document.getElementById('depart-date').value;
    let arrivalDate = document.getElementById('arrival-date').value;

    filterTable(departure, arrival, departDate, arrivalDate);
});

function filterTable(departure, arrival, departDate, arrivalDate) {
    let table = document.getElementById('main_emp_tbl_flight_get_from_admin');
    let rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let depCell = cells[1].textContent.toLowerCase();
        let arrCell = cells[3].textContent.toLowerCase();
        let depDateCell = cells[2].textContent;
        let arrDateCell = cells[4].textContent;

        if (
            (departure === '' || depCell.includes(departure)) &&
            (arrival === '' || arrCell.includes(arrival)) &&
            (departDate === '' || depDateCell === departDate) &&
            (arrivalDate === '' || arrDateCell === arrivalDate)
        ) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// ===search====
function searchTableForUpdatePs(){
    const originalTableData = [...document.getElementById('row_passenger_edit').rows].map(row => row.innerHTML);
    console.log(originalTableData);
    const input = document.getElementById("searchInput_update");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("tbl_passenger_edit");
    const tr = table.getElementsByTagName("tr");
    if (!filter) {
        resetTable();
        return;
    }

    for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        const td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
    function resetTable() {
        const tableBody = document.getElementById('row_passenger_edit');
        tableBody.innerHTML = originalTableData.map(row => `<tr>${row}</tr>`).join('');
    }
    document.getElementById("searchInput_update").addEventListener("input", function() {
        if (this.value === '') {
            resetTable();
        }
    });
}

function searchTableForDeletePs(){
    const originalTableData = [...document.getElementById('row_passenger_delete').rows].map(row => row.innerHTML);
    console.log(originalTableData);
    const input = document.getElementById("searchInput_delete");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("tbl_passenger_delete");
    const tr = table.getElementsByTagName("tr");
    if (!filter) {
        resetTable();
        return;
    }

    for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        const td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
    function resetTable() {
        const tableBody = document.getElementById('row_passenger_delete');
        tableBody.innerHTML = originalTableData.map(row => `<tr>${row}</tr>`).join('');
    }
    document.getElementById("searchInput_update").addEventListener("input", function() {
        if (this.value === '') {
            resetTable();
        }
    });
}

