// "use client";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Autocomplete from "react-google-autocomplete";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import CurrencyInput from "@/components/CurrencyInput";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function Register() {
//     const router = useRouter();

//     const [step, setStep] = useState(1);

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phoneNumber: "",
//         dateOfBirth: "",
//         gender: "",
//         workStatus: "",
//         workStatusOther: "",
//         loanType: "",
//         loanAmount: "",
//         loanAmountFormatted: "",
//         interestRate: 5,
//         repaymentMonths: "",
//         address: "",
//         latitude: null,
//         longitude: null,
//         idDocument: null,
//     });

//     const [loading, setLoading] = useState(false);
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const [countdown, setCountdown] = useState(60)
//     const [processStatus, setProcessStatus] = useState("Initializing...")


//     const goToStep2 = () => {
//         if (!form.name || !form.email || !form.password || !form.phoneNumber || !form.dateOfBirth || !form.gender || !form.workStatus || !form.loanType || !form.loanAmount || !form.loanAmountFormatted || !form.interestRate || !form.repaymentMonths) {
//             toast.error("Please fill all required fields");
//             return;
//         }
//         if (form.workStatus === "Others" && !form.workStatusOther) {
//             toast.error("Please specify your work status");
//             return;
//         }
//         setStep(2)
//     }

//     const submit = async () => {
//         if (loading) return;
//         setLoading(true);
//         setCountdown(60); // Reset countdown to start
//         setProcessStatus("Initializing application...");

//         try {
//             // 1. Register the account in the background
//             const res = await fetch("/api/auth/register", {
//                 method: "POST",
//                 body: JSON.stringify(form),
//                 headers: { "Content-Type": "application/json" }
//             });

//             if (!res.ok) {
//                 const data = await res.json();
//                 toast.error(data.error || "Registration failed");
//                 setLoading(false);
//                 return;
//             }

//             // 2. Start the 1-minute countdown logic
//             let secondsLeft = 60;
//             const interval = setInterval(async () => {
//                 secondsLeft -= 1;
//                 setCountdown(secondsLeft);

//                 // Update status messages based on time remaining
//                 if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
//                 else if (secondsLeft > 30) setProcessStatus("Checking credit eligibility...");
//                 else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
//                 else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");

//                 // 3. Logic to run ONLY when the timer finishes
//                 if (secondsLeft <= 0) {
//                     clearInterval(interval);
//                     setProcessStatus("Finalizing login...");

//                     try {
//                         // ✅ Perform Auto-login in the background
//                         const loginRes = await fetch("/api/auth/login", {
//                             method: "POST",
//                             body: JSON.stringify({
//                                 email: form.email,
//                                 password: form.password
//                             }),
//                             headers: { "Content-Type": "application/json" }
//                         });

//                         if (loginRes.ok) {
//                             // Success! Hide loader and show the modal
//                             setLoading(false);
//                             setShowSuccessModal(true);
//                         } else {
//                             // If auto-login fails, redirect to manual login
//                             toast.error("Account created, please login manually.");
//                             router.push("/login");
//                         }
//                     } catch (err) {
//                         console.error("Login error:", err);
//                         router.push("/login");
//                     }
//                 }
//             }, 1000);

//         } catch (error) {
//             toast.error("An error occurred during processing");
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <Navbar />
//             <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 pt-24 md:pt-24">

//                 <h1 className="text-2xl font-semibold text-center text-gray-800">
//                     Create an Evercrest Account
//                 </h1>
//                 {step === 1 && (
//                     <>
//                         <div className="space-y-4">
//                             {/* Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Full Name
//                                 </label>
//                                 <input
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     placeholder="John Doe"
//                                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     placeholder="example@email.com"
//                                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                 />
//                             </div>

//                             {/* Password */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     placeholder="••••••••"
//                                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Phone Number
//                                 </label>
//                                 <PhoneInput
//                                     country={'ph'} // Default country
//                                     value={form.phoneNumber}
//                                     onChange={(phone) => setForm({ ...form, phoneNumber: phone.replace(/\D/g, '') })}
//                                     // THE SEARCH SETTINGS
//                                     enableSearch={true}
//                                     disableSearchIcon={false}
//                                     searchPlaceholder="Search country..."
//                                     searchNotFound="No country found"

