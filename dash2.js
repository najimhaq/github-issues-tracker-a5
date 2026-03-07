// JS - শুধু এটাই ব্যবহার করুন
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('data-card-all');
  container.innerHTML =
    '<span class="loading loading-spinner loading-lg mx-auto block col-span-full"></span>';

  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = '';
      data.data.forEach((issue) => {
        console.log(issue);
        const card = document.createElement('div');
        card.className =
          'card bg-base-100 shadow-xl p-5 border-t-4 border-t-primary hover:shadow-2xl';
        card.innerHTML = `
          <div class="flex flex-col justify-between h-full">
      <!-- Status & Priority -->
      <div class="flex justify-between items-start mb-4">
        <img src="./assets/Open-Status.png" alt="status" class="w-8 h-8" />
        <div
          class="badge badge-error gap-1 px-4 py-2 rounded-4xl text-sm font-medium"
        >
          ${issue.priority}
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
          The navigation menu doesn't collapse properly on mobile devices...
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
        `;
        container.appendChild(card);
      });
    })
    .catch(() => {
      container.innerHTML =
        '<p class="text-red-500 text-center col-span-full p-12">Data load হয়নি!</p>';
    });
});
