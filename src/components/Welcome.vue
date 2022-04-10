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
            <h5 class="card-title">Welcome to Rentzilla! 🦎🛖</h5>
            <div class="card-text">
              Rentzilla is a super app that will help you manage all your
              <strong> rental properties 🏠</strong>, <strong> expenses 💸</strong>,
              <strong> revenues 🤑</strong>, and keep up with the
              <strong> latest news 📰</strong>!
              <br><br>
              <div class="text-start">
                <ol class="list-group list-group-numbered">
                  <li class="list-group-item list-group-item-action">Add, delete, and edit your rental properties</li>
                  <li class="list-group-item list-group-item-action">Add, delete, and edit your expenses</li>
                  <li class="list-group-item list-group-item-action">Collect rent from tenants as recorded revenue</li>
                  <li class="list-group-item list-group-item-action">Read the latest news</li>
                  <li class="list-group-item list-group-item-action">Make your next move with data visualisation</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="video">
            <h5 class="card-title">Lost? We got your back!</h5>
            <p class="card-text">View the video here</p>
            <iframe
              width="420"
              height="345"
              src="https://www.youtube.com/embed/8_R-Tl5oQOw?autoplay=1&inline=1"
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