//                                     // STYLING TO MATCH YOUR TAILWIND FORM
//                                     containerClass="w-full"
//                                     inputClass="!w-full !h-[42px] !text-sm !rounded-lg !border-gray-300 focus:!ring-2 focus:!ring-blue-500"
//                                     buttonClass="!border-gray-300 !rounded-l-lg !bg-gray-50"
//                                     dropdownClass="!rounded-lg !shadow-lg"
//                                     // Styling to match your Tailwind design
//                                     containerStyle={{ width: '100%' }}
//                                     inputStyle={{
//                                         width: '100%',
//                                         height: '40px',
//                                         fontSize: '14px',
//                                         borderRadius: '8px',
//                                         borderColor: '#D1D5DB' // gray-300
//                                     }}
//                                     buttonStyle={{
//                                         backgroundColor: '#F9FAFB', // gray-50
//                                         borderTopLeftRadius: '8px',
//                                         borderBottomLeftRadius: '8px',
//                                         borderColor: '#D1D5DB'
//                                     }}
//                                     dropdownStyle={{
//                                         textAlign: 'left'
//                                     }}
//                                 />
//                             </div>

//                             {/* Age & Gender */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 {/* <div>
//                                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                                         Date of Birth
//                                     </label>
//                                     <input
//                                         type="date"
//                                         placeholder="DD/MM/YYYY"
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.dateOfBirth}
//                                         onChange={(e) => {
//                                             let value = e.target.value.replace(/\D/g, "");

//                                             if (value.length >= 3) {
//                                                 value = value.slice(0, 2) + "/" + value.slice(2);
//                                             }
//                                             if (value.length >= 6) {
//                                                 value = value.slice(0, 5) + "/" + value.slice(5, 9);
//                                             }
//                                             // Logic to handle the string input
//                                             setForm({ ...form, dateOfBirth: e.target.value });
//                                         }}
//                                     />
//                                 </div> */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                                         Date of Birth
//                                     </label>
//                                     <input
//                                         type="text" // Change from "date" to "text" for custom formatting
//                                         placeholder="DD/MM/YYYY"
//                                         maxLength="10" // Prevents infinite values
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         value={form.dateOfBirth}
//                                         onChange={(e) => {
//                                             let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

//                                             // Limit to 8 digits (DDMMYYYY)
//                                             if (value.length > 8) value = value.slice(0, 8);

//                                             // Add slashes
//                                             if (value.length >= 3 && value.length <= 4) {
//                                                 value = `${value.slice(0, 2)}/${value.slice(2)}`;
//                                             } else if (value.length >= 5) {
//                                                 value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
//                                             }

//                                             // Update the form with the formatted string 'value', NOT 'e.target.value'
//                                             setForm({ ...form, dateOfBirth: value });
//                                         }}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                                         Gender
//                                     </label>
//                                     <select
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                            bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         onChange={(e) => setForm({ ...form, gender: e.target.value })}
//                                     >
//                                         <option value="">Select</option>
//                                         <option value="male">Male</option>
//                                         <option value="female">Female</option>
//                                         <option value="other">Other</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Residential Address
//                                 </label>

//                                 <Autocomplete
//                                     apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//                                     onPlaceSelected={(place) => {
//                                         setForm({
//                                             ...form,
//                                             address: place.formatted_address,
//                                             latitude: place.geometry.location.lat(),
//                                             longitude: place.geometry.location.lng(),
//                                         });
//                                     }}
//                                     options={{
//                                         types: ["address"],
//                                         componentRestrictions: { country: "ng" }, // Nigeria
//                                     }}
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     placeholder="Enter your address"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Employment Status
//                                 </label>

