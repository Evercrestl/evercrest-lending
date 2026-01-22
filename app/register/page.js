// "use client";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Autocomplete from "react-google-autocomplete";
// import CurrencyInput from "@/components/CurrencyInput";

// export default function Register() {
//     const router = useRouter();

//     const [step, setStep] = useState(1);

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
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

//     // const calculateAge = (dob) => {
//     //     if (!dob) return 0;
//     //     const birthDate = new Date(dob);
//     //     const today = new Date();

//     //     let age = today.getFullYear() - birthDate.getFullYear();
//     //     const m = today.getMonth() - birthDate.getMonth();

//     //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     //         age--;
//     //     }

//     //     return age;
//     // };

//     const goToStep2 = () => {
//         if (!form.name || !form.email || !form.password || !form.dateOfBirth || !form.gender || !form.workStatus || !form.loanType || !form.loanAmount || !form.loanAmountFormatted || !form.interestRate || !form.repaymentMonths) {
//             toast.error("Please fill all required fields");
//             return;
//         }
//         if (form.workStatus === "Others" && !form.workStatusOther) {
//             toast.error("Please specify your work status");
//             return;
//         }
//         if (!form.dateOfBirth) {
//             toast.error("Date of birth is required");
//             return;
//         }

//         // const age = calculateAge(form.dateOfBirth);
//         // if (age < 18) {
//         //     toast.error("You must be at least 18 years old");
//         //     return;
//         // }
//         setStep(2)
//     }


//     // const submit = async () => {
//     //     if (loading) return;
//     //     setLoading(true);

//     //     try {
//     //         // 1. Register the account in the background immediately
//     //         const res = await fetch("/api/auth/register", {
//     //             method: "POST",
//     //             body: JSON.stringify(form),
//     //             headers: { "Content-Type": "application/json" }
//     //         });

//     //         if (!res.ok) {
//     //             const data = await res.json();
//     //             toast.error(data.error || "Registration failed");
//     //             setLoading(false);
//     //             return;
//     //         }

//     //         // 2. Start the 1-minute wait logic
//     //         let secondsLeft = 60;
//     //         const interval = setInterval(() => {
//     //             secondsLeft -= 1;
//     //             setCountdown(secondsLeft);

//     //             // Update status messages based on time remaining
//     //             if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
//     //             else if (secondsLeft > 30) setProcessStatus("Checking credit eligibility...");
//     //             else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
//     //             else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");
//     //             if (secondsLeft <= 0) clearInterval(interval);
//     //             setLoading(false);
//     //             setShowSuccessModal(true);
//     //         }, 1000);
//     //     } catch (error) {
//     //         toast.error("An error ocurred during processing")
//     //         setLoading(false);
//     //     }

//     //     // ✅ Auto-login
//     //     // const loginRes = await fetch("/api/auth/login", {
//     //     //     method: "POST",
//     //     //     body: JSON.stringify({
//     //     //         email: form.email,
//     //     //         password: form.password
//     //     //     }),
//     //     //     headers: { "Content-Type": "application/json" }
//     //     // });

//     //     // if (loginRes.ok) {
//     //     //     toast.success("Logged in!");
//     //     //     router.push("/dashboard");
//     //     // } else {
//     //     //     router.push("/login");
//     //     // }

//     //     setLoading(false);
//     // };

//     const submit = async () => {
//     if (loading) return;
//     setLoading(true);
//     setCountdown(60); // Reset countdown to start
//     setProcessStatus("Initializing application...");

//     try {
//         // 1. Register the account in the background
//         const res = await fetch("/api/auth/register", {
//             method: "POST",
//             body: JSON.stringify(form),
//             headers: { "Content-Type": "application/json" }
//         });

//         if (!res.ok) {
//             const data = await res.json();
//             toast.error(data.error || "Registration failed");
//             setLoading(false);
//             return;
//         }

//         // 2. Start the 1-minute countdown logic
//         let secondsLeft = 60;
//         const interval = setInterval(async () => {
//             secondsLeft -= 1;
//             setCountdown(secondsLeft);

