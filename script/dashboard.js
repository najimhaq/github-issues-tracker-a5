let allIssues = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadIssues();
  setupFilters();
});

async function loadIssues() {
  const container = document.getElementById('data-card-all');

  container.innerHTML = `
  <div class="col-span-full flex justify-center py-10">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  `;

  const res = await fetch(
    'https://phi-lab-server.vercel.app/api/v1/lab/issues'
  );

  const { data } = await res.json();

  allIssues = data;

  renderIssues(allIssues);
}

function renderIssues(issues) {
  const container = document.getElementById('data-card-all');

  const cards = issues
    .map((issue) => {
      // Status Image
      const statusImg =
        issue.status === 'open'
          ? './assets/Open-Status.png'
          : './assets/Closed- Status .png';

      // Priority Color
      const priorityColor =
        {
          low: 'badge-success',
          medium: 'badge-warning',
          high: 'badge-error',
        }[issue.priority?.toLowerCase()] || 'badge-neutral';

      // Labels
      const labelsHTML = (issue.labels || [])
        .map((label) => {
          let color = 'badge-warning';
          let icon = 'ri-price-tag-3-line';

          if (label.toLowerCase() === 'bug') {
            color = 'badge-error';
            icon = 'ri-bug-line';
          }

          if (label.toLowerCase() === 'help wanted') {
            color = 'badge-warning';
            icon = 'ri-remix-line';
          }

          return `
          <div class="badge ${color} gap-1 px-4 py-2 rounded-4xl text-xs border-2">
            <i class="${icon}"></i> ${label}
          </div>
          `;
        })
        .join('');

      // Date
      const formattedDate = new Date(issue.createdAt).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
      );

      return `
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition">

        <div class="card-body">

          <!-- Status + Priority -->
          <div class="flex justify-between items-center">
            <img src="${statusImg}" class="w-8 h-8">

            <span class="badge ${priorityColor}">
              ${issue.priority}
            </span>
          </div>

          <!-- Title -->
          <h2 class="font-semibold text-lg mt-2">
            ${issue.title}
          </h2>

          <!-- Description -->
          <p class="text-sm opacity-70 line-clamp-2">
            ${issue.description}
          </p>

          <!-- Labels -->
          <div class="flex flex-wrap gap-2 mt-2">
            ${labelsHTML}
          </div>

          <!-- Footer -->
          <div class="text-xs opacity-60 mt-4 border-t pt-2">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${formattedDate}</p>
          </div>

        </div>

      </div>
      `;
    })
    .join('');

  container.innerHTML = cards;
}

function setupFilters() {
  const allBtn = document.getElementById('select-all');
  const openBtn = document.getElementById('select-open');
  const closeBtn = document.getElementById('select-close');

  allBtn.addEventListener('click', () => {
    setActive(allBtn);
    renderIssues(allIssues);
  });

  openBtn.addEventListener('click', () => {
    setActive(openBtn);
    const openIssues = allIssues.filter((issue) => issue.status === 'open');
    renderIssues(openIssues);
  });

  closeBtn.addEventListener('click', () => {
    setActive(closeBtn);
    const closedIssues = allIssues.filter((issue) => issue.status === 'closed');
    renderIssues(closedIssues);
  });
}
//button toggle
function setActive(activeBtn) {
  const buttons = document.querySelectorAll('#btn-group button');

  buttons.forEach((btn) => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });

  activeBtn.classList.remove('btn-outline');
  activeBtn.classList.add('btn-primary');
}