//                                 <select
//                                     name="workStatus"
//                                     value={form.workStatus}
//                                     onChange={(e) =>
//                                         setForm({ ...form, workStatus: e.target.value })
//                                     }
//                                     className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     <option value="">Select employment status</option>
//                                     {["employed", "self-employed", "retired", "unemployed", "others"].map((status) => (
//                                         <option key={status} value={status}>
//                                             {status}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 {form.workStatus === "Others" && (
//                                     <input
//                                         className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
//                                         placeholder="Specify"
//                                         value={form.workStatusOther || ""}
//                                         onChange={(e) =>
//                                             setForm({ ...form, workStatusOther: e.target.value })
//                                         }
//                                     />
//                                 )}
//                             </div>


//                             <label className="block text-sm">
//                                 Loan Type
//                                 <select
//                                     name="loanType"
//                                     value={form.loanType}
//                                     onChange={(e) =>
//                                         setForm({ ...form, loanType: e.target.value })
//                                     }
//                                     className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     <option value="">Select loan type</option>
//                                     {[
//                                         "Personal Loan",
//                                         "Business Loan",
//                                         "Auto Loan",
//                                         "Home Loan",
//                                         "Debt Consolidation",
//                                         "Student Loan",
//                                     ].map((type) => (
//                                         <option key={type} value={type}>
//                                             {type}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </label>

//                             <div className=" space-y-3">

//                                 <CurrencyInput
//                                     label="Loan Amount"
//                                     min={10000}
//                                     value={form.loanAmountFormatted}
//                                     onChange={({ raw, formatted }) =>
//                                         setForm({
//                                             ...form,
//                                             loanAmount: raw,
//                                             loanAmountFormatted: formatted,
//                                         })
//                                     }
//                                 />

//                                 <div>
//                                     <label className="text-sm">Interest Rate</label>
//                                     <input
//                                         disabled
//                                         value="5%"
//                                         className="w-full border rounded-lg px-3 py-2 bg-gray-100"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="text-sm">Repayment Period (months)</label>
//                                     <input
//                                         type="number"
//                                         className="w-full border rounded-lg px-3 py-2"
//                                         onChange={(e) =>
//                                             setForm({ ...form, repaymentMonths: e.target.value })
//                                         }
//                                     />
//                                 </div>
//                                 <div className="mt-2 p-2 bg-green-50 rounded-lg text-green-700 font-medium">
//                                     Total Repayment:{" "}
//                                     <span>
//                                         ₱
//                                         {form.loanAmount && form.repaymentMonths
//                                             ? (
//                                                 form.loanAmount *
//                                                 (1 + form.interestRate / 100)
//                                             ).toLocaleString()
//                                             : " 0"}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <button
//                             onClick={goToStep2}
//                             className="w-full bg-blue-600 text-white py-2 rounded-lg"
//                         >
//                             Next
//                         </button>
//                     </>
//                 )}

//                 {step === 2 && (
//                     <>
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Government Issued ID
//                                 </label>
//                                 <input
//                                     type="file"
//                                     onChange={(e) =>
//                                         setForm({ ...form, idDocument: e.target.files[0] })
//                                     }
//                                     className="block w-full text-sm text-gray-600
//                        file:mr-4 file:py-2 file:px-4
//                        file:rounded-lg file:border-0
//                        file:text-sm file:font-semibold
//                        file:bg-gray-200 file:text-gray-700
//                        hover:file:bg-gray-300
//                        focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 />
//                             </div>

//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => setStep(1)}
//                                     className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition"
//                                 >
//                                     Back
//                                 </button>

//                                 <button
//                                     onClick={submit}
//                                     disabled={loading}
//                                     className={`flex-1 text-white font-medium py-2 rounded-lg transition
//                 ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
//                                 >
//                                     {loading ? "Submitting..." : "Submit"}
//                                 </button>
//                             </div>
//                         </div>

