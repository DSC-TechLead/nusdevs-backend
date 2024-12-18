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

- Summary  
Get all the posted projects in a stream.

- Description  
Get all the posted projects in a stream.

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

- 400 Bad Request

- 404 Event not found

- 500 Server error


### [GET]/projects/{project_id}/data



### [GET]/events



### [GET]/events/{event_id}/data
