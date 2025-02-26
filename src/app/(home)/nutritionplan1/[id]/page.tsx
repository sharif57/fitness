/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import { ArrowUp, Sparkles, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Checkbox, Progress, Modal, Flex } from "antd";
import type { CheckboxProps } from "antd";
import Appointment from "@/components/Appointment";
import { IoMdShareAlt } from "react-icons/io";
import { useParams } from "next/navigation";
import { useNutritionDetailsQuery } from "@/redux/features/nutritionSlice";
import NutritionPlanDetails from "@/pages/NutritionPlan/NutritionPlanDetails";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useUserProfileQuery } from "@/redux/features/userSlice";

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const MealPlans: React.FC = () => {
  const params = useParams();
  const id = params?.id as string; // Get nutrition plan ID from URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in .env.local



  const { data, isLoading, error } = useNutritionDetailsQuery(id);
  const nutrition = data?.data?.nutrition;

  const {data:userData} = useUserProfileQuery()

  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you with your nutrition plan today?",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("Nutrition Data:", nutrition);
  }, [nutrition]);

  const fetchGPTResponse = async (message:string) => {
    try {

      
      const response = await fetch(`${API_BASE_URL}/api/v1/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
        },
        body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "system",
                    content: `You are a nutritionist. Answer queries related to ${nutrition?.title} ${userData?.data?.age} ${userData?.data?.gender}  ${userData?.data?.height} ${userData?.data?.weight}.`,
                  },
                  { role: "user", content: message },
                ],
              }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const {data} = await response.json();
      
    

      return data
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      return "Sorry, I couldn't process your request at the moment.";
    }
  };

 

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const gptResponse = await fetchGPTResponse(input);
    setMessages([
      ...messages,
      userMessage,
      { role: "assistant", content: gptResponse },
    ]);
  };

  const onKeyPress = (e:any) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission if inside a form
      handleSendMessage();
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Loading></Loading>
      </div>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load nutrition details.
      </p>
    );

  // Ensure correct image path
  const imageUrl = nutrition?.image?.startsWith("http")
    ? nutrition.image
    : `${API_BASE_URL}${nutrition?.image}`;

  return (
    <div>
      <div>
        <NutritionPlanDetails></NutritionPlanDetails>
      </div>
      <div className="container mx-auto lg:p-6 p-2 bg-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="lg:text-[40px] text-[20px] font-semibold mb-3">
                  {nutrition?.title}
                </h1>
                <p className="text-gray-500 text-[20px] font-normal mb-5 flex items-center gap-2">
                  <Star
                    size={24}
                    color="#FB953B"
                    strokeWidth={2.75}
                    absoluteStrokeWidth
                  />
                  {nutrition?.rating} ({nutrition?.reviewsCount} reviews)
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Sparkles
                  onClick={() => setOpenModal(true)}
                  className="size-6 cursor-pointer hover:text-blue-500"
                />
                <IoMdShareAlt
                  className="size-6 cursor-pointer hover:text-blue-500"
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: nutrition?.title,
                        text: "Check out this great meal plan!",
                        url: window.location.href,
                      });
                    } catch (err) {
                      console.log("Error sharing:", err);
                    }
                  }}
                />
              </div>
            </div>

            <img
              src={imageUrl}
              alt={nutrition?.title}
              className="w-full rounded-lg object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://cdn-icons-png.flaticon.com/128/236/236831.png")
              }
            />

            {/* Progress Bars - Nutritional Values */}
            <div className="p-6 flex flex-col items-center">
              <Flex
                wrap
                gap="small"
                className="w-full flex justify-between items-center relative"
              >
                {[
                  {
                    label: "Calories",
                    value: nutrition?.calories,
                    percent: (nutrition?.calories / 500) * 100,
                    color: "#01336F",
                  },
                  {
                    label: "Protein",
                    value: nutrition?.protein,
                    percent: (nutrition?.protein / 50) * 100,
                    color: "#B1DD34",
                  },
                  {
                    label: "Carbs",
                    value: nutrition?.carbohydrate,
                    percent: (nutrition?.carbohydrate / 100) * 100,
                    color: "#FED161",
                  },
                  {
                    label: "Fat",
                    value: nutrition?.fat,
                    percent: (nutrition?.fat / 100) * 100,
                    color: "#FEA4A4",
                  },
                  {
                    label: "Fiber",
                    value: nutrition?.fiber,
                    percent: (nutrition?.fiber / 30) * 100,
                    color: "#C7A8FF",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center relative p-4"
                  >
                    {/* Right Side Divider (Border) */}
                    {index !== 4 && (
                      <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 h-24 border-r-2 border-gray-400"></div>
                    )}
                    <Progress
                      type="circle"
                      percent={parseFloat(item.percent.toFixed(2))} // ✅ Ensures 2 decimal places
                      size={60}
                      strokeWidth={15}
                      strokeColor={{ "0%": item.color, "100%": item.color }}
                    />
                    <label className="mt-3 text-lg font-medium text-gray-700">
                      {item.label}
                    </label>
                  </div>
                ))}
              </Flex>
            </div>

            {/* Ingredients Section */}
            <div className="mt-6">
              <h2 className="text-[32px] font-medium mb-3">Ingredients</h2>
              <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {nutrition?.ingredients.map((ingredient:any, index:number) => (
                  <li key={index}>
                    <Checkbox onChange={onChange}>
                      <p className="text-[18px] font-normal text-[#333333]">
                        {ingredient}
                      </p>
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="mt-12">
              <h2 className="text-[32px] font-medium mb-3">Instructions</h2>
              <p className="text-gray-600">{nutrition?.instruction}</p>
            </div>
          </div>
          <div className="lg:w-[520px] mt-4 ">
            <div className="border  rounded-lg p-3">
              <h1 className="text-[24px] font-semibold mb-3">
                Related Recipes
              </h1>
              {/* <div className=""> */}
              {data?.data?.relatedNutritions?.map((plan:any) => (
                <Link key={plan.id} href={`/nutritionplan1/${plan._id}`}>
                  <div className="lg:flex gap-3 items-center border  my-5  p-3 rounded-lg shadow-sm">
                    <img
                      src={`${API_BASE_URL}${plan?.image}`}
                      alt={plan.title}
                      className="lg:w-[140px] w-full lg:h-[80px] h-[160px] rounded-md object-cover"
                    />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-md font-medium">{plan.title}</h3>
                        <span className="ml-auto text-[#545454] font-normal flex gap-2 items-center">
                          <Star
                            size={16}
                            color="#FB953B"
                            strokeWidth={2.75}
                            absoluteStrokeWidth
                            className=""
                          />{" "}
                          {plan.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {plan.instruction.slice(0, 100)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat with Nutritionist Modal */}
      {/* <div className="rounded-3xl">
        <Modal
          title="Chat with Nutritionist"
          centered
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
        >
          <div className="flex flex-col gap-4 h-[400px] overflow-y-auto">
            <div className="flex gap-2">
              <div className="bg-blue-100 p-3 rounded-lg max-w-[80%]">
                <p>
                  Hello! How can I help you with your nutrition plan today?{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p>I have some questions about {nutrition?.title}.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </Modal>
      </div> */}

      <div className="bg-[#EFEFEF]">
        <Modal
          title="AI"
          centered
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
        >
          <div className="flex flex-col gap-4 h-[400px] overflow-y-auto  p-3 ">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end " : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.role === "user"
                      ? "bg-[#01336F] text-white text-[16px] font-normal "
                      : "bg-[#EFEFEF] text-[#292D32] text-[16px] font-normal"
                  } p-3 rounded-lg max-w-[80%]`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div> */}

          {/* <div className="border-t pt-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Let's chat"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={handleSendMessage}
                className="flex-1"
              />
              <Button
                icon={<ExpandAltOutlined />}
                className="hover:bg-gray-100"
              />
              <Button
                // type="primary"
                color="default"
                variant="solid"
                icon={<ArrowUpOutlined />}
                onClick={handleSendMessage}
                className="bg-black"
              />
            </div>
          </div> */}

          <div className="relative w-full ">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // onPressEnter={handleSendMessage}
              onKeyDown={onKeyPress} // Handling Enter key press
              placeholder="Let’s chat"
              className="w-full px-4 py-3 rounded-full bg-white shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-600 placeholder-gray-400"
            />
            <div
              className="absolute inset-y-0  right-3 flex items-center space-x-2"
              onClick={handleSendMessage}
            >
              <button className="p-2 rounded-full text-black hover:bg-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button className="px-2 py-2 rounded-full bg-black text-white">
                <ArrowUp />
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <Appointment />
    </div>
  );
};

