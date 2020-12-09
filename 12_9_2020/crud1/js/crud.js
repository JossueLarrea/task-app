$(function () {
  let variable = false;
  obetenerTareas();

  $("#task-form").submit(function (e) {
    const datos = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: $("#taskId").val(),
    };

    let url = variable === false ? "insertar.php" : "modificar.php";
    $.post(url, datos, function (response) {
      console.log(response);
      obetenerTareas();
      $("#task-form").trigger("reset");
    });
    e.preventDefault();
  });

  function obetenerTareas() {
    $.ajax({
      url: "listar.php",
      type: "GET",
      success: function (response) {
        const tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `
                      <tr taskId="${task.id}">
                      <td>${task.id}</td>
                      <td>
                      <a href="#" class="task-item">
                        ${task.name} 
                      </a>
                      </td>
                      <td>${task.description}</td>
                      <td>
                        <button class="task-delete btn btn-danger">
                         Delete 
                        </button>
                      </td>
                      </tr>
                    `;
        });
        $("#tasks").html(template);
      },
    });
  }
  $(document).on("click", ".task-item", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("taskId");
    console.log(id);
  });
});
