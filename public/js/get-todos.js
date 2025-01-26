const parent = document.querySelector('.tasks');
const loader = document.querySelector('.status');

(async function () {
  try {
    loader.innerHTML = `<div class="text-gray-500">
          <i class="fa fa-circle-notch fa-spin"></i>
        </div>`;
    const req = await fetch('/todos');
    const data = await req.json();
    loader.innerHTML = null;
    if (data?.data?.length < 1) {
      parent.innerHTML = `<div class="my-3 w-full text-center text-sm text-gray-500 font-semibold">No Tasks</div>`;
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
            <button class="edit-action font-semibold duration-300 hover:text-[royalblue]" data-id=${
              e?.todo_id
            }>
              <i class="fa fa-edit"></i>
            </button>
            <button class="delete-action font-semibold duration-300 hover:text-red-500"  data-id=${
              e?.todo_id
            }>
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>`;
    });

    parent.innerHTML = _html.join(' ');
    await deleteHandler();
  } catch (error) {
    console.log(error);
  }
})();