//             // Update status messages based on time remaining
//             if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
//             else if (secondsLeft > 30) setProcessStatus("Checking credit eligibility...");
//             else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
//             else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");

//             // 3. Logic to run ONLY when the timer finishes
//             if (secondsLeft <= 0) {
//                 clearInterval(interval);
//                 setProcessStatus("Finalizing login...");

//                 try {
//                     // ✅ Perform Auto-login in the background
//                     const loginRes = await fetch("/api/auth/login", {
//                         method: "POST",
//                         body: JSON.stringify({
//                             email: form.email,
//                             password: form.password
//                         }),
//                         headers: { "Content-Type": "application/json" }
//                     });

//                     if (loginRes.ok) {
//                         // Success! Hide loader and show the modal
//                         setLoading(false);
//                         setShowSuccessModal(true);
//                     } else {
//                         // If auto-login fails, redirect to manual login
//                         toast.error("Account created, please login manually.");
//                         router.push("/login");
//                     }
//                 } catch (err) {
//                     console.error("Login error:", err);
//                     router.push("/login");
//                 }
//             }
//         }, 1000);

//     } catch (error) {
//         toast.error("An error occurred during processing");
//         setLoading(false);
//     }
// };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#9dc5f5] to-[#b3a6e8] px-4">
//             <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">

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

//                             {/* Age & Gender */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 {/* <div>
//                                     <label className="block text-sm font-medium text-gray-600 mb-1">
//                                         Age
//                                     </label>
//                                     <input
//                                         type="number"
//                                         min="18"
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         placeholder="25"
//                                         onChange={(e) => setForm({ ...form, age: e.target.value })}
//                                     />
//                                 </div> */}
//                                 <div>
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


//                             {/* Work Status */}
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                                     Employment Status
//                                 </label>

//                                 {["Employed", "Self Employed", "Retired", "Others"].map((status) => (
//                                     <label key={status} className="flex items-center gap-2 text-sm">
//                                         <input
//                                             type="radio"
//                                             name="workStatus"
//                                             value={status}
//                                             onChange={(e) =>
//                                                 setForm({ ...form, workStatus: e.target.value })
//                                             }
//                                         />
//                                         {status}
//                                     </label>
//                                 ))}

//                                 {form.workStatus === "Others" && (
//                                     <input
//                                         className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
//                                         placeholder="Specify"
//                                         onChange={(e) =>
//                                             setForm({ ...form, workStatusOther: e.target.value })
//                                         }
//                                     />
//                                 )}
//                             </div>  */}

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



//                             {/* <CurrencyInput
//                         label="Loan Amount"
//                         min={10000}
//                         value={form.loanAmountFormatted}
//                         onChange={({ raw, formatted }) =>
//                             setForm({
//                                 ...form,
//                                 loanAmount: raw,
//                                 loanAmountFormatted: formatted,
//                             })
//                         }
//                     /> */}

//                             <div className="p-4 space-y-3">
//                                 {/* <h3 className="font-semibold text-gray-700">Loan Calculator</h3> */}

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
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import CurrencyInput from "@/components/CurrencyInput";

