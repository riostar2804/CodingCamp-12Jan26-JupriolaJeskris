document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        let name = prompt("Please enter your name for the welcoming speech:", "Guest");
        document.getElementById("user-name").innerText = (name && name.trim() !== "") ? name : "Guest";
        updateTime();
    }, 500);
});

function updateTime() {
    const timeElem = document.getElementById("current-time");
        if(timeElem) timeElem.innerText = new Date().toLocaleString('id-ID');
}

const mobileMenu = document.getElementById('mobile-menu');
function toggleMenu() { mobileMenu.classList.toggle('hidden'); }
function closeMenu() { mobileMenu.classList.add('hidden'); }

function handleForm(event) {
    event.preventDefault(); 
            
    const elName = document.getElementById("input-name");
    const elDob = document.getElementById("input-dob");
    const elMsg = document.getElementById("input-msg");
    const elGenderGroup = document.querySelector('input[name="gender"]:checked'); 
    const elGenderBox = document.getElementById("gender-box");
            
    const valName = elName.value.trim();
    const valDob = elDob.value;
    const valMsg = elMsg.value.trim();
    const valGender = elGenderGroup ? elGenderGroup.value : "";

    resetErrorUI(elName, elDob, elMsg, elGenderBox);

    let isValid = true;

    if(!valName) { showError(elName, "err-name"); isValid = false; }
    if(!valDob) { showError(elDob, "err-dob"); isValid = false; }
    if(!valGender) {
        document.getElementById("err-gender").classList.remove("hidden");
        elGenderBox.classList.add("border-red-500", "bg-red-50");
        elGenderBox.classList.remove("border-transparent");
        isValid = false;
    }
    if(!valMsg) { showError(elMsg, "err-msg"); isValid = false; }

    if(isValid) {
        displayResult(valName, valDob, valGender, valMsg);
    }
}

function showError(inputElement, errorTextId) {
    inputElement.classList.add("border-red-500", "bg-red-50");
    inputElement.classList.remove("border-gray-200");
    document.getElementById(errorTextId).classList.remove("hidden");
}

function resetErrorUI(elName, elDob, elMsg, elGenderBox) {
    [elName, elDob, elMsg].forEach(el => {
    el.classList.remove("border-red-500", "bg-red-50");
    el.classList.add("border-gray-200");
    });
    if(elGenderBox) {
        elGenderBox.classList.remove("border-red-500", "bg-red-50");
        elGenderBox.classList.add("border-transparent");
    }
    document.querySelectorAll('[id^="err-"]').forEach(el => el.classList.add("hidden"));
}

function displayResult(name, dob, gender, msg) {
    updateTime();
    const box = document.getElementById("result-box");
    box.className = "bg-white p-6 rounded-xl border-2 border-blue-100 shadow-inner h-full flex flex-col justify-start animate-pulse";
            
    box.innerHTML = `
    <div class="w-full space-y-6 text-left">
                    <div class="bg-green-50 text-green-800 p-4 rounded-lg flex items-center border border-green-200">
                        <span class="font-bold">Success! Data received.</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg border">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Full Name</p>
                            <p class="text-lg font-bold text-gray-900 break-words">${name}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg border">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date of Birth</p>
                            <p class="text-lg font-bold text-gray-900">${dob}</p>
                        </div>
                         <div class="bg-gray-50 p-4 rounded-lg border md:col-span-2">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Gender</p>
                            <p class="text-lg font-bold text-gray-900">${gender}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Message</p>
                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 text-gray-800 italic">"${msg}"</div>
                    </div>
                </div>
            `;
}