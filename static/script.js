$(document).ready(function() {
    let todos = [];
    let currentFilter = 'all';
    
    const API_BASE = '/api/todos';
    
    // 初始化
    loadTodos();
    
    // 添加待办事项
    $('#add-btn').click(function() {
        addTodo();
    });
    
    // 回车键添加待办事项
    $('#todo-input').keypress(function(e) {
        if (e.which === 13) {
            addTodo();
        }
    });
    
    // 过滤器按钮
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        renderTodos();
    });
    
    // 加载所有待办事项
    function loadTodos() {
        showLoading(true);
        hideError();
        
        $.ajax({
            url: API_BASE,
            method: 'GET',
            success: function(data) {
                todos = data;
                renderTodos();
                updateStats();
                showLoading(false);
            },
            error: function(xhr, status, error) {
                showError('加载待办事项失败: ' + error);
                showLoading(false);
            }
        });
    }
    
    // 添加待办事项
    function addTodo() {
        const title = $('#todo-input').val().trim();
        if (!title) {
            showError('请输入待办事项内容');
            return;
        }
        
        $.ajax({
            url: API_BASE,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ title: title }),
            success: function(data) {
                $('#todo-input').val('');
                loadTodos(); // 重新加载列表
                hideError();
            },
            error: function(xhr, status, error) {
                showError('添加待办事项失败: ' + error);
            }
        });
    }
    
    // 更新待办事项状态
    function toggleTodo(id, completed) {
        $.ajax({
            url: `${API_BASE}/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ completed: completed }),
            success: function() {
                loadTodos();
                hideError();
            },
            error: function(xhr, status, error) {
                showError('更新待办事项失败: ' + error);
            }
        });
    }
    
    // 删除待办事项
    function deleteTodo(id) {
        if (!confirm('确定要删除这个待办事项吗？')) {
            return;
        }
        
        $.ajax({
            url: `${API_BASE}/${id}`,
            method: 'DELETE',
            success: function() {
                loadTodos();
                hideError();
            },
            error: function(xhr, status, error) {
                showError('删除待办事项失败: ' + error);
            }
        });
    }
    
    // 渲染待办事项列表
    function renderTodos() {
        const $todoList = $('#todo-list');
        $todoList.empty();
        
        let filteredTodos = todos;
        if (currentFilter === 'completed') {
            filteredTodos = todos.filter(todo => todo.completed);
        } else if (currentFilter === 'pending') {
            filteredTodos = todos.filter(todo => !todo.completed);
        }
        
        if (filteredTodos.length === 0) {
            $('#empty-state').show();
        } else {
            $('#empty-state').hide();
        }
        
        filteredTodos.forEach(function(todo) {
            const todoItem = createTodoElement(todo);
            $todoList.append(todoItem);
        });
        
        // 绑定事件
        $('.todo-checkbox').change(function() {
            const id = $(this).data('id');
            const completed = $(this).is(':checked');
            toggleTodo(id, completed);
        });
        
        $('.delete-btn').click(function() {
            const id = $(this).data('id');
            deleteTodo(id);
        });
    }
    
    // 创建待办事项元素
    function createTodoElement(todo) {
        const createdDate = new Date(todo.created_at).toLocaleString('zh-CN');
        const completedClass = todo.completed ? 'completed' : '';
        
        return $(`
            <li class="todo-item ${completedClass}">
                <div class="todo-content">
                    <input type="checkbox" class="todo-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${escapeHtml(todo.title)}</span>
                </div>
                <div class="todo-meta">
                    <span class="todo-date">${createdDate}</span>
                    <button class="delete-btn" data-id="${todo.id}">删除</button>
                </div>
            </li>
        `);
    }
    
    // 更新统计信息
    function updateStats() {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        
        $('#total-count').text(`总计: ${total}`);
        $('#completed-count').text(`已完成: ${completed}`);
        $('#pending-count').text(`待完成: ${pending}`);
    }
    
    // 显示/隐藏加载状态
    function showLoading(show) {
        if (show) {
            $('#loading').show();
        } else {
            $('#loading').hide();
        }
    }
    
    // 显示错误信息
    function showError(message) {
        $('#error-message').text(message).show();
        setTimeout(hideError, 5000);
    }
    
    // 隐藏错误信息
    function hideError() {
        $('#error-message').hide();
    }
    
    // HTML转义
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});