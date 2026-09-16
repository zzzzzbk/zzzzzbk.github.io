---
layout: page
title: Home
permalink: /
---

<!-- ============ 1. Intro / self-introduction ============ -->
<section class="intro">
  <div class="intro-photo">

    <!-- TO ADD YOUR PHOTO:
         1. Put your image file in the assets/img/ folder, e.g. assets/img/intro.jpg
         2. Delete the <div class="placeholder">...</div> block below.
         3. Delete the surrounding comment markers around the <img> line below to enable it.
         The image is shown uncropped at its natural proportions (e.g. a 9:16 portrait stays 9:16). -->

    <img class="intro-img" src="{{ '/assets/img/intro.jpg' | relative_url }}" alt="Bokun Zheng">

    <!-- <div class="placeholder">
      Portrait photo (9:16)
      <small>[replace with an image — see the comment in this file]</small>
    </div> -->

  </div>
  <div class="intro-text">
    <p class="intro-hi">Hi, I'm</p>
    <h1 class="intro-name">Bokun Zheng</h1>
    <p class="intro-role">Mechanical Engineer · Robotics &amp; Simulation</p>
    <p>
      I'm a mechanical engineer who develops <strong>computational tools and methods</strong>
      to study comparative motion between robots and animals: building the models, simulations,
      and pipelines that turn how living systems move into engineering insight. 
      <br>
      My work spans
      <strong>numerical methods/physics simulation</strong>,
      <strong>contact-rich soft manipulation</strong>,
      <strong>biomechanics/muscle actuation</strong>, and
      <strong>3D reconstruction/motion capture</strong>.
    </p>
    <p class="intro-links">
      <a href="{{ '/research/' | relative_url }}">Research →</a>
      <a href="{{ '/projects/' | relative_url }}">Projects →</a>
      <a href="https://github.com/zzzzzbk">GitHub →</a>
      <a href="https://www.linkedin.com/in/bokunz/">LinkedIn →</a>
    </p>
  </div>
</section>

<!-- ============ 2. Education ============ -->
<section class="home-section">
  <h2 class="home-section-title">Education</h2>
  <div class="edu-list">

    <div class="edu-item">
      <div class="edu-top">
        <span><span class="edu-school">Virginia Tech</span> <span class="edu-loc">· Blacksburg, USA</span></span>
        <span class="edu-date">2027</span>
      </div>
      <p class="edu-degree">Ph.D. in Mechanical Engineering</p>
      <p class="edu-thesis">Thesis: <em>Bioinspiration from octopus: Biomechanics, Modeling and Motion reconstruction</em></p>
    </div>

    <div class="edu-item">
      <div class="edu-top">
        <span><span class="edu-school">Johns Hopkins University</span> <span class="edu-loc">· Baltimore, USA</span></span>
        <span class="edu-date">2021</span>
      </div>
      <p class="edu-degree">M.S. in Mechanical Engineering</p>
      <p class="edu-thesis">Thesis: <em>A Stochastic Dynamics Model of Beam Obstacle Traversal in Two Dimensions</em></p>
    </div>

    <div class="edu-item">
      <div class="edu-top">
        <span><span class="edu-school">Tianjin University</span> <span class="edu-loc">· Tianjin, China</span></span>
        <span class="edu-date">2018</span>
      </div>
      <p class="edu-degree">B.E. in Processing Equipment and Control Engineering</p>
      <p class="edu-thesis">Thesis: <em>Hydraulic Calculation of Compressed Air Foam System for Petrochemical Storage Tanks</em></p>
    </div>

  </div>
</section>

<!-- ============ 3. Research interests ============ -->
<section class="home-section">
  <h2 class="home-section-title">Research Interests</h2>
  <p class="home-section-lead">The threads that connect my work — from living systems to the robots they inspire.</p>
  <div class="interest-grid">

    <div class="interest-card">
      <div class="interest-icon">🐙</div>
      <h3>Bio-Inspired Robotics</h3>
      <p>Learning from octopuses, bats, and insects to design robots that move and adapt like living systems.</p>
    </div>

    <div class="interest-card">
      <div class="interest-icon">🦾</div>
      <h3>Soft Robotics</h3>
      <p>Continuum arms and compliant mechanisms with built-in "mechanical intelligence" for safe, dexterous manipulation.</p>
    </div>

    <div class="interest-card">
      <div class="interest-icon">🧠</div>
      <h3>Machine Learning &amp; AI</h3>
      <p>Deep learning, generative models, and dimensionality reduction to understand and control complex motion.</p>
    </div>

    <div class="interest-card">
      <div class="interest-icon">🎛️</div>
      <h3>Dynamics &amp; Control</h3>
      <p>Model predictive control, reinforcement learning, and motion planning for agile robotic systems.</p>
    </div>

    <div class="interest-card">
      <div class="interest-icon">🌊</div>
      <h3>Physics Simulation</h3>
      <p>High-fidelity, physics-based modeling — Cosserat rods, FEA, and multi-body dynamics — built from first principles.</p>
    </div>

    <div class="interest-card">
      <div class="interest-icon">👁️</div>
      <h3>Computer Vision &amp; 3D</h3>
      <p>Point-cloud reconstruction and motion capture to turn real-world movement into data-driven models.</p>
    </div>

  </div>
</section>
