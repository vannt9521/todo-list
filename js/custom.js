$(document).ready(function(e) {
    AOS.init({
        duration: 1200
    });
    $(window).scroll(function() {
        AOS.init({
            duration: 1200
        });
    });
    function saveTasks() {
        let tasks = [];
        $('#task-list li').each(function() {
            tasks.push({
                text: $(this).text().replace("X", "").trim(),
                completed: $(this).hasClass('completed')
            });
        });
        document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
    }

    function loadTasks() {
        let cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
        if (cookie) {
            let tasks = JSON.parse(cookie.split('=')[1]);
            tasks.forEach(task => {
                let li = $('<li></li>').text(task.text);
                let btn = $('<button>X</button>').addClass('delete-task');
                li.append(btn);
                if (task.completed) {
                    li.addClass('completed');
                }
                $('#task-list').append(li);
            });
        }
    }

    loadTasks();

    $('#add-task').click(function() {
        let taskText = $('#task-input').val().trim();
        if (taskText !== "") {
            let li = $('<li></li>').text(taskText);
            let btn = $('<button>X</button>').addClass('delete-task');
            li.append(btn);
            $('#task-list').append(li);
            $('#task-input').val('');
            saveTasks();
        }
    });

    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('completed');
        saveTasks();
    });

    $('#task-list').on('click', '.delete-task', function(event) {
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
            saveTasks();
        });
        event.stopPropagation();
    });

    $('.task-filter button').click(function() {
        $('.task-filter button').removeClass('active');
        $(this).toggleClass('active');
        let filter = $(this).data('filter');
        $('#task-list li').each(function() {
            if (filter === 'all') {
                $(this).show();
            } else if (filter === 'pending' && !$(this).hasClass('completed')) {
                $(this).show();
            } else if (filter === 'completed' && $(this).hasClass('completed')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
})