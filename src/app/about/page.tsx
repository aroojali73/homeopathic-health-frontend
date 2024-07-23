import { Navbar } from "@/components/navbar";
import AuthWrapper from "@/utils/authWrapper";

export default function About() {
  return (
    <AuthWrapper>
      <Navbar />
      <div className="flex flex-col bg-white py-12 mt-8 w-[80%] px-8 text-gray-500 rounded-xl md:px-auto m-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 text-gray-500 set-font-24">
            About Us
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 about-section set-padding-top-62">
          <div className="image-column">
            <div className="inner-column wow fadeInLeft">
              <figure className="image-1">
                <img src="/imgs/about-img.PNG" alt="" />
              </figure>
            </div>
          </div>
          <div className="">
            <p className="text-lg font-medium leading-6 text-gray-500 w-[95%] m-auto">
              Hi! I'm Arooj and I'm the creator of this application. Any issues, you come to me!
              At our homeopathic practice, we believe in the power of natural
              healing and holistic wellness. Founded with a passion for helping
              individuals achieve optimal health and vitality, this application is
              dedicated to providing personalised, compassionate care to each of
              our patients.
            </p>
            <p className="text-lg font-medium leading-6 text-gray-500 mt-6 w-[95%] m-auto">
              Homeopathy is a gentle, yet highly effective system of medicine
              that addresses the root cause of illness, rather than merely
              suppressing symptoms. Founded on the principle of "your condition, our solution..." 
              homeopathy stimulates the body's innate healing ability to
              restore balance and harmony on physical, mental, and emotional
              levels.
            </p>
            <p className="text-lg font-medium leading-6 text-gray-500 mt-6 w-[95%] m-auto">
              With the help of experienced homeopathic practitioners, our team is
              committed to delivering comprehensive, individualised treatment
              plans tailored to meet the unique needs of each patient. We take
              the time to listen, understand, and collaborate with you to
              develop a holistic health strategy that promotes long-term
              well-being.
            </p>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
