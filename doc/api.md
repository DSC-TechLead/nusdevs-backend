# NUSdevs Backend Service API

> Version 1.0.0

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/projects](#getprojects) | Get all the posted projects in a stream. |
| GET | [/projects/{project_id}/data](#getprojectsproject_iddata) | Gets a project's data. |
| GET | [/events](#getevents) | Get all the posted events in a stream. |
| GET | [/events/{event_id}/data](#geteventsevent_iddata) | Gets a project's data. |


### [GET]/projects

- Summary: Get all the posted projects in a stream.

- Description: Fetch a list of all posted projects with their details.

#### RequestBody

- application/json

```ts
{
  key: {
    id: string
    value1: string
    value2: string
  }[]
}
```

#### Response Codes

- `200 OK`: Successfully retrieved all projects. 
- `500 Internal Server Error`: An error occured on the server.


### [GET]/projects/{project_id}/data
- Summary: Get specific project data by its ID.
 
- Description: Fetch the details of a specific project using its unique `id`
- Path Parameters: `id `
- Response Example:
```ts
{
  "id": "1",
  "company_id": "1001",
  "identity_id": "2001",
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-02T12:00:00Z"
}
```
#### Response Codes:
- `200 OK`: Successfully retrieved the project data. 
- `400 Bad Request`: Invalid `id` format. 
- `404 Not Found`: Project with the given `id` does not exist.
- `500 Internal Server Error`: An error occured on the server. 


### [GET]/events
- Summary: Get all the posted events in a stream. 
- Description: Fetch a list of all posted events with their details. 
#### Response Codes

- `200 OK`: Successfully retrieved all events. 
- `500 Internal Server Error`: An error occured on the server.


### [GET]/events/{event_id}/data
- Summary: Get a specific event data by its ID. 
- Description: Fetch the details of a specific event using its unique ID. 

#### Response Codes:
- `200 OK`: Successfully retrieved the event data. 
- `400 Bad Request`: Invalid `id` format. 
- `404 Not Found`: Event with the given `id` does not exist.
- `500 Internal Server Error`: An error occured on the server. 
