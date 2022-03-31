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
            <a class="nav-link troll" data-bs-toggle="tab" href="#video">Video</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="tab-content">
          <div class="tab-pane fade show active" id="about">
            <h5 class="card-title">Welcome to Rentzilla!</h5>
            <p class="card-text">
              Rentzilla is a super app that will help you manage all your rental
              properties, expenses, and keep up with the latest news!
            </p>
          </div>
          <div class="tab-pane fade" id="video">
            <h5 class="card-title">Lost? We got your back!</h5>
            <p class="card-text">View the video here</p>
            <iframe width="420" height="345" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&inline=1" allow='autoplay'></iframe>
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
  color: black !important
  }
</style>