//                     </>
//                 )}
//             </div>
//             {/* Success Modal Overlay */}
//             {/* {showSuccessModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
//                     <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-up-center">
//                         <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
//                             <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                             </svg>
//                         </div>
//                         <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Approved!</h2>
//                         <p className="text-gray-600 mb-6">
//                             Great news! Your loan of <br />
//                             <span className="text-2xl font-bold text-blue-600">₱{form.loanAmountFormatted}</span> <br />
//                             has been successfully approved.
//                         </p>
//                         <button
//                             onClick={() => router.push("/dashboard")}
//                             className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all"
//                         >
//                             Enter Dashboard
//                         </button>
//                     </div>
//                 </div>
//             )} */}
//             {/* Loading Overlay (1 Minute Wait) */}
//             {loading && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm p-6">
//                     <div className="w-full max-w-sm text-center">
//                         <div className="relative flex items-center justify-center mb-6">
//                             <div className="h-20 w-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
//                             <span className="absolute text-sm font-bold text-blue-600">{countdown}s</span>
//                         </div>
//                         <h2 className="text-xl font-bold text-gray-800 mb-2">{processStatus}</h2>
//                         <p className="text-sm text-gray-500">Please do not close or refresh this page.</p>

//                         {/* Progress Bar */}
//                         <div className="mt-8 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
//                             <div
//                                 className="bg-blue-600 h-full transition-all duration-1000 ease-linear"
//                                 style={{ width: `${((60 - countdown) / 60) * 100}%` }}
//                             ></div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Success Modal */}
//             {showSuccessModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
//                     <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
//                         <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
//                             <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                             </svg>
//                         </div>
//                         <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Approved!</h2>
//                         <p className="text-gray-600 mb-8">
//                             Your loan application for <br />
//                             <span className="text-2xl font-bold text-blue-600">₱{form.loanAmountFormatted}</span> <br />
//                             has been successfully approved.
//                         </p>
//                         <button
//                             onClick={() => router.push("/dashboard")}
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95"
//                         >
//                             Proceed to Dashboard
//                         </button>
//                     </div>
//                 </div>
//             )}
//             <Footer />
//         </div>
//     );
// }

