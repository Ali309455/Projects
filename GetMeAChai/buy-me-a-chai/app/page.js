import Link from "next/link";

export default function Home() {
  return (
    <>

      {/* Hero */}
      <div>
        <div className="Hero flex justify-center flex-col items-center pt-28 gap-3 pb-20">
          <div className="text-4xl font-bold text-white pb-6 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white ">Get Me A Chai!</h1>
            <span>
              <img src="/tea.gif" alt="tea" width={70} />
            </span>
          </div>
          <div className="text-lg text-white">
            <p>A crowdfunding platform for supporting content creators and artists.</p>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            ><Link href="/Login">
              Get Started!
            </Link>  
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
            <Link href="/About">
              learn More!
              </Link>
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-white opacity-35"></div>
      </div>

      {/* features */}
      <div className="flex flex-col justify-center items-center pt-12 w-full overflow-x-hidden pb-16">
        <div className="pb-16">
          <h2 className="text-3xl font-bold text-white ">Your Fans can buy you a Chai!</h2>
        </div>
        <div className="container w-full max-w-[65%] pb-10 flex justify-around ">
          <div className="flex flex-col items-center w-[33%]">
            <div>
              <img
                src="/man.gif"
                alt="man icon"
                width={88}
                className="bg-gray-500 p-2 rounded-full mb-4 max-w-full"
              />
            </div>
            <div className="text-white flex flex-col items-center">
              <span className="font-bold">Fans want to help</span>
              <span className="text-sm">
                you can support your favorite creator to get a Chai
              </span>
            </div>
          </div>
          <div className="item flex flex-col justify-between items-center">
            <img
              src="/coin.gif"
              alt="coin icon"
              width={88}
              className="bg-gray-500 p-2 rounded-full mb-4"
            />
            <div className="text-white flex flex-col items-center">
              <span className="font-bold">Fans want to help</span>
              <span className="text-sm">
                you can support your favorite creator to get a Chai
              </span>
            </div>
          </div>
          <div className="item flex flex-col justify-between items-center">
            <img
              src="/group.gif"
              alt="group icon"
              width={88}
              className="bg-gray-500 p-2 rounded-full mb-4"
            />
            <div className="text-white flex flex-col items-center">
              <span className="font-bold">Fans want to help</span>
              <span className="text-sm">
                you can support your favorite creator to get a Chai
              </span>
            </div>
          </div>
        </div>
        <div className="h-[2px] bg-white opacity-35 w-full"></div>
      </div>

      {/* learn More */}
      <div className="flex flex-col justify-center items-center pt-12 pb-10 w-full">
        <h2 className="text-3xl font-bold text-white pb-16">Learn More about us</h2>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/QtaorVNAwbI"
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      </div>
    </>
  );
}
export const metadata = {
  title: 'GetMeAChai',
}