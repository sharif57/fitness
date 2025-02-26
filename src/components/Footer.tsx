import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#345C8C]">
        <div className="mx-auto max-w-screen-2xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="-mt-6">
              <p className="mt-6 max-w-md text-center leading-relaxed text-white/75 text-sm sm:max-w-xs sm:text-left">
                There are many variations of passag-es of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <p className="mt-6 max-w-md text-center leading-relaxed text-white/75 text-sm sm:max-w-xs sm:text-left">
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isnt anything .
              </p>

            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-white">Information</p>

                <ul className="mt-4 space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>


                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/workoutplan1"
                    >
                      Workout Plan
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/nutritionplan1"
                    >
                      Nutrition Plan
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/subscription1"
                    >
                      {" "}
                      Subscription{" "}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-white">Quick Link</p>

                <ul className="mt-4 space-y-4 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-white/75 transition hover:text-white/85"
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/terms"
                    >
                      {" "}
                      Terms & Conditions{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/trust"
                    >
                      {" "}
                      Trust & Safety{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-white/75 transition hover:text-white/85"
                      href="/faq"
                    >
                      {" "}
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* <div className="text-center sm:text-left">
                                <p className="text-lg font-medium text-white">Helpful Links</p>

                                <ul className="mt-8 space-y-4 text-sm">
                                    <li>
                                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> FAQs </a>
                                    </li>

                                    <li>
                                        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Support </a>
                                    </li>

                                    <li>
                                        <a
                                            className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                            href="#"
                                        >
                                            <span className="text-gray-700 transition group-hover:text-gray-700/75">
                                                Live Chat
                                            </span>

                                            <span className="relative flex size-2">
                                                <span
                                                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"
                                                ></span>
                                                <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-white">Contact</p>

                <ul className="mt-4 space-y-4 text-sm">
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-[#345C8C] bg-white p-[3px] rounded-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <span className="flex-1 text-white/75">
                        info@yourwebsite.com
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-[#345C8C] bg-white p-[3px] rounded-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                      <span className="flex-1 text-white/75">866-566-0261</span>
                    </a>
                  </li>

                  <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-[#345C8C] bg-white p-[3px] rounded-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <address className="-mt-0.5 flex-1 not-italic text-white/75">
                      2972 Westheimer Rd. Santa Ana
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 py-6">
          <div className="text-center">
            <p className="text-sm text-white text-center">
              Copyright © 2024  All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
