
# Zyfera Assignment

This project was developed as a Junior Developer Assignment for Zyfera.


## Installation

### Database
You can use docker to create MongoDB as I did.

```bash
  docker run -d -p 27017:27017 --name  c_mongo  mongo
```
### Project
Clone this repository and install dependencies with npm. After these you can run it.

```bash
  git clone https://github.com/emreaknci/ZyferaAssignment.git
  cd ZyferaAssignment
  npm install
  npm start 
```
    
## Environment Variables
This repo includes .env file. If you have a different uri you can change it  

`MONGO_URI`

**Existing URI: mongodb://localhost:27017/**

## API Reference

It has only one endpoint. Because the solution should provide only 1 REST endpoint for the “create” operation.

#### Create A Student

```http
  POST /api/create-student
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Student's name |
| `surname` | `string` | **Required**. Student's surname |
| `stdNumber` | `string` | **Required**. Student's number |
| `grades` | `Array of {code: string, value: number}` | **Required**. Array of objects representing the student's grades. Each object has a code (string) representing the course code and a value (number) representing the grade. |

**Example Input:**

```json
{
"name": "Emre",
"surname": "Akıncı",
"stdNumber": "B201210101",
"grades": [
        {
        "code": "MT101",
        "value": 30
        },
         {
        "code": "MT101",
        "value": 50
        },
         {
        "code": "MT101",
        "value": 90
        },
         {
        "code": "PH101",
        "value": 80
        },
         {
        "code": "PH101",
        "value": 95
        }
    ]
}
```


**Example Output:**

```json
{
    "data": {
        "name": "Emre",
        "surname": "Akıncı",
        "stdNumber": "B201210101",
        "grades": [
            {
                "code": "MT101",
                "value": 56.666666666666664,
                "_id": "663796d524e237e33bb042c6"
            },
            {
                "code": "PH101",
                "value": 87.5,
                "_id": "663796d524e237e33bb042c7"
            }
        ],
        "_id": "663796d524e237e33bb042c5",
        "__v": 0
    },
    "success": true,
    "message": "Student created successfully"
}
```



## Tech Stack

**Server:** Node, Express


