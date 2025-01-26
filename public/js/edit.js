const dataBox = document.querySelector('.data-box');

async function e() {
  const id = window.location.pathname.split('/')[2];
  try {
    dataBox.innerHTML = `<div class=" my-3 text-gray-500 flex justify-center items-center">
          <i class="fa fa-circle-notch fa-spin"></i>
        </div>`;
    const req = await axios.get(`/todos/${id}`);

    if (req?.data?.data?.length < 1) {
      dataBox.innerHTML = `<div class="my-3 w-full text-center text-sm text-gray-500 font-semibold">Task Not Found</div>`;
      return;
    }
    let todo = req?.data.data[0].todo;
    dataBox.innerHTML = `<form class="w-[98%] mt-3 flex flex-col gap-3 items-center" data-id=${req?.data.data[0].todo_id}>
        <input
          type="text"          
          value="${todo}"  
          name="todo"
          required        
          class="w-full py-3 px-6 outline-0 bg-[#ECEEEF] rounded-md"
        />
        <button
          type="submit"
          class="submit-button w-full py-3 px-6 outline-0 bg-[royalblue] text-white rounded-md font-semibold"
        >
         Save
        </button>
      </form>`;
    updateTodo();
  } catch (error) {
    console.log(error);
    dataBox.innerHTML = `<div class=" my-3 text-red-500 text-center">
          There was an error!</i>
        </div>`;
  }
}

e();

//handle update
async function updateTodo() {
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      document.querySelector(
        '.process',
      ).innerHTML = `<i class="fa fa-circle-notch fa-spin"></i>`;
      const f = new FormData(e.target);
      const formData = Object.fromEntries(f.entries());
      const req = await axios.patch(
        `/change-task/${e.target.dataset.id}`,
        formData,
      );
      document.querySelector(
        '.process',
      ).innerHTML = ` <p class="text-green-500">Task Updated!</p>`;
    } catch (error) {
      document.querySelector(
        '.process',
      ).innerHTML = ` <p class="text-red-500">${
        error.message || 'Failed try again!'
      }</p>`;
    }
  });
}
