<template>
    <main style="background-color: #fde5d1">
        <section class="pt-4">
            <div class="container vstack gap-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card border">
                            <div class="card-header border-bottom">
                                <h5 class="card-header-title">EDIT PROFILE</h5>
                            </div>
                            <div class="card-body">
                                <div class="row" style="text-align: justify">
                                    <div class="col-md-3 my-1">
                                        <span>Name:</span>
                                        <input class="form-control" style="float: right" v-model="registerUser.name"
                                            placeholder="User Name" />
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>Email Id :</span>
                                        <input class="form-control" style="float: right" v-model="registerUser.email"
                                            placeholder="Email Id" />
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>DOB :</span>
                                        <VueDatePicker v-model="registerUser.dob" :format="'dd-MM-yyyy'" auto-apply
                                            :enable-time-picker="false" placeholder="DD-MM-YYYY"></VueDatePicker>
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>Gender:</span>
                                        <div class="d-flex justify-content-between border p-2 rounded"
                                            style="border-color: #4a4a4a;">
                                            <label>
                                                <input type="radio" value="Male" v-model="registerUser.gender" />
                                                Male
                                            </label>
                                            <label>
                                                <input type="radio" value="Female" v-model="registerUser.gender" />
                                                Female
                                            </label>
                                            <label>
                                                <input type="radio" value="Other" v-model="registerUser.gender" />
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                    <!-- <div class="col-md-3 my-1">
                                        <li class="list-group-item mb-3">
                                            <span>Religion :</span>
                                            <input class="form-control" v-model="registerUser.religion"
                                                style="float: right" placeholder="Religion" />
                                        </li>
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <li class="list-group-item mb-3">
                                            <span>Caste :</span>
                                            <input class="form-control" v-model="registerUser.caste"
                                                style="float: right" placeholder="Caste" />
                                        </li>
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>Sub Caste :</span>
                                        <input class="form-control" v-model="registerUser.subcaste" style="float: right"
                                            placeholder="Subcaste" />
                                    </div> -->
                                    <div class="col-md-3 my-1">
                                        <span>State :</span>
                                        <select class="form-select" id="state" v-model="registerUser.state"
                                            @change="updateDistricts">
                                            <option value="" disabled selected>Select a state</option>
                                            <option v-for="state in states" :key="state.name" :value="state.name">
                                                {{ state.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>District :</span>
                                        <select id="district" class="form-select" v-model="registerUser.district"
                                            :disabled="!districts.length">
                                            <option value="" disabled selected>Select a district</option>
                                            <option v-for="district in districts" :key="district" :value="district">
                                                {{ district }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>City :</span>
                                        <input class="form-control" style="float: right" v-model="registerUser.city"
                                            placeholder="City" />
                                    </div>
                                    <div class="col-md-3 my-1">
                                        <span>Pincode :</span>
                                        <input class="form-control" style="float: right" v-model="registerUser.pincode"
                                            placeholder="Pincode" />
                                    </div>
                                    <div class="col-md-12 my-1">
                                        <span>Address :</span>
                                        <textarea name="" id="" class="form-control" v-model="registerUser.address"
                                            placeholder="Address"></textarea>
                                    </div>
                                </div>
                                <button v-on:click="submitProfile()" class="button p-0 my-2">
                                    UPDATE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";

export default {
    name: "Profile",
    components: {
        VueDatePicker,
    },

    data() {
        return {
            dob_user: "",
            user: this.$store.getters.user,
            data: [],
            emailId: "",
            mobileNo: "",
            userName: "",
            updated: false,
            registerUser: {
                name: "",
                email: "",
                dob: "",
                religion: '',
                caste: '',
                subcaste: '',
                address: '',
                state: '',
                district: '',
                city: '',
                pincode: '',
                gender: 'Male',
            },
            convertedDate: {
                year: "",
                month: "",
                date: "",
            },
            jsonData: {
                India: {
                    states: [
                        {
                            "name": "Andhra Pradesh",
                            "districts": [
                                "Anantapur",
                                "Chittoor",
                                "East Godavari",
                                "Guntur",
                                "Krishna",
                                "Kurnool",
                                "Nellore",
                                "Prakasam",
                                "Srikakulam",
                                "Visakhapatnam",
                                "Vizianagaram",
                                "West Godavari",
                                "YSR Kadapa"
                            ]
                        },
                        {
                            "name": "Arunachal Pradesh",
                            "districts": [
                                "Tawang",
                                "West Kameng",
                                "East Kameng",
                                "Papum Pare",
                                "Kurung Kumey",
                                "Kra Daadi",
                                "Lower Subansiri",
                                "Upper Subansiri",
                                "West Siang",
                                "East Siang",
                                "Siang",
                                "Upper Siang",
                                "Lower Siang",
                                "Lower Dibang Valley",
                                "Dibang Valley",
                                "Anjaw",
                                "Lohit",
                                "Namsai",
                                "Changlang",
                                "Tirap",
                                "Longding"
                            ]
                        },
                        {
                            "name": "Assam",
                            "districts": [
                                "Baksa",
                                "Barpeta",
                                "Biswanath",
                                "Bongaigaon",
                                "Cachar",
                                "Charaideo",
                                "Chirang",
                                "Darrang",
                                "Dhemaji",
                                "Dhubri",
                                "Dibrugarh",
                                "Goalpara",
                                "Golaghat",
                                "Hailakandi",
                                "Hojai",
                                "Jorhat",
                                "Kamrup Metropolitan",
                                "Kamrup",
                                "Karbi Anglong",
                                "Karimganj",
                                "Kokrajhar",
                                "Lakhimpur",
                                "Majuli",
                                "Morigaon",
                                "Nagaon",
                                "Nalbari",
                                "Dima Hasao",
                                "Sivasagar",
                                "Sonitpur",
                                "South Salmara-Mankachar",
                                "Tinsukia",
                                "Udalguri",
                                "West Karbi Anglong"
                            ]
                        },
                        {
                            "name": "Bihar",
                            "districts": [
                                "Araria",
                                "Arwal",
                                "Aurangabad",
                                "Banka",
                                "Begusarai",
                                "Bhagalpur",
                                "Bhojpur",
                                "Buxar",
                                "Darbhanga",
                                "East Champaran (Motihari)",
                                "Gaya",
                                "Gopalganj",
                                "Jamui",
                                "Jehanabad",
                                "Kaimur (Bhabua)",
                                "Katihar",
                                "Khagaria",
                                "Kishanganj",
                                "Lakhisarai",
                                "Madhepura",
                                "Madhubani",
                                "Munger (Monghyr)",
                                "Muzaffarpur",
                                "Nalanda",
                                "Nawada",
                                "Patna",
                                "Purnia (Purnea)",
                                "Rohtas",
                                "Saharsa",
                                "Samastipur",
                                "Saran",
                                "Sheikhpura",
                                "Sheohar",
                                "Sitamarhi",
                                "Siwan",
                                "Supaul",
                                "Vaishali",
                                "West Champaran"
                            ]
                        },
                        {
                            "name": "Chandigarh (UT)",
                            "districts": [
                                "Chandigarh"
                            ]
                        },
                        {
                            "name": "Chhattisgarh",
                            "districts": [
                                "Balod",
                                "Baloda Bazar",
                                "Balrampur",
                                "Bastar",
                                "Bemetara",
                                "Bijapur",
                                "Bilaspur",
                                "Dantewada (South Bastar)",
                                "Dhamtari",
                                "Durg",
                                "Gariyaband",
                                "Janjgir-Champa",
                                "Jashpur",
                                "Kabirdham (Kawardha)",
                                "Kanker (North Bastar)",
                                "Kondagaon",
                                "Korba",
                                "Korea (Koriya)",
                                "Mahasamund",
                                "Mungeli",
                                "Narayanpur",
                                "Raigarh",
                                "Raipur",
                                "Rajnandgaon",
                                "Sukma",
                                "Surajpur  ",
                                "Surguja"
                            ]
                        },
                        {
                            "name": "Dadra and Nagar Haveli (UT)",
                            "districts": [
                                "Dadra & Nagar Haveli"
                            ]
                        },
                        {
                            "name": "Daman and Diu (UT)",
                            "districts": [
                                "Daman",
                                "Diu"
                            ]
                        },
                        {
                            "name": "Delhi (NCT)",
                            "districts": [
                                "Central Delhi",
                                "East Delhi",
                                "New Delhi",
                                "North Delhi",
                                "North East  Delhi",
                                "North West  Delhi",
                                "Shahdara",
                                "South Delhi",
                                "South East Delhi",
                                "South West  Delhi",
                                "West Delhi"
                            ]
                        },
                        {
                            "name": "Goa",
                            "districts": [
                                "North Goa",
                                "South Goa"
                            ]
                        },
                        {
                            "name": "Gujarat",
                            "districts": [
                                "Ahmedabad",
                                "Amreli",
                                "Anand",
                                "Aravalli",
                                "Banaskantha (Palanpur)",
                                "Bharuch",
                                "Bhavnagar",
                                "Botad",
                                "Chhota Udepur",
                                "Dahod",
                                "Dangs (Ahwa)",
                                "Devbhoomi Dwarka",
                                "Gandhinagar",
                                "Gir Somnath",
                                "Jamnagar",
                                "Junagadh",
                                "Kachchh",
                                "Kheda (Nadiad)",
                                "Mahisagar",
                                "Mehsana",
                                "Morbi",
                                "Narmada (Rajpipla)",
                                "Navsari",
                                "Panchmahal (Godhra)",
                                "Patan",
                                "Porbandar",
                                "Rajkot",
                                "Sabarkantha (Himmatnagar)",
                                "Surat",
                                "Surendranagar",
                                "Tapi (Vyara)",
                                "Vadodara",
                                "Valsad"
                            ]
                        },
                        {
                            "name": "Haryana",
                            "districts": [
                                "Ambala",
                                "Bhiwani",
                                "Charkhi Dadri",
                                "Faridabad",
                                "Fatehabad",
                                "Gurgaon",
                                "Hisar",
                                "Jhajjar",
                                "Jind",
                                "Kaithal",
                                "Karnal",
                                "Kurukshetra",
                                "Mahendragarh",
                                "Mewat",
                                "Palwal",
                                "Panchkula",
                                "Panipat",
                                "Rewari",
                                "Rohtak",
                                "Sirsa",
                                "Sonipat",
                                "Yamunanagar"
                            ]
                        },
                        {
                            "name": "Himachal Pradesh",
                            "districts": [
                                "Bilaspur",
                                "Chamba",
                                "Hamirpur",
                                "Kangra",
                                "Kinnaur",
                                "Kullu",
                                "Lahaul &amp; Spiti",
                                "Mandi",
                                "Shimla",
                                "Sirmaur (Sirmour)",
                                "Solan",
                                "Una"
                            ]
                        },
                        {
                            "name": "Jammu and Kashmir",
                            "districts": [
                                "Anantnag",
                                "Bandipore",
                                "Baramulla",
                                "Budgam",
                                "Doda",
                                "Ganderbal",
                                "Jammu",
                                "Kargil",
                                "Kathua",
                                "Kishtwar",
                                "Kulgam",
                                "Kupwara",
                                "Leh",
                                "Poonch",
                                "Pulwama",
                                "Rajouri",
                                "Ramban",
                                "Reasi",
                                "Samba",
                                "Shopian",
                                "Srinagar",
                                "Udhampur"
                            ]
                        },
                        {
                            "name": "Jharkhand",
                            "districts": [
                                "Bokaro",
                                "Chatra",
                                "Deoghar",
                                "Dhanbad",
                                "Dumka",
                                "East Singhbhum",
                                "Garhwa",
                                "Giridih",
                                "Godda",
                                "Gumla",
                                "Hazaribag",
                                "Jamtara",
                                "Khunti",
                                "Koderma",
                                "Latehar",
                                "Lohardaga",
                                "Pakur",
                                "Palamu",
                                "Ramgarh",
                                "Ranchi",
                                "Sahibganj",
                                "Seraikela-Kharsawan",
                                "Simdega",
                                "West Singhbhum"
                            ]
                        },
                        {
                            "name": "Karnataka",
                            "districts": [
                                "Bagalkot",
                                "Ballari (Bellary)",
                                "Belagavi (Belgaum)",
                                "Bengaluru (Bangalore) Rural",
                                "Bengaluru (Bangalore) Urban",
                                "Bidar",
                                "Chamarajanagar",
                                "Chikballapur",
                                "Chikkamagaluru (Chikmagalur)",
                                "Chitradurga",
                                "Dakshina Kannada",
                                "Davangere",
                                "Dharwad",
                                "Gadag",
                                "Hassan",
                                "Haveri",
                                "Kalaburagi (Gulbarga)",
                                "Kodagu",
                                "Kolar",
                                "Koppal",
                                "Mandya",
                                "Mysuru (Mysore)",
                                "Raichur",
                                "Ramanagara",
                                "Shivamogga (Shimoga)",
                                "Tumakuru (Tumkur)",
                                "Udupi",
                                "Uttara Kannada (Karwar)",
                                "Vijayapura (Bijapur)",
                                "Yadgir"
                            ]
                        },
                        {
                            "name": "Kerala",
                            "districts": [
                                "Alappuzha",
                                "Ernakulam",
                                "Idukki",
                                "Kannur",
                                "Kasaragod",
                                "Kollam",
                                "Kottayam",
                                "Kozhikode",
                                "Malappuram",
                                "Palakkad",
                                "Pathanamthitta",
                                "Thiruvananthapuram",
                                "Thrissur",
                                "Wayanad"
                            ]
                        },
                        {
                            "name": "Lakshadweep (UT)",
                            "districts": [
                                "Agatti",
                                "Amini",
                                "Androth",
                                "Bithra",
                                "Chethlath",
                                "Kavaratti",
                                "Kadmath",
                                "Kalpeni",
                                "Kilthan",
                                "Minicoy"
                            ]
                        },
                        {
                            "name": "Madhya Pradesh",
                            "districts": [
                                "Agar Malwa",
                                "Alirajpur",
                                "Anuppur",
                                "Ashoknagar",
                                "Balaghat",
                                "Barwani",
                                "Betul",
                                "Bhind",
                                "Bhopal",
                                "Burhanpur",
                                "Chhatarpur",
                                "Chhindwara",
                                "Damoh",
                                "Datia",
                                "Dewas",
                                "Dhar",
                                "Dindori",
                                "Guna",
                                "Gwalior",
                                "Harda",
                                "Hoshangabad",
                                "Indore",
                                "Jabalpur",
                                "Jhabua",
                                "Katni",
                                "Khandwa",
                                "Khargone",
                                "Mandla",
                                "Mandsaur",
                                "Morena",
                                "Narsinghpur",
                                "Neemuch",
                                "Panna",
                                "Raisen",
                                "Rajgarh",
                                "Ratlam",
                                "Rewa",
                                "Sagar",
                                "Satna",
                                "Sehore",
                                "Seoni",
                                "Shahdol",
                                "Shajapur",
                                "Sheopur",
                                "Shivpuri",
                                "Sidhi",
                                "Singrauli",
                                "Tikamgarh",
                                "Ujjain",
                                "Umaria",
                                "Vidisha"
                            ]
                        },
                        {
                            "name": "Maharashtra",
                            "districts": [
                                "Ahmednagar",
                                "Akola",
                                "Amravati",
                                "Aurangabad",
                                "Beed",
                                "Bhandara",
                                "Buldhana",
                                "Chandrapur",
                                "Dhule",
                                "Gadchiroli",
                                "Gondia",
                                "Hingoli",
                                "Jalgaon",
                                "Jalna",
                                "Kolhapur",
                                "Latur",
                                "Mumbai City",
                                "Mumbai Suburban",
                                "Nagpur",
                                "Nanded",
                                "Nandurbar",
                                "Nashik",
                                "Osmanabad",
                                "Palghar",
                                "Parbhani",
                                "Pune",
                                "Raigad",
                                "Ratnagiri",
                                "Sangli",
                                "Satara",
                                "Sindhudurg",
                                "Solapur",
                                "Thane",
                                "Wardha",
                                "Washim",
                                "Yavatmal"
                            ]
                        },
                        {
                            "name": "Manipur",
                            "districts": [
                                "Bishnupur",
                                "Chandel",
                                "Churachandpur",
                                "Imphal East",
                                "Imphal West",
                                "Jiribam",
                                "Kakching",
                                "Kamjong",
                                "Kangpokpi",
                                "Noney",
                                "Pherzawl",
                                "Senapati",
                                "Tamenglong",
                                "Tengnoupal",
                                "Thoubal",
                                "Ukhrul"
                            ]
                        },
                        {
                            "name": "Meghalaya",
                            "districts": [
                                "East Garo Hills",
                                "East Jaintia Hills",
                                "East Khasi Hills",
                                "North Garo Hills",
                                "Ri Bhoi",
                                "South Garo Hills",
                                "South West Garo Hills ",
                                "South West Khasi Hills",
                                "West Garo Hills",
                                "West Jaintia Hills",
                                "West Khasi Hills"
                            ]
                        },
                        {
                            "name": "Mizoram",
                            "districts": [
                                "Aizawl",
                                "Champhai",
                                "Kolasib",
                                "Lawngtlai",
                                "Lunglei",
                                "Mamit",
                                "Saiha",
                                "Serchhip"
                            ]
                        },
                        {
                            "name": "Nagaland",
                            "districts": [
                                "Dimapur",
                                "Kiphire",
                                "Kohima",
                                "Longleng",
                                "Mokokchung",
                                "Mon",
                                "Peren",
                                "Phek",
                                "Tuensang",
                                "Wokha",
                                "Zunheboto"
                            ]
                        },
                        {
                            "name": "Odisha",
                            "districts": [
                                "Angul",
                                "Balangir",
                                "Balasore",
                                "Bargarh",
                                "Bhadrak",
                                "Boudh",
                                "Cuttack",
                                "Deogarh",
                                "Dhenkanal",
                                "Gajapati",
                                "Ganjam",
                                "Jagatsinghapur",
                                "Jajpur",
                                "Jharsuguda",
                                "Kalahandi",
                                "Kandhamal",
                                "Kendrapara",
                                "Kendujhar (Keonjhar)",
                                "Khordha",
                                "Koraput",
                                "Malkangiri",
                                "Mayurbhanj",
                                "Nabarangpur",
                                "Nayagarh",
                                "Nuapada",
                                "Puri",
                                "Rayagada",
                                "Sambalpur",
                                "Sonepur",
                                "Sundargarh"
                            ]
                        },
                        {
                            "name": "Puducherry (UT)",
                            "districts": [
                                "Karaikal",
                                "Mahe",
                                "Pondicherry",
                                "Yanam"
                            ]
                        },
                        {
                            "name": "Punjab",
                            "districts": [
                                "Amritsar",
                                "Barnala",
                                "Bathinda",
                                "Faridkot",
                                "Fatehgarh Sahib",
                                "Fazilka",
                                "Ferozepur",
                                "Gurdaspur",
                                "Hoshiarpur",
                                "Jalandhar",
                                "Kapurthala",
                                "Ludhiana",
                                "Mansa",
                                "Moga",
                                "Muktsar",
                                "Nawanshahr (Shahid Bhagat Singh Nagar)",
                                "Pathankot",
                                "Patiala",
                                "Rupnagar",
                                "Sahibzada Ajit Singh Nagar (Mohali)",
                                "Sangrur",
                                "Tarn Taran"
                            ]
                        },
                        {
                            "name": "Rajasthan",
                            "districts": [
                                "Ajmer",
                                "Alwar",
                                "Banswara",
                                "Baran",
                                "Barmer",
                                "Bharatpur",
                                "Bhilwara",
                                "Bikaner",
                                "Bundi",
                                "Chittorgarh",
                                "Churu",
                                "Dausa",
                                "Dholpur",
                                "Dungarpur",
                                "Hanumangarh",
                                "Jaipur",
                                "Jaisalmer",
                                "Jalore",
                                "Jhalawar",
                                "Jhunjhunu",
                                "Jodhpur",
                                "Karauli",
                                "Kota",
                                "Nagaur",
                                "Pali",
                                "Pratapgarh",
                                "Rajsamand",
                                "Sawai Madhopur",
                                "Sikar",
                                "Sirohi",
                                "Sri Ganganagar",
                                "Tonk",
                                "Udaipur"
                            ]
                        },
                        {
                            "name": "Sikkim",
                            "districts": [
                                "East Sikkim",
                                "North Sikkim",
                                "South Sikkim",
                                "West Sikkim"
                            ]
                        },
                        {
                            "name": "Tamil Nadu",
                            "districts": [
                                "Ariyalur",
                                "Chennai",
                                "Coimbatore",
                                "Cuddalore",
                                "Dharmapuri",
                                "Dindigul",
                                "Erode",
                                "Kanchipuram",
                                "Kanyakumari",
                                "Karur",
                                "Krishnagiri",
                                "Madurai",
                                "Nagapattinam",
                                "Namakkal",
                                "Nilgiris",
                                "Perambalur",
                                "Pudukkottai",
                                "Ramanathapuram",
                                "Salem",
                                "Sivaganga",
                                "Thanjavur",
                                "Theni",
                                "Thoothukudi (Tuticorin)",
                                "Tiruchirappalli",
                                "Tirunelveli",
                                "Tiruppur",
                                "Tiruvallur",
                                "Tiruvannamalai",
                                "Tiruvarur",
                                "Vellore",
                                "Viluppuram",
                                "Virudhunagar"
                            ]
                        },
                        {
                            "name": "Telangana",
                            "districts": [
                                "Adilabad",
                                "Bhadradri Kothagudem",
                                "Hyderabad",
                                "Jagtial",
                                "Jangaon",
                                "Jayashankar Bhoopalpally",
                                "Jogulamba Gadwal",
                                "Kamareddy",
                                "Karimnagar",
                                "Khammam",
                                "Komaram Bheem Asifabad",
                                "Mahabubabad",
                                "Mahabubnagar",
                                "Mancherial",
                                "Medak",
                                "Medchal",
                                "Nagarkurnool",
                                "Nalgonda",
                                "Nirmal",
                                "Nizamabad",
                                "Peddapalli",
                                "Rajanna Sircilla",
                                "Rangareddy",
                                "Sangareddy",
                                "Siddipet",
                                "Suryapet",
                                "Vikarabad",
                                "Wanaparthy",
                                "Warangal (Rural)",
                                "Warangal (Urban)",
                                "Yadadri Bhuvanagiri"
                            ]
                        },
                        {
                            "name": "Tripura",
                            "districts": [
                                "Dhalai",
                                "Gomati",
                                "Khowai",
                                "North Tripura",
                                "Sepahijala",
                                "South Tripura",
                                "Unakoti",
                                "West Tripura"
                            ]
                        },
                        {
                            "name": "Uttarakhand",
                            "districts": [
                                "Almora",
                                "Bageshwar",
                                "Chamoli",
                                "Champawat",
                                "Dehradun",
                                "Haridwar",
                                "Nainital",
                                "Pauri Garhwal",
                                "Pithoragarh",
                                "Rudraprayag",
                                "Tehri Garhwal",
                                "Udham Singh Nagar",
                                "Uttarkashi"
                            ]
                        },
                        {
                            "name": "Uttar Pradesh",
                            "districts": [
                                "Agra",
                                "Aligarh",
                                "Allahabad",
                                "Ambedkar Nagar",
                                "Amethi (Chatrapati Sahuji Mahraj Nagar)",
                                "Amroha (J.P. Nagar)",
                                "Auraiya",
                                "Azamgarh",
                                "Baghpat",
                                "Bahraich",
                                "Ballia",
                                "Balrampur",
                                "Banda",
                                "Barabanki",
                                "Bareilly",
                                "Basti",
                                "Bhadohi",
                                "Bijnor",
                                "Budaun",
                                "Bulandshahr",
                                "Chandauli",
                                "Chitrakoot",
                                "Deoria",
                                "Etah",
                                "Etawah",
                                "Faizabad",
                                "Farrukhabad",
                                "Fatehpur",
                                "Firozabad",
                                "Gautam Buddha Nagar",
                                "Ghaziabad",
                                "Ghazipur",
                                "Gonda",
                                "Gorakhpur",
                                "Hamirpur",
                                "Hapur (Panchsheel Nagar)",
                                "Hardoi",
                                "Hathras",
                                "Jalaun",
                                "Jaunpur",
                                "Jhansi",
                                "Kannauj",
                                "Kanpur Dehat",
                                "Kanpur Nagar",
                                "Kanshiram Nagar (Kasganj)",
                                "Kaushambi",
                                "Kushinagar (Padrauna)",
                                "Lakhimpur - Kheri",
                                "Lalitpur",
                                "Lucknow",
                                "Maharajganj",
                                "Mahoba",
                                "Mainpuri",
                                "Mathura",
                                "Mau",
                                "Meerut",
                                "Mirzapur",
                                "Moradabad",
                                "Muzaffarnagar",
                                "Pilibhit",
                                "Pratapgarh",
                                "RaeBareli",
                                "Rampur",
                                "Saharanpur",
                                "Sambhal (Bhim Nagar)",
                                "Sant Kabir Nagar",
                                "Shahjahanpur",
                                "Shamali (Prabuddh Nagar)",
                                "Shravasti",
                                "Siddharth Nagar",
                                "Sitapur",
                                "Sonbhadra",
                                "Sultanpur",
                                "Unnao",
                                "Varanasi"
                            ]
                        },
                        {
                            "name": "West Bengal",
                            "districts": [
                                "Alipurduar",
                                "Bankura",
                                "Birbhum",
                                "Burdwan (Bardhaman)",
                                "Cooch Behar",
                                "Dakshin Dinajpur (South Dinajpur)",
                                "Darjeeling",
                                "Hooghly",
                                "Howrah",
                                "Jalpaiguri",
                                "Kalimpong",
                                "Kolkata",
                                "Malda",
                                "Murshidabad",
                                "Nadia",
                                "North 24 Parganas",
                                "Paschim Medinipur (West Medinipur)",
                                "Purba Medinipur (East Medinipur)",
                                "Purulia",
                                "South 24 Parganas",
                                "Uttar Dinajpur (North Dinajpur)"
                            ]
                        }
                    ],
                },
            },
            states: [],
            districts: [],
            selectedState: "",
        };
    },

    mounted() {
        window.scrollTo(0, 0);
        this.getProfile();
        let storedMobileNumber = localStorage.getItem("mobileNumber");
        if (
            storedMobileNumber != null &&
            storedMobileNumber != "null" &&
            storedMobileNumber != "+919080706050"
        ) {
            this.$store.dispatch("setsignInMbl", true);
        }
        this.states = this.jsonData.India.states;
    },

    methods: {
        submitProfile() {
            let vm = this;
            const dateObject = new Date(this.registerUser.dob);
            this.convertedDate.year = dateObject.getFullYear();
            this.convertedDate.month = dateObject.getMonth() + 1;
            this.convertedDate.date = dateObject.getDate();
            vm.registerUser.dob =
                this.convertedDate.year +
                "-" +
                this.convertedDate.month +
                "-" +
                this.convertedDate.date;
            vm.registerUser.experiance = 0;
            vm.$store
                .dispatch("put", {
                    uri: "devotee/profile/update/",
                    data: vm.registerUser,
                })
                .then((response) => {
                    vm.$store.dispatch('success', 'Profile updated successfully.');
                    vm.$router.push('/profile');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getProfile() {
            let vm = this;
            let loader = this.$loading.show();
            vm.$store
                .dispatch("get", { uri: "devotee/profile/" })
                .then((response) => {
                    loader.hide();
                    let profile = Object.assign({}, response.data);
                    Object.keys(profile).forEach((key) => {
                        if (profile[key] === null) {
                            profile[key] = "";
                        }
                    });
                    vm.registerUser = profile;
                    if (vm.registerUser.state) {
                        const stateData = this.states.find(
                            (state) => state.name === this.registerUser.state
                        );
                        this.districts = stateData ? stateData.districts : [];
                    }
                })
                .catch((error) => {
                    loader.hide();
                    console.log(error);
                });
        },
        updateDistricts() {
            const stateData = this.states.find(
                (state) => state.name === this.registerUser.state
            );
            this.districts = stateData ? stateData.districts : [];
            this.registerUser.district = "";
        },
    },
};
</script>