"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import CurrencyInput from "@/components/CurrencyInput";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        workStatus: "",
        workStatusOther: "",
        loanType: "",
        loanAmount: "",
        loanAmountFormatted: "",
        interestRate: 5,
        repaymentMonths: "",
        address: "",
        latitude: null,
        longitude: null,
        idDocument: null,
    });

    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [processStatus, setProcessStatus] = useState("Initializing application...");

    const goToStep2 = () => {
        const required = ['name', 'email', 'password', 'phoneNumber', 'dateOfBirth', 'gender', 'workStatus', 'loanType', 'loanAmount', 'repaymentMonths'];
        if (required.some(field => !form[field])) {
            toast.error("Please fill all required fields");
            return;
        }
        setStep(2);
    };

    const submit = async () => {
        if (loading) return;
        setLoading(true);
        setCountdown(60);
        setProcessStatus("Initializing application...");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                const data = await res.json();
                toast.error(data.error || "Registration failed");
                setLoading(false);
                return;
            }

            let secondsLeft = 60;
            const interval = setInterval(async () => {
                secondsLeft -= 1;
                setCountdown(secondsLeft);

                if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
                else if (secondsLeft > 30) setProcessStatus("Checking credit score...");
                else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
                else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");

                if (secondsLeft <= 0) {
                    clearInterval(interval);
                    try {
                        const loginRes = await fetch("/api/auth/login", {
                            method: "POST",
                            body: JSON.stringify({ email: form.email, password: form.password }),
                            headers: { "Content-Type": "application/json" }
                        });

                        if (loginRes.ok) {
                            setLoading(false);
                            setShowSuccessModal(true);
                        } else {
                            router.push("/login");
                        }
                    } catch (err) {
                        router.push("/login");
                    }
                }
            }, 1000);
        } catch (error) {
            toast.error("An error occurred during registration");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. REGISTRATION FORM (MAIN CONTENT) */}
            <main className="flex-grow py-12 px-4 bg-gray-50">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gray-900 p-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
                        <p className="text-gray-400 mt-2">Complete the form below to apply for your loan</p>
                    </div>

                    <div className="p-8 md:p-12">
                        {step === 1 ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, email: e.target.value })} value={form.email} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, password: e.target.value })} value={form.password} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                                        <PhoneInput country={'ph'} value={form.phoneNumber} onChange={(phone) => setForm({ ...form, phoneNumber: phone })} inputClass="!w-full !h-[50px] !border-gray-200 !rounded-xl !bg-gray-50" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Date of Birth</label>
                                        <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={form.dateOfBirth}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/\D/g, "").slice(0, 8);
                                                if (v.length >= 3 && v.length <= 4) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                                                else if (v.length >= 5) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4, 8)}`;
                                                setForm({ ...form, dateOfBirth: v });
                                            }} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Gender</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, gender: e.target.value })} value={form.gender}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Residential Address</label>
                                    <Autocomplete
                                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                                        onPlaceSelected={(place) => {
                                            setForm({
                                                ...form,
                                                address: place.formatted_address,
                                                latitude: place.geometry.location.lat(),
                                                longitude: place.geometry.location.lng(),
                                            });
                                        }}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Search your address"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Work Status</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, workStatus: e.target.value })} value={form.workStatus}>
                                            <option value="">Select Status</option>
                                            <option value="employed">Employed</option>
                                            <option value="self-employed">Self-Employed</option>
                                            <option value="unemployed">Unemployed</option>
                                            <option value="student">Student</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {form.workStatus === "other" && (
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Please Specify</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, workStatusOther: e.target.value })} value={form.workStatusOther} />
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Loan Type</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, loanType: e.target.value })} value={form.loanType}>
                                            <option value="">Select Loan Type</option>
                                            <option value="Personal Loan">Personal Loan</option>
                                            <option value="Salary Loan">Salary Loan</option>
                                            <option value="Business Loan">Business Loan</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <CurrencyInput
                                            label="Desired Loan Amount"
                                            value={form.loanAmountFormatted}
                                            onChange={({ raw, formatted }) => setForm({ ...form, loanAmount: raw, loanAmountFormatted: formatted })}
                                        />
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Repayment Period (Months)</label>
                                            <input type="number" placeholder="e.g. 12" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, repaymentMonths: e.target.value })} value={form.repaymentMonths} />
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-blue-100 flex justify-between items-center">
                                        <span className="text-sm font-semibold text-blue-800 uppercase">Total Repayment (5% Interest)</span>
                                        <span className="text-2xl font-black text-blue-600">₱{form.loanAmount ? (form.loanAmount * 1.05).toLocaleString() : "0"}</span>
                                    </div>
                                </div>

                                <button onClick={goToStep2} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
                                    Continue to ID Verification
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 py-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Final Step: ID Verification</h3>
                                    <p className="text-gray-500 mb-8">Please upload a clear photo of your government-issued ID.</p>
                                    
                                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                                        <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                            onChange={(e) => setForm({ ...form, idDocument: e.target.files[0] })} />
                                        <p className="mt-4 text-xs text-gray-400">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">Back</button>
                                    <button onClick={submit} disabled={loading} className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg transition-all active:scale-95">
                                        {loading ? "Processing..." : "Submit Application"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* 3. FOOTER */}
            <Footer />

            {/* --- MODALS AND OVERLAYS --- */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-6">
                    <div className="w-full max-w-sm text-center">
                        <div className="relative flex items-center justify-center mb-10">
                            <div className="h-24 w-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
                            <span className="absolute text-xl font-black text-blue-600">{countdown}s</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{processStatus}</h2>
                        <p className="text-gray-400 text-sm italic">Please do not close or refresh this page.</p>
                        <div className="mt-10 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-full transition-all duration-1000 ease-linear" style={{ width: `${((60 - countdown) / 60) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-white rounded-[40px] p-10 max-w-md w-full text-center shadow-2xl">
                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 text-green-600 text-5xl">✓</div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4">You're Approved!</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Your application for <span className="font-bold text-blue-600">₱{form.loanAmountFormatted}</span> has been successfully processed and approved.
                        </p>
                        <button onClick={() => router.push("/dashboard")} className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-black transition-all">
                            Access Your Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}