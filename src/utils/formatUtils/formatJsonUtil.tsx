import React from "react";

function formatJsonValue(value: any): JSX.Element {
  if (value === null) {
    return <span>null</span>;
  } else if (typeof value === 'object') {
    return <div>{formatJson(value)}</div>;
  } else {
    return <span>{JSON.stringify(value)}</span>;
  }
}

function formatJson(json: Record<string, any>): JSX.Element | null {
  if (!json || typeof json !== 'object') {
    return null;
  }

  return (
    <div>
      {'{'}
      {Object.entries(json).map(([key, value], index, array) => (
        <React.Fragment key={index}>
          <span style={{ fontWeight: 'bold' }}>{`"${key}"`}</span>: {formatJsonValue(value)}
          {index < array.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
      {'}'}
    </div>
  );
}

function formatArray(array: any[]): JSX.Element | null {
  if (!Array.isArray(array)) {
    return null;
  }

  return (
    <div>
      {'['}
      {array.map((value, index, array) => (
        <React.Fragment key={index}>
          <div style={{ display: 'flex' }}>{formatJsonValue(value)}
          {index < array.length - 1 ? ', ' : ''}
          </div>
        </React.Fragment>
      ))}
      {']'}
    </div>
  );
}

/**
 * Formats the given JSON with bold keys and returns a JSX Element.
 *
 * @param {string} label - The label to display before the formatted JSON.
 * @param {Record<string, any>} json - The JSON object to be formatted.
 * @return {JSX.Element | null} The formatted JSX Element or null if the JSON is empty.
 */
export function formatJsonWithBoldKeys(label: string, json: Record<string, any>): JSX.Element | null {
  return <div style={{ display: 'flex' }}><div>{label}:&nbsp;</div><div>{formatJson(json)}</div></div>;
}

/**
 * Formats an array with bold keys and a label.
 *
 * @param {string} label - The label for the array
 * @param {any[]} array - The array to be formatted
 * @return {JSX.Element | null} A JSX element containing the formatted array with bold keys, or null if the array is empty
 */
export function formatArrayWithBoldKeys(label: string, array: any[]): JSX.Element | null {
  return <div style={{ display: 'flex' }}><div>{label}:&nbsp;</div><div>{formatArray(array)}</div></div>;
}

export function formatParameter(label: string, parameter: any): JSX.Element | null {
  return <div style={{ display: 'flex' }}><div>{label}:&nbsp;</div>{parameter}</div>;
}