import React from 'react'
import './AboutUs.css'
const AboutUs = () => {
  return (
    <div>
      <header class="hero">
        <div class="hero-overlay"></div>
        <h1>About Us</h1>
      </header>

      <div class="container">
        <p class="mission-statement">Exceptional coffee begins with exceptional equipment.</p>
        <div class="content">
            <h2>Our passion</h2>
          <p>Welcome to <span class="highlight">Perfect Brew</span>, where we’re dedicated to making every coffee moment exceptional. Founded with a passion for elevating the coffee experience, Brew offers premium specialty coffee tools for those who value quality and precision in every cup.</p>
            <h2>Our mission</h2>
          <p>At Brew, our mission is simple: to provide you with top-tier coffee equipment that turns your daily coffee ritual into a truly enjoyable part of your day. We believe great coffee shouldn’t just be a luxury—it should be a way of life, accessible and enjoyable every morning.</p>
            <h2>What We Offer</h2>
          <p>Whether you're a pour-over enthusiast or an espresso perfectionist, our curated line of equipment is crafted to meet the highest standards of coffee lovers. We’re here to help you <span class="highlight">make every morning better</span>, with coffee that’s brewed the way it’s meant to be—with <span class="highlight">Perfect Brew</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs