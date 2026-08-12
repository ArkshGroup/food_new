import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoImage } from "../../public/images";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 w-full dark:bg-gray-900 p-6">
      <section className="relative max-w-xl z-10  bg-white w-full  dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/40 shadow-lg rounded-2xl p-10 text-center backdrop-blur-md">
        <Image
          className="  mx-auto object-contain"
          src={LogoImage}
          alt="Arksh Food Logo"
          width={280}
          height={280}
        />

        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          404 — Page not found
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          We couldn’t find the page you’re looking for. It may have been moved
          or deleted.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg  bg-primary text-white font-medium hover:bg-blue-700 transition">
              Take me home
            </span>
          </Link>

          <Link href="/contact">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              Contact support
            </span>
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          If you typed the URL directly, double-check it and try again.
        </p>
      </section>
    </main>
  );
}
