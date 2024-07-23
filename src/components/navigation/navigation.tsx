import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/authSlice";

import "./navigation.css";

export default function Navigation() {
  const user = useSelector(selectUser);

  return (
    <>
      <div className="nav-container set-container-92">
        {user?.role !== "admin" && (
          <div className="set-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="nav-btn mt-12">
                <Link href="/about">
                  {/* <img src="/imgs/about-us.jpeg" alt="about-us" />
              <div className="label">About Us</div> */}
                  <div className="custom-card">
                    <div className="img-box">
                      <img src="/imgs/about-us.jpeg" />
                    </div>
                    <div className="custom-content">
                      <h2>About Us</h2>
                      <p>
                        Learn more about us, our mission, our values and the
                        team dedicated to making sure you have an amazing
                        experience everytime!
                      </p>
                      <a>Read More</a>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="nav-btn mt-12">
                <Link href="/contact">
                  <div className="custom-card">
                    <div className="img-box">
                      <img src="/imgs/contact-us.jpeg" alt="contact-us" />
                    </div>
                    <div className="custom-content">
                      <h2>Contact Us</h2>
                      <p>
                        Get in touch with us for any inquires, support or
                        feedback. We're always here to help!
                      </p>
                      <a>Read More</a>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="nav-btn mt-12">
                <Link href="/profile">
                  <div className="custom-card">
                    <div className="img-box">
                      <img src="/imgs/profile.jpeg" alt="profile" />
                    </div>
                    <div className="custom-content">
                      <h2>Profile</h2>
                      <p>
                        View and manage your personal information/health
                        records.
                      </p>
                      <a>Read More</a>
                    </div>
                  </div>
                </Link>
              </div>
              {/* <div className="nav-btn">
              <Link href="/contact">
                <img src="/imgs/contact-us.jpeg" alt="contact-us" />
                <div className="label">Contact Us</div>
              </Link>
            </div> */}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="nav-btn mt-12">
                <Link href="/auditlog">
                  <div className="custom-card">
                    <div className="img-box">
                      <img src="/imgs/history.jpeg" alt="history" />
                    </div>
                    <div className="custom-content">
                      <h2>History</h2>
                      <p>Access your previous treatment history with us.</p>
                      <a>Read More</a>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="nav-btn mt-12">
                <a
                  target="_blank"
                  href="https://www.google.com/maps/search/homeopathic+clinic"
                >
                  <div className="custom-card">
                    <div className="img-box">
                      <img
                        src="/imgs/clinic-near-you.jpeg"
                        alt="clinic-near-you"
                      />
                    </div>
                    <div className="custom-content">
                      <h2>Find Homeopathic Clinic Near You</h2>
                      <p>
                        Locate your nearest homeopathic clinic and get
                        directions for your visit!
                      </p>
                      <a>Read More</a>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="nav-btn">
        <Link href="/profile">
          <img src="/imgs/profile.jpeg" alt="profile" />
          <div className="label">Profile</div>
        </Link>
      </div> */}
      {/* <div className="nav-btn">
        <Link href="/auditlog">
          <img src="/imgs/history.jpeg" alt="history" />
          <div className="label">History</div>
        </Link>
      </div> */}
      {/* <div className="nav-btn">
        <a
          target="_blank"
          href="https://www.google.com/maps/search/homeopathic+clinic"
        >
          <img src="/imgs/clinic-near-you.jpeg" alt="clinic-near-you" />
          <div className="label">Find Homeopathic Clinic Near You</div>
        </a>
      </div> */}
      {/* SECTION */}
      <div className="">
        <div className="section bg">
          <div className="container">
            <h2 className="text-center set-font-24">
              Discover Natural Healing
            </h2>
            <h3 className="text-center mb-10">
              Embrace Natural Solutions for a Healthier Life.
            </h3>

            <div className="set-col two bg margin extrapad mt-10">
              <div className="set-left-right-cards">
                <div className="set-img-card-fixed">
                  <img src="/imgs/img-11.jpg" alt="" />
                </div>
                <div>
                  <h4 className="feature side">Remedies for Common Ailments</h4>
                  <small className="side-text">Common Ailments Remedies</small>
                  <p>
                    Find natural solutions for everyday health issues. Discover
                    effective remedies for better health.
                  </p>
                </div>
              </div>
            </div>

            <div className="set-col two bg margin extrapad mt-6">
              <div className="set-left-right-cards">
                <div className="set-img-card-fixed">
                  <img src="/imgs/img-22.jpg" alt="" />
                </div>
                <div>
                  <h4 className="feature side">Personalised Treatment Plans</h4>
                  <small className="side-text">Personalised Treatment</small>
                  <p>
                    Customised homeopathic plans tailored for you. Achieve
                    optimal health through personalised care.
                  </p>
                </div>
              </div>
            </div>

            <div className="set-col two bg margin extrapad mt-12">
              <div className="set-left-right-cards">
                <div className="set-img-card-fixed">
                  <img src="/imgs/img-33.jpg" alt="" />
                </div>
                <div>
                  <h4 className="feature side">Expert Consultations</h4>
                  <small className="side-text">
                    Homeopathic Expert Consultation
                  </small>
                  <p>
                    Connect with certified homeopathic practitioners. Get
                    professional advice for your health needs. Coming soon...
                  </p>
                </div>
              </div>
            </div>

            <div className="set-col two bg margin extrapad mt-6">
              <div className="set-left-right-cards">
                <div className="set-img-card-fixed">
                  <img src="/imgs/img-44.jpg" alt="" />
                </div>
                <div>
                  <h4 className="feature side">Holistic Wellness Tips</h4>
                  <small className="side-text">Holistic Wellness</small>
                  <p>
                    Learn about lifestyle changes for better health. Enhance
                    your well-being with holistic practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SECTION */}
      <div className="set-container">
        <section className="about-section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="image-column">
                <div className="inner-column wow fadeInLeft">
                  <div className="author-desc">
                    <h2>Natural Healing</h2>
                    <span>Holistic Care</span>
                  </div>
                  <figure className="image-1">
                    <img src="/imgs/Homeopathic.jpg" alt="" />
                  </figure>
                </div>
              </div>
              <div className="content-column">
                <div className="inner-column">
                  <div className="sec-title">
                    <span className="title">
                      Start Your Path to Natural Wellness
                    </span>
                    <h2>Your Homeopathic Journey</h2>
                  </div>
                  <div className="text">
                    Homeopathy offers a gentle and holistic approach to health
                    and wellness, focusing on treating the whole person rather
                    than just the symptoms. By understanding your unique needs
                    and lifestyle, homeopathic remedies can provide effective
                    solutions for a wide range of health issues. Whether you are
                    dealing with chronic conditions or seeking preventive care,
                    homeopathy can be a valuable addition to your health
                    regimen.
                  </div>
                  <div className="text">
                    Embarking on your homeopathic journey means committing to
                    natural and sustainable health practices. Our platform
                    connects you with experienced practitioners, provides
                    educational resources, and offers personalised treatment
                    plans to support your well-being. Discover the benefits of
                    homeopathy and take the first step towards a healthier, more
                    balanced life.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
