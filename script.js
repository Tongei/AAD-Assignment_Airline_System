let admin_action = document.querySelector("#main_admin");
let emp_action = document.querySelector("#main_emp");
let signup_form = document.querySelector("#sign_up");

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


// Function to handle flight creation
function create_flight(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    let v_airline_name = document.getElementById('airline-name').value;
    let v_flight_id = document.getElementById('flight-id').value;
    let v_departure_at = document.getElementById('departure-at').value;
    let v_departure_date = document.getElementById('departure-date').value;
    let v_arrival_at = document.getElementById('arrival-at').value;
    let v_arrival_date = document.getElementById('arrival-date').value;
    let v_economy_seat = document.getElementById('economy').value;
    let v_business_seat = document.getElementById('business').value;
    let v_first_class_seat = document.getElementById('first-class').value;

    // Add flight details to the table
    add_flight(v_flight_id, v_airline_name, v_departure_at, v_departure_date, v_arrival_at, v_arrival_date, v_economy_seat, v_business_seat, v_first_class_seat);

    // Reset the form after submission
    document.getElementById('flightForm').reset();
}

// Function to add flight details to the table
function add_flight(flight_id, airline_name, departure_at, departure_date, arrival_at, arrival_date, economy_seat, business_seat, first_class_seat) {
    let row_get_input_admin = `
        <tr id="${flight_id}-row_get_input_admin">
            <td>${flight_id}</td>
            <td>${airline_name}</td>
            <td>${departure_at}</td>
            <td>${departure_date}</td>
            <td>${arrival_at}</td>
            <td>${arrival_date}</td>
            <td>
                <button class="bookTicket-btn" role="button">Edit</button>
                <button class="bookTicket-btn" role="button" onclick="delete_flight('${flight_id}')">
                    <i class="fa-solid fa-xmark pe-1"></i>Delete
                </button>
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
    `;

    document.getElementById("get_input_admin").innerHTML += row_get_input_admin;
    document.getElementById("dis_infor_admin").innerHTML += row_dis_infor_admin;
    document.getElementById('flightForm').reset();
}

// Function to delete flight details
function delete_flight(flight_id) {
    let flight_get_input_admin = document.getElementById(flight_id + "-row_get_input_admin");
    let flight_dis_infor_admin = document.getElementById(flight_id + "-row_dis_infor_admin");

    if (flight_dis_infor_admin) flight_dis_infor_admin.remove();
    if (flight_get_input_admin) flight_get_input_admin.remove();
}


// Edit Update btn

