// Set Name on Load
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                 let name = prompt("Please enter your name for the welcoming speech:", "Guest");
                 // Jika batal/kosong, tetap pakai Guest
                 document.getElementById("user-name").innerText = (name && name.trim() !== "") ? name : "Guest";
                 updateTime();
            }, 800); // Delay sedikit agar halaman load dulu
        });

        function updateTime() {
            const timeElem = document.getElementById("current-time");
            if(timeElem) timeElem.innerText = new Date().toLocaleString('id-ID');
        }

        // Menu Logic
        const mobileMenu = document.getElementById('mobile-menu');
        function toggleMenu() { mobileMenu.classList.toggle('hidden'); }
        function closeMenu() { mobileMenu.classList.add('hidden'); }

        // Form Logic
        function handleForm(event) {
            event.preventDefault(); 
            
            // Ambil element
            const elName = document.getElementById("input-name");
            const elDob = document.getElementById("input-dob");
            const elMsg = document.getElementById("input-msg");
            const elGenderGroup = document.querySelector('input[name="gender"]:checked'); 
            const elGenderBox = document.getElementById("gender-box");
            
            // Ambil value
            const valName = elName.value.trim();
            const valDob = elDob.value;
            const valMsg = elMsg.value.trim();
            const valGender = elGenderGroup ? elGenderGroup.value : "";

            // Reset Error
            resetErrorUI(elName, elDob, elMsg, elGenderBox);

            let isValid = true;

            // Validasi
            if(!valName) { showError(elName, "err-name"); isValid = false; }
            if(!valDob) { showError(elDob, "err-dob"); isValid = false; }
            if(!valGender) {
                document.getElementById("err-gender").classList.remove("hidden");
                elGenderBox.classList.add("border-red-500", "bg-red-900/20");
                elGenderBox.classList.remove("border-transparent");
                isValid = false;
            }
            if(!valMsg) { showError(elMsg, "err-msg"); isValid = false; }

            // Jika Valid, Tampilkan
            if(isValid) {
                displayResult(valName, valDob, valGender, valMsg);
            }
        }

        function showError(inputElement, errorTextId) {
            inputElement.classList.add("border-red-500", "bg-red-900/20");
            inputElement.classList.remove("border-neutral-700");
            document.getElementById(errorTextId).classList.remove("hidden");
        }

        function resetErrorUI(elName, elDob, elMsg, elGenderBox) {
            [elName, elDob, elMsg].forEach(el => {
                el.classList.remove("border-red-500", "bg-red-900/20");
                el.classList.add("border-neutral-700");
            });
            if(elGenderBox) {
                elGenderBox.classList.remove("border-red-500", "bg-red-900/20");
                elGenderBox.classList.add("border-transparent");
            }
            document.querySelectorAll('[id^="err-"]').forEach(el => el.classList.add("hidden"));
        }

        function displayResult(name, dob, gender, msg) {
            updateTime();
            const box = document.getElementById("result-box");
            
            // Styling Hasil (Dark Mode Friendly)
            box.className = "bg-neutral-900 p-6 rounded-xl border border-amber-500/30 shadow-lg h-full flex flex-col justify-start animate-pulse";
            
            // Inject HTML (Perhatikan class text-white di sini)
            box.innerHTML = `
                <div class="w-full space-y-6 text-left">
                    <div class="bg-green-900/30 text-green-400 p-4 rounded-lg flex items-center border border-green-800">
                        <span class="font-bold">✓ Success! Data received.</span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-black p-4 rounded-lg border border-neutral-800">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Full Name</p>
                            <p class="text-lg font-bold text-white break-words">${name}</p>
                        </div>
                        <div class="bg-black p-4 rounded-lg border border-neutral-800">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date of Birth</p>
                            <p class="text-lg font-bold text-white">${dob}</p>
                        </div>
                         <div class="bg-black p-4 rounded-lg border border-neutral-800 md:col-span-2">
                            <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Gender</p>
                            <p class="text-lg font-bold text-white">${gender}</p>
                        </div>
                    </div>

                    <div>
                        <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Message</p>
                        <div class="bg-neutral-800 p-4 rounded-lg border border-neutral-700 text-amber-500 italic">"${msg}"</div>
                    </div>
                </div>
            `;
        }