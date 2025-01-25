//Refetch
async function Refetch() {
  try {
    const req = await fetch('/todos');
    const data = await req.json();
    if (data?.data?.length < 1) {
      document.querySelector(
        '.tasks',
      ).innerHTML = `<div class="my-3 w-full text-center text-sm text-gray-500 font-semibold">No Tasks</div>`;
      return;
    }
    const _html = data?.data?.map((e) => {
      return `<div
          class="w-full flex items-center justify-between gap-3 py-3 px-6 bg-[#ECEEEF] rounded-l-md"
        >
          <p class="${e?.completed ? 'line-through' : ''}">${e?.todo}</p>
          <div class="flex items-center gap-3">
            ${
              e?.completed
                ? ''
                : `<button class="update-action font-semibold duration-300 hover:text-[royalblue]" data-id=${e?.todo_id}>              <i class="fa fa-check"></i>            </button>`
            }
            <button class="font-semibold duration-300 hover:text-[royalblue]">
              <i class="fa fa-edit"></i>
            </button>
            <button class="delete-action font-semibold duration-300 hover:text-red-500"
                      data-id=${e?.todo_id}>
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>`;
    });

    document.querySelector('.tasks').innerHTML = _html.join(' ');
    await deleteHandler();
  } catch (error) {
    console.log(error);
  }
}

//Delete Todo
function deleteHandler() {
  document.querySelector('.tasks').addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-action');
    const updatebtn = e.target.closest('.update-action');

    //Delete Task
    if (deleteBtn) {
      (async function () {
        try {
          const res = await axios.delete(`/delete/${deleteBtn.dataset.id}`);
          await Refetch();
        } catch (error) {
          console.log(error);
          document.querySelector(
            '.status',
          ).innerHTML = `<p class="text-red-500">${
            error?.response?.data?.err || 'Failed!'
          }</p>`;
          setTimeout(() => {
            document.querySelector('.status').innerHTML = null;
          }, 2000);
        }
      })();
    }

    //Delete Task
    if (updatebtn) {
      (async function () {
        try {
          const res = await axios.patch(`/update/${updatebtn.dataset.id}`);
          await Refetch();
        } catch (error) {
          console.log(error);
          document.querySelector(
            '.status',
          ).innerHTML = `<p class="text-red-500">${
            error?.response?.data?.err || 'Failed!'
          }</p>`;
          setTimeout(() => {
            document.querySelector('.status').innerHTML = null;
          }, 2000);
        }
      })();
    }
  });
}

//Submit Todo
async function submitTodo() {
  const form = document.querySelector('.add-todo');
  const status = document.querySelector('.status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const formData = Object.fromEntries(f.entries());
    try {
      const res = await axios.post('/create', formData);

      status.innerHTML = `<p class="text-green-500">${
        res?.data?.msg || 'Success!'
      }</p>`;
      setTimeout(() => {
        status.innerHTML = null;
        e.target.reset();
      }, 2000);
      await Refetch();
    } catch (error) {
      status.innerHTML = `<p class="text-red-500">${
        error?.response?.data?.err || 'Failed!'
      }</p>`;
      setTimeout(() => {
        status.innerHTML = null;
      }, 2000);
    }
  });
}

//Exec
submitTodo();