export default MealPlans;

// /* eslint-disable @next/next/no-img-element */

// "use client";

// import { Sparkles, Star } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { Checkbox, Progress, Modal, Flex } from "antd";
// import type { CheckboxProps } from "antd";
// import Appointment from "@/components/Appointment";
// import { IoMdShareAlt } from "react-icons/io";
// import { useParams } from "next/navigation";
// import { useNutritionDetailsQuery } from "@/redux/features/nutritionSlice";
// import NutritionPlanDetails from "@/pages/NutritionPlan/NutritionPlanDetails";
// import Link from "next/link";
// import Loading from "@/components/Loading";

// const onChange: CheckboxProps["onChange"] = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };

// const MealPlans: React.FC = () => {
//   const params = useParams();
//   const id = params?.id as string;
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
// const GPT_KEY = process.env.NEXT_PUBLIC_API_KEY_GPT_KEY;
// console.log(GPT_KEY)

//   const { data, isLoading, error } = useNutritionDetailsQuery(id);
//   const nutrition = data?.data?.nutrition;

//   const [openModal, setOpenModal] = useState(false);
// const [messages, setMessages] = useState([
//   { role: "assistant", content: "Hello! How can I help you with your nutrition plan today?" },
// ]);
// const [input, setInput] = useState("");

