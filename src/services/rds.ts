// Untested templated code, will test after schema is defined
import {
  RDSDataClient,
  ExecuteStatementCommand,
  BatchExecuteStatementCommand,
  ExecuteStatementCommandInput,
} from "@aws-sdk/client-rds-data";
import { DATABASE_ARN, SECRET_ARN, DATABASE_NAME } from "@config";

const rdsClient = new RDSDataClient({ region: process.env.AWS_REGION });

interface RDSQueryParams {
  sql: string;
  parameters?: { name: string; value: any }[];
}

/**
 * Helper function to execute a single SQL statement
 */
const rdsExecute = async (params: RDSQueryParams): Promise<any[]> => {
  const { sql, parameters } = params;
  const commandParams: ExecuteStatementCommandInput = {
    resourceArn: DATABASE_ARN,
    secretArn: SECRET_ARN,
    database: DATABASE_NAME,
    sql: sql,
    parameters: parameters?.map((p) => formatParameter(p)),
  };

  const command = new ExecuteStatementCommand(commandParams);
  const result = await rdsClient.send(command);
  return mapRecords(result.records);
};

/**
 * Helper function to execute multiple SQL statements in batch (INSERT, UPDATE, DELETE)
 */
const rdsBatchExecute = async (
  sql: string,
  parameterSets: { name: string; value: any }[][]
): Promise<void> => {
  const commandParams = {
    resourceArn: DATABASE_ARN,
    secretArn: SECRET_ARN,
    database: DATABASE_NAME,
    sql,
    parameterSets: parameterSets.map((paramSet) =>
      paramSet.map((p) => formatParameter(p))
    ),
  };

  const command = new BatchExecuteStatementCommand(commandParams);
  await rdsClient.send(command);
};

/**
 * Retrieves multiple rows based on a query
 * Example usage:
 * const rows = await rdsQuery({ sql: 'SELECT * FROM users WHERE status = :status', parameters: [{ name: 'status', value: 'active' }] });
 */
const rdsQuery = async (
  params: RDSQueryParams
): Promise<Record<string, any>[]> => {
  return await rdsExecute(params);
};

/**
 * Retrieves a single row from a query
 * Example usage:
 * const user = await rdsQueryOne({ sql: 'SELECT * FROM users WHERE id = :id', parameters: [{ name: 'id', value: '123' }] });
 */
const rdsQueryOne = async (
  params: RDSQueryParams
): Promise<Record<string, any> | undefined> => {
  const rows = await rdsExecute(params);
  return rows[0];
};

/**
 * Inserts a record into the database
 * Example usage:
 * await rdsInsert({
 *   sql: 'INSERT INTO users (id, name, email) VALUES (:id, :name, :email)',
 *   parameters: [
 *     { name: 'id', value: '123' },
 *     { name: 'name', value: 'John Doe' },
 *     { name: 'email', value: 'john@example.com' }
 *   ]
 * });
 */
const rdsInsert = async (params: RDSQueryParams): Promise<void> => {
  await rdsExecute(params);
};

/**
 * Updates a record in the database
 * Example usage:
 * await rdsUpdate({
 *   sql: 'UPDATE users SET name = :name WHERE id = :id',
 *   parameters: [
 *     { name: 'id', value: '123' },
 *     { name: 'name', value: 'Jane Doe' }
 *   ]
 * });
 */
const rdsUpdate = async (params: RDSQueryParams): Promise<void> => {
  await rdsExecute(params);
};

/**
 * Deletes a record in the database
 * Example usage:
 * await rdsDelete({
 *   sql: 'DELETE FROM users WHERE id = :id',
 *   parameters: [{ name: 'id', value: '123' }]
 * });
 */
const rdsDelete = async (params: RDSQueryParams): Promise<void> => {
  await rdsExecute(params);
};

/**
 * Batch insertion/updating/deletion
 * Example usage:
 * await rdsBatchWrite(
 *   'INSERT INTO users (id, name) VALUES (:id, :name)',
 *   [
 *     [ { name: 'id', value: '1' }, { name: 'name', value: 'Alice' } ],
 *     [ { name: 'id', value: '2' }, { name: 'name', value: 'Bob' } ]
 *   ]
 * );
 */
const rdsBatchWrite = async (
  sql: string,
  items: { name: string; value: any }[][]
): Promise<void> => {
  await rdsBatchExecute(sql, items);
};

/**
 * Utility to format the parameters for RDS Data API
 */
const formatParameter = (param: { name: string; value: any }) => {
  // RDS Data API parameters can be passed as {name, value} objects,
  // but the value must be a typed object (stringValue, longValue, etc.)
  // We attempt to infer the type here. Adjust as needed.
  const val = param.value;
  let attr: any = {};

  if (typeof val === "number") {
    attr = { name: param.name, longValue: val };
  } else if (typeof val === "boolean") {
    attr = { name: param.name, booleanValue: val };
  } else {
    // default to string
    attr = { name: param.name, stringValue: String(val) };
  }

  return attr;
};

/**
 * Convert returned records into a more friendly array of objects
 */
const mapRecords = (records: any[] | undefined): Record<string, any>[] => {
  if (!records) return [];
  // The structure from RDS Data API: records is an array of arrays of field objects
  // Example record: [{ stringValue: '1' }, { stringValue: 'John Doe' }]
  // Column metadata is often needed to map columns correctly. If you have columnMetadata, you can map by name.

  // Without metadata (depending on your use case), you might rely on column order or explicitly name your queries:
  // Example:
  // SELECT id AS user_id, name AS user_name FROM users;
  // Then use columnMetadata to map records.

  // For simplicity, assume columnMetadata is returned and map columns by name:
  // This requires adjusting the command to request columnMetadata.

  // If you do:
  // const result = await rdsClient.send(new ExecuteStatementCommand({...params, includeResultMetadata: true}));
  // you can then access result.columnMetadata
  // We'll assume columnMetadata is always there in this example.
  const columnMetadata = (global as any).latestColumnMetadata || [];

  return records.map((record) => {
    const obj: Record<string, any> = {};
    record.forEach((field: any, index: number) => {
      const columnName = columnMetadata[index]?.name || `col${index}`;
      obj[columnName] = Object.values(field)[0];
    });
    return obj;
  });
};

// Export the functions
export {
  rdsQuery,
  rdsQueryOne,
  rdsInsert,
  rdsUpdate,
  rdsDelete,
  rdsBatchWrite,
};
