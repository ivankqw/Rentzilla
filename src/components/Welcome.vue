<template>
  <div class="col h-100 m-3">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              class="nav-link active troll"
              data-bs-toggle="tab"
              aria-current="true"
              href="#about"
              >About</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link troll" data-bs-toggle="tab" href="#video"
              >Video</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="tab-content">
          <div class="tab-pane fade show active" id="about">
            <h2 class="card-title"> <strong> Welcome to Rentzilla! </strong> 🦖🛖</h2>
            <div class="container"> 
            <div class="card-text" style="font-size: 20px">
              <img src="../assets/party_dino.png">
              <br>
              Rentzilla is a super app that will help you manage all your <br>
              <strong> rental properties 🏠</strong>, 
              <strong> expenses 💸</strong>, <strong> rents 🤑</strong>, and
              keep up with the <strong> latest news 📰</strong>! <br /><br />
            </div>
            </div>
          </div>
          <div class="tab-pane fade" id="video">
            <h5 class="card-title">Lost? We got your back!</h5>
            <p class="card-text">View the video here</p>
            <iframe
              width="420"
              height="345"
              src="https://youtube.com/embed/boxuHrJ5YYQ?autoplay=1&inline=1"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style>
a.nav-link.troll {
  color: black !important;
}
.carousel .carousel-item {
  height: 500px;
}
.carousel-item img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>