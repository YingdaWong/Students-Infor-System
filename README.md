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
