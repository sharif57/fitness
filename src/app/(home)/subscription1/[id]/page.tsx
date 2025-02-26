import React from "react";

const CheckoutForm = () => {
  return (
    <div className="container mx-auto lg:p-6 p-2 grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
      {/* Billing Details */}
      <div className="md:col-span-2  p-6">
        <h2 className="text-xl font-semibold mb-4">Billing Details Address</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-md px-3 py-2"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100">
                  +32
                </span>
                <input
                  id="phone"
                  type="tel"
                  className="w-full border rounded-r-md px-3 py-2"
                  placeholder="470123456"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="companyName">
              Company Name (Optional)
            </label>
            <input
              id="companyName"
              type="text"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Your company name..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="countryName">
              Country Name
            </label>
            <input
              id="countryName"
              type="text"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Your country here..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="streetName">
                Street Name<span className="text-red-500">*</span>
              </label>
              <input
                id="streetName"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Street Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="houseNumber">
                House Number<span className="text-red-500">*</span>
              </label>
              <input
                id="houseNumber"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="House Number"
              />
            </div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="postcode">
                Postcode<span className="text-red-500">*</span>
              </label>
              <input
                id="postcode"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Postcode"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="city">
                Town / City<span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="City"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className=" p-6">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="discountCode">
              Discount Code
            </label>
            <div className="flex">
              <input
                id="discountCode"
                type="text"
                className="w-full border rounded-l-md px-3 py-2"
                placeholder="Enter your code"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-md">
                APPLY
              </button>
            </div>
          </div>
          <div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Fortinet Package × 1</span>
                <span>$119</span>
              </li>
              <li className="flex justify-between">
                <span>Subtotal</span>
                <span>$119</span>
              </li>
              <li className="flex justify-between">
                <span>Discount</span>
                <span>-$11</span>
              </li>
          <hr />
              <li className="flex justify-between font-bold">
                <span>Total</span>
                <span>$283.39</span>
              </li>
            </ul>
          </div>
          <button className="w-full bg-[#01336F] text-white py-2 rounded-md ">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
