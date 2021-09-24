import React from "react";

import "./LandingPage.css";

function LandingPage() {
	return (
		<div>
			<header class="hero">
				<div class="container spacing">
					<h1 class="primary-title">
						Welcome to Keyboard Interrupt Web Dev Tutorials
					</h1>
					<p>
						Enjoy video lectures, code on the website itself without any
						hassles. Join our community now!
					</p>
					<a
						href="#"
						class="btn btn-primary"
						onClick={() => {
							console.log("redirecting to login");
							window.location = "/signup";
						}}
					>
						Signup now
					</a>
				</div>
			</header>

			<main>
				<section class="our-products">
					<div class="container">
						<h2 class="section-title">Our Features</h2>

						<article class="product shoe-red spacing">
							<img src="" alt="" class="product__image" />
							<h3 class="product__title">A Big Community</h3>
							<p class="product__description big-text">
								Learning with a community is one of the most important factors
								in improving as a programmer. Having a big supportive community
								speeds up your progress immensly. We have made a discord server
								and discord bots which will help you at every step of the way!
							</p>
						</article>

						<article class="product shoe-white shoe-left spacing">
							<img src="img/shoe-2.png" alt="" class="product__image" />
							<h3 class="product__title">Coding Video Lessons</h3>
							<p class="product__description big-text">
								Enjoy top quality video lessons here at our site. Different
								modules are created for different subtopics for easy navigation!
							</p>
						</article>

						<article class="product shoe-blue spacing">
							<img src="img/shoe-3.png" alt="" class="product__image" />
							<h3 class="product__title">Integrated Frontend IDE</h3>
							<p class="product__description big-text">
								Setting up a local development environment on your computer can
								be a hassle as it takes a lot of time. We have made an
								Integrated Frontend IDE on our website where you can code along
								without wasting time!
							</p>
						</article>
					</div>
				</section>
			</main>
			{/* <footer class="site-footer">
				<div class="container">
					<div class="row">
						<div class="col-sm-12 col-md-6">
							<h6>About</h6>
							<p class="text-justify">
								Keyboard_Interrupt Video Lessons is a place where you can learn
								to code fast. Our aim is to make the learning procedure fun and
								interesting. We have also made it easy for students to code by
								using our Integrated Frontend IDE. We have a huge community on
								discord ready to help you.
							</p>
						</div>
					</div>
					<hr />
				</div>
			</footer> */}
		</div>
	);
}

export default LandingPage;
