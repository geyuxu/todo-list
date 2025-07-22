# Todo List 应用

一个功能完整的待办事项管理应用，使用现代Web技术栈构建。

## 🚀 在线演示

访问应用：启动后在浏览器中打开 `http://localhost:5000`

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, 原生JavaScript, jQuery 3.6.0
- **后端**: Python Flask 2.3.3
- **数据库**: SQLite
- **API**: RESTful API
- **样式**: 响应式CSS设计，渐变色彩方案

## ✨ 功能特性

- ✅ **完整的CRUD操作** - 添加、查看、更新、删除待办事项
- ✅ **智能过滤** - 按状态筛选（全部、待完成、已完成）
- ✅ **实时统计** - 显示总计、已完成、待完成数量
- ✅ **响应式设计** - 支持桌面和移动设备
- ✅ **用户体验优化** - 加载状态、错误提示、确认对话框
- ✅ **数据持久化** - SQLite数据库存储
- ✅ **UTF-8支持** - 完美支持中文内容
- ✅ **命令行配置** - 支持自定义端口和主机

## 📁 项目结构

```
todo-list/
├── backend/
│   ├── app.py           # Flask应用主文件，包含所有API端点
│   ├── models.py        # SQLite数据库模型和操作
│   └── requirements.txt # Python项目依赖
├── static/
│   ├── style.css        # 响应式样式文件
│   └── script.js        # jQuery前端逻辑
├── templates/
│   └── index.html       # 主页面HTML模板
├── .claude/            # Claude Code配置文件
└── README.md           # 项目说明文档
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/geyuxu/todo-list.git
cd todo-list
```

### 2. 安装依赖

```bash
# 方式1: 如果已在backend目录
pip install -r backend/requirements.txt

# 方式2: 或者进入backend目录
cd backend
pip install -r requirements.txt
```

### 3. 启动应用

```bash
# 默认端口5000
python backend/app.py

# 或进入backend目录
cd backend
python app.py
```

### 4. 自定义配置

```bash
# 指定端口
python backend/app.py --port 8080
python backend/app.py -p 8080

# 指定主机和端口
python backend/app.py --host 127.0.0.1 --port 3000

# 查看帮助
python backend/app.py --help
```

**可用参数：**
- `--port, -p`: 端口号（默认：5000）
- `--host`: 主机地址（默认：0.0.0.0）
- `--debug`: 调试模式（默认：开启）

### 5. 访问应用

打开浏览器访问：`http://localhost:5000`（或你指定的端口）

## 📡 API接口

| 方法 | 端点 | 描述 | 参数 |
|------|------|------|------|
| `GET` | `/api/todos` | 获取所有待办事项 | 无 |
| `POST` | `/api/todos` | 创建新的待办事项 | `{"title": "待办事项内容"}` |
| `PUT` | `/api/todos/<id>` | 更新待办事项 | `{"completed": true/false, "title": "新标题"}` |
| `DELETE` | `/api/todos/<id>` | 删除指定待办事项 | 无 |

### 响应格式

```json
// GET /api/todos 响应示例
[
  {
    "id": 1,
    "title": "学习JavaScript",
    "completed": false,
    "created_at": "2025-07-22 16:30:00",
    "updated_at": "2025-07-22 16:30:00"
  }
]
```

## 💾 数据库

- **类型**: SQLite
- **文件**: `backend/todo.db`（首次运行时自动创建）
- **表结构**: todos表包含id、title、completed、created_at、updated_at字段

## 🔧 技术细节

- **后端**: Flask框架提供RESTful API，支持CORS跨域
- **前端**: jQuery处理DOM操作和AJAX请求，响应式CSS设计
- **数据库**: SQLite轻量级数据库，无需额外配置
- **编码**: 完整UTF-8支持，完美处理中文内容
- **安全**: 已配置防XSS的HTML转义

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

## 👤 作者

geyuxu - ngzerone@hotmail.com