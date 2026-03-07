let allIssues = [];
document.addEventListener('DOMContentLoaded', async () => {
  await loadIssues();
  setupFilters();
  setupSearch();
});

/* === fetch from api and load ui === */
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
  updateIssueCounts();

  renderIssues(allIssues);
}
/* === Counting Issues === */
function updateIssueCounts() {
  const total = allIssues.length;

  const openIssues = allIssues.filter(
    (issue) => issue.status === 'open'
  ).length;

  const closedIssues = allIssues.filter(
    (issue) => issue.status === 'closed'
  ).length;

  document.getElementById('total-count').innerText = `${total} Issues`;

  document.getElementById('open-count').innerText = openIssues;

  document.getElementById('close-count').innerText = closedIssues;
}
/* ===  */
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
      <div onclick="openModal(${issue.id})" class="card bg-base-100 shadow-lg border-t-4 border-t-[#00A96E] hover:shadow-xl transition">

        <div class="card-body">

          <!-- Status + Priority -->
          <div class="flex justify-between items-center">
            <img src="${statusImg}" class="w-8 h-8">

            <span class="badge ${priorityColor}">
              ${issue.priority}
            </span>
          </div>

          <!-- Title -->
          <h2 class="font-semibold text-lg mt-2 cursor-pointer">
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

//modal
function openModal(id) {
  const issue = allIssues.find((issue) => issue.id === id);

  document.getElementById('modal-title').innerText = issue.title;

  document.getElementById('modal-description').innerText = issue.description;

  document.getElementById('modal-author').innerText =
    'Opened by ' + issue.author;

  document.getElementById('modal-assignee').innerText = issue.author;

  document.getElementById('modal-date').innerText = new Date(
    issue.createdAt
  ).toLocaleDateString();

  document.getElementById('modal-priority').innerText =
    issue.priority.toUpperCase();

  // Status
  const statusBadge = document.getElementById('modal-status');

  statusBadge.className =
    issue.status === 'open' ? 'badge badge-success' : 'badge badge-neutral';

  statusBadge.innerText = issue.status === 'open' ? 'Opened' : 'Closed';

  // Labels 
  const labelsContainer = document.getElementById('modal-labels');

  labelsContainer.innerHTML = (issue.labels || [])
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
      <div class="badge ${color} gap-1 px-4 py-2">
        <i class="${icon}"></i> ${label}
      </div>
      `;
    })
    .join('');

  document.getElementById('issueModal').showModal();
}
//search with filter
function setupSearch() {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();

    const filteredIssues = allIssues.filter((issue) =>
      issue.title.toLowerCase().includes(searchText)
    );

    renderIssues(filteredIssues);
  });
}
