<template>
	<div class="About">
		<div class="responsive-container-block bigContainer">
			<div class="responsive-container-block Container bottomContainer">
				<div class="ultimateImg">
					<img class="mainImg" src="../assets/banners/ol.png" />
					<div class="purpleBox">
						<p class="purpleText" style="
                font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman',
                  serif;
              ">
							The access to remote temples, Virtual Puja and information about
							Kuladevata in this Devalaya App is Good.
						</p>
						<img class="stars"
							src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg" />
					</div>
				</div>
				<div class="allText bottomText">
					<p class="text-blk headingText">About Us</p>
					<p class="text-blk subHeadingText" style="
              font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman',
                serif;
            ">
						With Trust & Devotion
					</p>

					<p class="text-blk description" style="
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
                sans-serif;
              text-align: left;
            ">
						DEVALAYA is an innovative spiritual tech platform to fulfil the
						needs of Devotee & Pandit ji across the globe, We aim to bring local
						traditions into the global platform, so that the rituals and
						traditions are not lost in the backdrop of modern advancements and
						negligence .
						<br />
						<br />
						The true cultural heritage of India can be witnessed from the Indian
						Temples which are unique infusion of a high architectural elements
						forming the gracious outer appearance and the ‘garbha-griha’ or the
						‘womb chamber’, housing the deity of the temple. The very essence of
						a temple is believed to have developed from the ideology that all
						things are one and everything is associated. The Indian temples
						suggest contemplations, encouragement and further purification of
						mind and prompt the process of self-realisation in devotees; however
						the preferred process is left to the convention of individual
						devotees. It is to experience; this oneness with God and the
						blissful feeling, every Indian visited the temple of their choice
						and worshipped their deity.
					</p>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="section-title">
				<h1>Our Certificate's</h1>
			</div>
		</div>
		<div class="cardio">
			<div class="row" style="justify-content: flex-start">
				<div class="column">
					<div class="team-img">
						<img style="max-height: 250px" :src="require(`@/assets/DPIIT-CERTIFICATE.jpg`)"
							alt="Team Image" />
					</div>
				</div>
				<div class="column">
					<div class="team-img">
						<img :src="require(`@/assets/StartUP-Certificate.jpg`)" alt="Team Image" />
					</div>
				</div>
				<div class="column">
					<div class="team-img">
						<img style="border: 1px solid black; min-height: 200px"
							:src="require(`@/assets/elevate-Certificate.jpg`)" alt="Team Image" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.button {
	margin: 0px;
	width: 200px;
}

.About {
	background-color: #fde5d1;
}
</style>
