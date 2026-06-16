import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [showPassword,
    setShowPassword] =
    useState(false);

 const register = async (e) => {

  e.preventDefault();

  try {

    console.log("1. Before API");

    const response =
      await api.post(
        "/auth/register",
        form
      );

    console.log("2. After API");
    console.log(response);

    toast.success(
      "OTP Sent To Email"
    );

    console.log("3. Before Navigate");

    navigate(
      "/verify-otp",
      {
        state: {
          email: form.email,
        },
      }
    );

    console.log("4. After Navigate");

  } catch (error) {

    console.log("REGISTER ERROR");
    console.log(error);
    console.log(error.response);

    toast.error(
      error.response?.data?.message ||
      "Registration Failed"
    );

  }

};

  return (

<div
className="
min-h-screen
grid
lg:grid-cols-2
bg-slate-950
relative
overflow-hidden
"
>

<div
className="
absolute
top-0
left-0
w-[500px]
h-[500px]
bg-purple-600/20
blur-[180px]
rounded-full
"
/>

<div
className="
absolute
bottom-0
right-0
w-[500px]
h-[500px]
bg-blue-600/20
blur-[180px]
rounded-full
"
/>

{/* LEFT SIDE */}

<div
className="
hidden
lg:flex
flex-col
justify-center
px-24
bg-gradient-to-br
from-purple-950
via-slate-950
to-slate-950
relative
z-10
"
>

<h1
className="
text-8xl
font-black
bg-gradient-to-r
from-purple-400
to-pink-400
bg-clip-text
text-transparent
"
>
XENO
</h1>

<p
className="
text-slate-400
text-2xl
mt-4
"
>
Start Growing With AI CRM
</p>

<div
className="
mt-16
space-y-8
"
>

<div>
<h3 className="text-xl font-bold">
🚀 Create Smart Campaigns
</h3>

<p className="text-slate-400 mt-2">
Reach customers with personalized communication.
</p>
</div>

<div>
<h3 className="text-xl font-bold">
🎯 AI Audience Targeting
</h3>

<p className="text-slate-400 mt-2">
Automatically find the highest converting audience.
</p>
</div>

<div>
<h3 className="text-xl font-bold">
📊 Deep Analytics
</h3>

<p className="text-slate-400 mt-2">
Track campaign performance in real-time.
</p>
</div>

<div>
<h3 className="text-xl font-bold">
🤖 AI Recommendations
</h3>

<p className="text-slate-400 mt-2">
Get growth suggestions powered by AI.
</p>
</div>

</div>

</div>

{/* RIGHT SIDE */}

<div
className="
flex
items-center
justify-center
p-8
relative
z-10
"
>

<form
onSubmit={register}
className="
w-full
max-w-md
bg-slate-900/80
backdrop-blur-xl
border
border-slate-800
rounded-3xl
p-10
shadow-2xl
"
>

<h2
className="
text-4xl
font-bold
"
>
Create Account ✨
</h2>

<p
className="
text-slate-400
mt-2
"
>
Register to start using Xeno CRM.
</p>

{/* NAME */}

<div className="mt-8">

<label
className="
text-slate-400
text-sm
"
>
Full Name
</label>

<input
type="text"
value={form.name}
onChange={(e) =>
setForm({
...form,
name:
e.target.value,
})
}
placeholder="Enter your name"
className="
w-full
mt-2
bg-slate-800/80
border
border-slate-700
focus:border-purple-500
outline-none
p-4
rounded-xl
transition
"
/>

</div>

{/* EMAIL */}

<div className="mt-5">

<label
className="
text-slate-400
text-sm
"
>
Email Address
</label>

<input
type="email"
value={form.email}
onChange={(e) =>
setForm({
...form,
email:
e.target.value,
})
}
placeholder="Enter your email"
className="
w-full
mt-2
bg-slate-800/80
border
border-slate-700
focus:border-purple-500
outline-none
p-4
rounded-xl
transition
"
/>

</div>

{/* PASSWORD */}

<div className="mt-5">

<label
className="
text-slate-400
text-sm
"
>
Password
</label>

<div className="relative">

<input
type={
showPassword
? "text"
: "password"
}
value={form.password}
onChange={(e) =>
setForm({
...form,
password:
e.target.value,
})
}
placeholder="Create password"
className="
w-full
mt-2
bg-slate-800/80
border
border-slate-700
focus:border-purple-500
outline-none
p-4
rounded-xl
transition
"
/>

<button
type="button"
onClick={() =>
setShowPassword(
!showPassword
)
}
className="
absolute
right-4
top-6
text-slate-400
"
>
{showPassword
? "🙈"
: "👁"}
</button>

</div>

</div>

<button
type="submit"
className="
w-full
mt-8
bg-gradient-to-r
from-purple-600
to-pink-600
hover:scale-105
transition-all
duration-300
py-4
rounded-xl
font-semibold
shadow-lg
"
>
Create Account
</button>

<p
className="
text-center
text-slate-400
mt-6
"
>

Already have an account?

<span
onClick={() =>
navigate("/login")
}
className="
text-purple-400
ml-2
cursor-pointer
hover:text-purple-300
"
>
Login
</span>

</p>

</form>

</div>

</div>

  );

}

export default Register;