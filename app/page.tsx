import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between text-sm px-2 py-4">
        <Link className="text-lg font-bold" href="/login">
          Lodwire
        </Link>

        <nav className=" gap-4 hidden sm:flex">
          <Link className="font-semibold" href="/login">
            PERSONAL
          </Link>
          <Link className="font-semibold" href="/login">
            BUSINESS
          </Link>
          <Link className="font-semibold" href="/login">
            PARTNERS & DEVELOPERS
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link
            className="py-2 px-4 border border-blue-500 rounded-full"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="py-2 px-4 text-white bg-blue-500 rounded-full"
            href="/login"
          >
            Register
          </Link>
        </div>
      </div>

      <section className="bg-gray-400 py-8 text-white">
        <div className="max-w-lg mx-auto text-center space-y-8">
          <p className="text-3xl">
            MOVE YOUR MONEY AROUND THE WORLD WITH MOBILE WALLET AND
            SMART-TRANSACTS
          </p>
          <p>
            Just link your M-WALLET and smart-transacts accounts and enjoy a
            world of possibilities.
          </p>
          <p>Track The Payment Transfer To Check The Status Of Your Payment.</p>

          <Link
            className="px-12 py-4 bg-amber-200 rounded-full text-black font-semibold"
            href="/login"
          >
            Track Payment
          </Link>
          <p className="mt-4">
            Accept The Payment To Receive The Funds Instantly.
          </p>

          <Link
            className="px-12 py-4 bg-blue-500 rounded-full text-white font-semibold"
            href="/login"
          >
            Accept Payment
          </Link>
          <p className="mt-4">
            Cancel The Payment To Decline The Funds, And The Sender Will Be
            Refunded Immediately.{" "}
          </p>

          <Link
            className="px-12 py-4 bg-red-500 rounded-full text-white font-semibold"
            href="/login"
          >
            Cancel the Transfer
          </Link>
          <p className="mt-4">
            Cancel The Payment To Decline The Funds, And The Sender Will Be
            Refunded Immediately.{" "}
          </p>
        </div>
      </section>

      <section className="text-center max-w-lg mx-auto">
        <h2 className="text-3xl ">
          smart-transacts is for everyone who uses different cryptocurrency
          platforms.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="w-full space-y-4">
            <img
              className="w-full"
              src="https://lodwire.com/static/mainapp/images/logo.PNG"
              alt=""
            />
            <p className="font-semibold">Paxful</p>
            <p>
              Paxful Find out why we have more than 1M active accounts linked
              with smart-transacts.
            </p>

            <Link
              className="py-4 px-8 w-full rounded-full bg-black text-white"
              href="/login"
            >
              Link Account
            </Link>
          </div>

          <div className="w-full space-y-4">
            <img
              className="w-full"
              src="https://lodwire.com/static/mainapp/images/noonesimg.png"
              alt=""
            />
            <p className="font-semibold">Paxful</p>
            <p>
              Paxful Find out why we have more than 1M active accounts linked
              with smart-transacts.
            </p>
            <Link
              className="py-4 px-8 w-full rounded-full bg-green-400 text-white"
              href="/login"
            >
              Link Account
            </Link>
          </div>

          <div className="w-full space-y-4">
            <img
              className="w-full"
              src="https://lodwire.com/static/mainapp/images/bybit.png"
              alt=""
            />
            <p className="font-semibold">ByBit</p>
            <p>
              Paxful Find out why we have more than 1M active accounts linked
              with smart-transacts.
            </p>
            <Link
              className="py-4 px-8 w-full rounded-full bg-black text-white"
              href="/login"
            >
              Link Account
            </Link>
          </div>
          <div className="w-full space-y-4">
            <img
              className="w-full"
              src="https://lodwire.com/static/mainapp/images/localcoinsswap.jpeg"
              alt=""
            />
            <p className="font-semibold">LocalCoinsSwap</p>
            <p>
              Paxful Find out why we have more than 1M active accounts linked
              with smart-transacts.
            </p>
            <Link
              className="py-4 px-8 w-full rounded-full bg-blue-500 text-white"
              href="/login"
            >
              Link Account
            </Link>
          </div>
          <div className="w-full space-y-4">
            <img
              className="w-full"
              src="https://lodwire.com/static/mainapp/images/deriv.png"
              alt=""
            />
            <p className="font-semibold">Deriv</p>
            <p>
              Paxful Find out why we have more than 1M active accounts linked
              with smart-transacts.
            </p>
            <Link
              className="py-4 px-8 w-full rounded-full bg-red-400 text-white"
              href="/login"
            >
              Link Account
            </Link>
          </div>
          <div className="w-full space-y-4">
            <img
              className="w-full"
              src="https://lodwire.com/static/mainapp/images/coinbase.jpeg"
              alt=""
            />
            <p className="font-semibold">Coinbase</p>
            <p>
              Paxful Find out why we have more than 1M active accounts linked
              with smart-transacts.
            </p>
            <Link
              className="py-4 px-8 w-full rounded-full bg-blue-500 text-white"
              href="/login"
            >
              Link Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

