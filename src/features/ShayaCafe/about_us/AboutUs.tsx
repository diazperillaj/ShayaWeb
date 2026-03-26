import Navbar from "../sub_pages/Navbar";
import { NAV_ITEMS } from "../constants";

function AboutUs() {
  const go = (id: string) => {
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      10,
    );
  };

  return (
    <>
      <Navbar
        navShow={true}
        atTop={true}
        menuOpen={false}
        navItems={NAV_ITEMS}
        onNavigate={go}
        onToggleMenu={() => (console.log("toggle menu"), {})}
      />

      <div className="about-us-container">
        <h1>About Us</h1>
        <p>
          Welcome to Shaya Cafe! We are passionate about serving delicious food
          and providing a cozy atmosphere for our customers. Our menu features a
          variety of dishes made with fresh, locally sourced ingredients.
          Whether you're in the mood for a hearty breakfast, a light lunch, or a
          satisfying dinner, we have something for everyone. Our friendly staff
          is dedicated to making your dining experience enjoyable and memorable.
          Thank you for choosing Shaya Cafe, and we look forward to serving you
          soon!
        </p>
      </div>
    </>
  );
}

export default AboutUs;