//   useEffect(() => {
//     console.log("Nutrition Data:", nutrition);
//   }, [nutrition]);

// const fetchGPTResponse = async (message) => {
//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${GPT_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: `You are a nutritionist. Answer queries related to ${nutrition?.title}.` },
//           { role: "user", content: message },
//         ],
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     if (!data.choices || data.choices.length === 0) {
//       throw new Error("Invalid GPT response format.");
//     }

//     return data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error fetching GPT response:", error);
//     return "Sorry, I couldn't process your request at the moment.";
//   }
// };

// console.log("GPT API Key:", GPT_KEY);

// const handleSendMessage = async () => {
//   if (!input.trim()) return;
//   const userMessage = { role: "user", content: input };
//   setMessages([...messages, userMessage]);
//   setInput("");

//   const gptResponse = await fetchGPTResponse(input);
//   setMessages([...messages, userMessage, { role: "assistant", content: gptResponse }]);
// };

//   if (isLoading) return <Loading />;
//   if (error) return <p className="text-center text-red-500">Failed to load nutrition details.</p>;

//   return (
//     <div>
//       <NutritionPlanDetails />
//       <div className="container mx-auto lg:p-6 p-2 bg-white">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-2/3">
//             <h1 className="text-[40px] font-semibold">{nutrition?.title}</h1>
//             <p className="text-gray-500 text-[20px] flex items-center gap-2">
//               <Star size={24} color="#FB953B" />
//               {nutrition?.rating} ({nutrition?.reviewsCount} reviews)
//             </p>
//             <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setOpenModal(true)}>
//               Chat with Nutritionist
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Chat Modal */}
//       <Modal title="Chat with Nutritionist" centered open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
//         <div className="flex flex-col gap-4 h-[400px] overflow-y-auto p-3">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//               <div className={`${msg.role === "user" ? "bg-gray-200" : "bg-blue-100"} p-3 rounded-lg max-w-[80%]`}>{msg.content}</div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex gap-2">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-2 border rounded-lg"
//           />
//           <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             Send
//           </button>
//         </div>
//       </Modal>
//       <Appointment />
//     </div>
//   );
// };

// export default MealPlans;