const STORAGE_KEY = "evercrest_reg_draft";

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [processStatus, setProcessStatus] = useState("Initializing...");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
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

    // --- PERSISTENCE LOGIC ---
    
    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // We don't restore idDocument as files can't be stringified
                setForm(prev => ({ ...prev, ...parsed, idDocument: null }));
                // If they were on step 2, put them back there
                if (parsed.name) setStep(1); 
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
    }, []);

    // Save data to localStorage whenever form changes (except the file)
    useEffect(() => {
        const { idDocument, ...dataToSave } = form;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }, [form]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    // --- FORM ACTIONS ---

    const goToStep2 = () => {
        const required = ["name", "email", "password", "dateOfBirth", "gender", "workStatus", "loanType", "loanAmount", "repaymentMonths"];
        const missing = required.filter(f => !form[f]);

        if (missing.length > 0) {
            toast.error("Please fill all required fields");
            return;
        }
        if (form.workStatus === "Others" && !form.workStatusOther) {
            toast.error("Please specify your work status");
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

            // Start timer
            let secondsLeft = 60;
            const interval = setInterval(async () => {
                secondsLeft -= 1;
                setCountdown(secondsLeft);

                if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
                else if (secondsLeft > 30) setProcessStatus("Checking credit eligibility...");
                else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
                else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");

                if (secondsLeft <= 0) {
                    clearInterval(interval);
                    setProcessStatus("Finalizing login...");

                    try {
                        const loginRes = await fetch("/api/auth/login", {
                            method: "POST",
                            body: JSON.stringify({ email: form.email, password: form.password }),
                            headers: { "Content-Type": "application/json" }
                        });

                        if (loginRes.ok) {
                            // SUCCESS: Clear the draft storage now
                            localStorage.removeItem(STORAGE_KEY);
                            setLoading(false);
                            setShowSuccessModal(true);
                        } else {
                            toast.error("Account created, please login manually.");
                            router.push("/login");
                        }
                    } catch (err) {
                        router.push("/login");
                    }
                }
            }, 1000);

        } catch (error) {
            toast.error("An error occurred. Your data is saved.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#9dc5f5] to-[#b3a6e8] px-4 py-10">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 tracking-tight">
                    Create an Evercrest Account
                </h1>
                
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
                            <input
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="example@email.com"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={form.dateOfBirth}
                                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Gender</label>
                                <select
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={form.gender}
                                    onChange={(e) => handleChange("gender", e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Residential Address</label>
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
                                defaultValue={form.address}
                                options={{ types: ["address"], componentRestrictions: { country: "ph" } }}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Employment Status</label>
                            <select
                                value={form.workStatus}
                                onChange={(e) => handleChange("workStatus", e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="">Select status</option>
                                {["employed", "self-employed", "retired", "unemployed", "others"].map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            {form.workStatus === "others" && (
                                <input
                                    className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Please specify"
                                    value={form.workStatusOther}
                                    onChange={(e) => handleChange("workStatusOther", e.target.value)}
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Loan Type</label>
                            <select
                                value={form.loanType}
                                onChange={(e) => handleChange("loanType", e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="">Select loan type</option>
                                {["Personal Loan", "Business Loan", "Auto Loan", "Home Loan"].map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                            <CurrencyInput
                                label="Desired Loan Amount"
                                min={10000}
                                value={form.loanAmountFormatted}
                                onChange={({ raw, formatted }) =>
                                    setForm({ ...form, loanAmount: raw, loanAmountFormatted: formatted })
                                }
                            />

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Repayment (Months)</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    value={form.repaymentMonths}
                                    onChange={(e) => handleChange("repaymentMonths", e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                <span className="text-xs font-bold text-slate-500 uppercase">Total to Repay</span>
                                <span className="text-lg font-black text-green-600">
                                    ₱ {form.loanAmount && form.repaymentMonths
                                        ? (form.loanAmount * (1 + form.interestRate / 100)).toLocaleString()
                                        : "0"}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={goToStep2}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            Continue to Verification
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center">
                            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-tighter">
                                Government Issued ID
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleChange("idDocument", e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-[10px] text-slate-400 mt-4 leading-tight">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={submit}
                                disabled={loading}
                                className={`flex-1 text-white font-bold py-4 rounded-xl shadow-lg transition-all ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"}`}
                            >
                                {loading ? "Processing..." : "Submit Application"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* LOADING OVERLAY */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md p-6">
                    <div className="w-full max-w-sm text-center">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="h-24 w-24 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                            <span className="absolute text-xl font-black text-blue-600">{countdown}</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">{processStatus}</h2>
                        <p className="text-sm text-slate-400">Our system is reviewing your creditworthiness.<br/>Please do not leave this page.</p>
                        <div className="mt-10 w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                            <div className="bg-blue-600 h-full transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ width: `${((60 - countdown) / 60) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-500">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 text-green-600">
                            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Approved!</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">Great news! Your loan application for <br /><span className="text-2xl font-black text-blue-600">₱{form.loanAmountFormatted}</span><br />has been successfully approved.</p>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95"
                        >
                            Access Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

