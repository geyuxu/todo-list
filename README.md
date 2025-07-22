# Todo List 应用

一个使用原生JavaScript + jQuery + Python Flask构建的简单待办事项应用。

## 技术栈

- **前端**: HTML5, CSS3, 原生JavaScript, jQuery
- **后端**: Python Flask
- **数据库**: SQLite
- **API**: RESTful API

## 功能特性

- ✅ 添加新的待办事项
- ✅ 标记待办事项为完成/未完成
- ✅ 删除待办事项
- ✅ 过滤显示（全部、待完成、已完成）
- ✅ 统计信息显示
- ✅ 响应式设计
- ✅ 错误处理和加载状态

## 项目结构

```
todo-list/
├── backend/
│   ├── app.py          # Flask应用主文件
│   ├── models.py       # 数据库模型
│   └── requirements.txt # Python依赖
├── static/
│   ├── style.css       # 样式文件
│   └── script.js       # JavaScript文件
├── templates/
│   └── index.html      # 主页面模板
└── README.md
```

## 安装和运行

### 1. 安装Python依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 运行应用

```bash
python app.py
```

**指定端口运行：**

```bash
# 使用8080端口
python app.py --port 8080

# 或使用简写
python app.py -p 8080

# 指定主机和端口
python app.py --host 127.0.0.1 --port 3000
```

**命令行参数：**
- `--port, -p`: 指定端口号（默认：5000）
- `--host`: 指定主机地址（默认：0.0.0.0）
- `--debug`: 启用调试模式（默认：开启）

### 3. 访问应用

打开浏览器访问: http://localhost:端口号

## API接口

- `GET /api/todos` - 获取所有待办事项
- `POST /api/todos` - 创建新的待办事项
- `PUT /api/todos/<id>` - 更新待办事项
- `DELETE /api/todos/<id>` - 删除待办事项

## 数据库

应用使用SQLite数据库，数据库文件`todo.db`会在首次运行时自动创建。

## 开发说明

- 后端使用Flask框架提供RESTful API
- 前端使用jQuery处理DOM操作和AJAX请求
- 数据库使用SQLite，适合轻量级应用
- 支持CORS跨域请求