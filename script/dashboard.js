document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('data-card-all');
  container.innerHTML =
    '<span class="loading loading-spinner loading-lg mx-auto block"></span>';

  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = '';
      data.data.forEach((issue) => {
        const card = document.createElement('div');
        card.className =
          'w-full md:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 rounded-xl shadow p-4 md:p-6';
        card.innerHTML = `
          <div
          class="w-full md:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 rounded-xl shadow p-4 md:p-6"
        >
          <!-- Card Example -->
          <div
            class="card bg-base-100 shadow-xl compact md:normal p-4 md:p-5 border-t-4 border-t-success hover:shadow-2xl transition-all duration-200"
          >
            <div class="flex flex-col justify-between h-full">
              <!-- Status & Priority -->
              <div class="flex justify-between items-start mb-4">
                <img
                  src="./assets/Open-Status.png"
                  alt="status"
                  class="w-8 h-8"
                />
                <div
                  class="badge badge-error gap-1 px-4 py-2 rounded-4xl text-sm font-medium"
                >
                  High
                </div>
              </div>

              <!-- Title & Description -->
              <div class="grow mb-4">
                <h2
                  class="card-title text-base-content font-semibold text-base md:text-lg mb-3 line-clamp-2"
                >
                  Fix navigation menu on mobile devices
                </h2>
                <p class="text-sm text-base-content/70 mb-4 line-clamp-3">
                  The navigation menu doesn't collapse properly on mobile
                  devices...
                </p>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2">
                  <div
                    class="badge badge-error gap-1 px-4 py-2 rounded-4xl text-xs border-2 border-error/20"
                  >
                    <i class="ri-bug-line"></i> Bug
                  </div>
                  <div
                    class="badge badge-warning gap-1 px-4 py-2 rounded-4xl text-xs border-2 border-warning/20"
                  >
                    <i class="ri-remix-line"></i> Help wanted
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div class="divider divider-horizontal m-0 mb-3 opacity-50"></div>

              <!-- Footer -->
              <div class="text-xs text-base-content/60 space-y-0.5">
                <p>
                  #1 by
                  <span class="font-medium text-base-content">#john_doe</span>
                </p>
                <p>1/15/2024</p>
              </div>
            </div>
          </div>
          <!-- আরও cards এখানে যোগ করুন -->
        </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      container.innerHTML =
        '<p class="text-red-500 text-center">Error! আবার চেষ্টা করুন</p>';
      console.error(err);
    });
});
