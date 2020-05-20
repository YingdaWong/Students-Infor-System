## Router Designing

| Method    | Path            | get param | post param                    | description             |
| -------- | ---------------- | -------- | ------------------------------ | ---------------- |
| GET      | /                |          |                                | Render login page     |
| POST     | /                |          | username、password             | Handle login request     |
| GET      | /studens         |          |                                | Render student list page   |
| GET      | /students/new    |          |                                | Render adding page |
| POST     | /studens/new     |          | name、age、gender、hobbies     | Handle adding request |
| GET      | /students/edit   | id       |                                | Render edit page     |
| POST     | /studens/edit    |          | id、name、age、gender、hobbies | Handle edit request     |
| GET      | /students/delete | id       |                                | Handle delete request     |

Bug：
  添加学生时点 submit 后会报错，服务器死掉，但是查看数据库发现添加成功
2020/5/20 Updata:
  上述Bug已解决
