let admin_action = document.querySelector("#main_admin");
let emp_action = document.querySelector("#main_emp");
let signup_form = document.querySelector("#sign_up");
let submitButton = document.querySelector("button[type='submit']");
let editingFlightId = null;


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
        add_flight(v_flight_id, v_airline_name, v_departure_at, v_departure_date, v_arrival_at, v_arrival_date, v_economy_seat, v_business_seat, v_first_class_seat);
    }
    // v_airline_name = '';
    // v_flight_id = '';
    // v_departure_at = '';
    // v_departure_date = '';
    // v_arrival_at = '';
    // v_arrival_date = '';
    // v_economy_seat = '';
    // v_business_seat = '';
    // v_first_class_seat = '';

    document.querySelector('#form_flight').reset();
}

function add_flight(flight_id, airline_name, departure_at, departure_date, arrival_at, arrival_date, economy_seat, business_seat, first_class_seat){
    
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
            <td><button class="bookTicket-btn" role="button">Book</button></td>
        </tr>
    `
    document.getElementById("get_input_admin").innerHTML += row_get_input_admin;
    document.getElementById("dis_infor_admin").innerHTML += row_dis_infor_admin;
    document.getElementById("emp_tbl_flight_get_from_admin").innerHTML += row_dis_infor_flight_emp; //emp
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
        <td><button class="bookTicket-btn" role="button">Book</button></td>
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

// Add an event listener to reset the table when inputs are cleared
document.getElementById('flightSearchForm').addEventListener('reset', function() {
    let table = document.getElementById('main_emp_tbl_flight_get_from_admin');
    let rows = table.getElementsByTagName('tr');

    // Show all rows
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display = '';
    }
});
